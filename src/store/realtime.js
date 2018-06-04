import net from 'react-native-tcp'
import {Buffer} from 'buffer'

class RealtimeService {
  constructor() {
    this.pingInterval = 15000;
    this.state = 'CLOSED';
    this._reset();
  }

  connect(userId, accessToken) {
    if (!this.socket || this.state === 'CLOSED') {
      this.socket = net.createConnection(23301, "150.95.110.222");
      this.socket.on('connect', s => this._onConnected(s));
      this.socket.on('data', d => this._onData(d));
      this.socket.on('error', e => this._onError(e));
      this.socket.on('close', () => this._onClosed());
      this.state = 'CONNECTING';
      this.registered = false;
      this.userId = userId;
      this.accessToken = accessToken;
    }

    if (!this.registered) {
      this.userId = userId;
      this.accessToken = accessToken;
    }
    else if (this.userId !== userId) {
      this.unregister("user-event." + this.userId);
      this.userId = userId;
      this.accessToken = accessToken;
      this.register("user-event." + this.userId, this.accessToken);
    }
  }

  stop() {
    this.socket.destroy();
    if (this.pingTimerId) {
      clearInterval(this.pingTimerId);
    }
    this.state = 'CLOSED';
    this.userId = null;
    this.accessToken = null;
    this._reset();
  }

  autoreconnect() {
      if ((!this.socket || this.state === 'CLOSED') && this.userId && this.accessToken) {
          this.connect(this.userId, this.accessToken);
      }
  }

  ping() {
    this._send({
      type: "ping"
    });
  }

  register(event, accessToken) {
    this._send({
      type: "register",
      address: event,
      headers: {
        authorization: "Bearer " + accessToken
      },
      body: {}
    })
  }

  unregister(event) {
    this._send({
      type: "unregister",
      address: event,
      headers: {},
      body: {}
    })
  }

  on(event, ref, callback) {
    if (!(event in this.handlers)) {
      this.handlers[event] = {}
    }
    this.handlers[event][ref] = callback;
  }

  remove(ref) {
    for (let event in this.handlers) {
      let eventHandlers = this.handlers[event];
      if (ref in eventHandlers) {
        delete eventHandlers[ref];
      }
    }
  }

  _onConnected(socket) {
    console.log("[Realtime Service] Connected.");
    this.state = 'CONNECTED';
    this.pingTimerId = setInterval(() => this.ping(), this.pingInterval);
    if ((!this.registered) && this.userId && this.accessToken) {
      this.register("user-event." + this.userId, this.accessToken);
      this.registered = true;
    }
  }

  _onData(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk], this.buffer.length + chunk.length);

    // we need to loop since there can be several messages in a chunk
    do {
      !this.len && (this.len = this.buffer.readInt32BE(0));

      if (this.len && this.buffer.length >= this.len + 4) {
        // we have a full message
        const message = this.buffer.slice(4, this.len + 4);
        // slice the buffer to consume the next message
        this.buffer = this.buffer.slice(this.len + 4);

        this.len = 0;

        let json;

        try {
          json = JSON.parse(message.toString('utf8'));
        } catch (e) {
          this._onError(e);
          return;
        }

        if (json.type === "err") {
          if (json.message === "unknown_type") {
            console.log("[Realtime Service] Ping succeeded.")
          } else {
            this._onError(json);
          }
          return;
        }

        // console.log("[Realtime Service]");
        // console.log(json);

        if (json.headers && json.headers.event && (json.headers.event in this.handlers)) {
          let eventHandlers = this.handlers[json.headers.event];
          for (let ref in eventHandlers) {
            if (eventHandlers.hasOwnProperty(ref)) {
              eventHandlers[ref](json.body);
            }
          }
        }
      }

    } while (this.buffer.length > 4 && !this.len)
  }

  _onError(error) {
    console.log("[Realtime Service] Error");
    console.log(error);
  }

  _onClosed() {
    console.log("[Realtime Service] Disconnected.");
    if (this.pingTimerId) {
      clearInterval(this.pingTimerId);
    }
    this.state = 'CLOSED';
    this._reset();
  }

  _reset() {
    this.socket = null;
    this.buffer = new Buffer(0);
    this.len = 0;
    this.pingTimerId = null;
    this.handlers = {};
    this.registered = false;
    // this.userId = null;
    // this.accessToken = null;
  }

  _send(obj) {
    if (this.state !== 'CONNECTED') {
      console.log("Refused send due to not initialized state.");
      return;
    }

    let json = JSON.stringify(obj);

    let buffer = Buffer.alloc(4 + json.length);
    buffer.writeUInt32BE(json.length);
    buffer.write(json, 4);

    this.socket.write(buffer);
  }
}

const realtime = new RealtimeService();
export default realtime;