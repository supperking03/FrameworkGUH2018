import net from 'react-native-tcp'
import {Base64} from 'js-base64'

var STATE = {
    DISCONNECTED: 0,
    CONNECTING: 1,
    CONNECTED: 2,
};

net.Socket.prototype._original_write = net.Socket.prototype._write;
net.Socket.prototype._write = function (buffer: any, encoding: ?String, callback: ?(err: ?Error) => void): boolean {
    if (this._state !== STATE.DISCONNECTED) {
        try {
            return this._original_write(buffer, encoding, callback);
        }
        catch (e) {
            console.error(e);
        }
    }
}

const RealtimeService = {
    host: null,
    port: null,
    protocol:
        {
            protocolName: '',
            commandTye: '',
            callbackId: '',
            authorization: '',
            topics: []
        },

    socket: null,

    connected: false,
    pingIntervalFunc: null,
    pingTime: 5000,
    retrying: null,
    retryingTime: 5000,

    receiveMessagesFunc: null,
    errorFunc: null,

    dataBuffer: '',

    connect(_port,
            _host,
            _protocolName,
            _commandType,
            _callbackId,
            _authorization,
            _topics,
            _receiveMessagesFunc = null,
            _errorFunc = null) {
        try {
            if (!this.socket) {
                this.port = _port;
                this.host = _host;
                this.protocol.protocolName = _protocolName;
                this.protocol.commandTye = _commandType;
                this.protocol.callbackId = _callbackId;
                this.protocol.authorization = _authorization;
                this.protocol.topics = _topics;
                this.receiveMessagesFunc = _receiveMessagesFunc;
                this.errorFunc = _errorFunc;

                this.socket = net.createConnection(this.port, this.host);

                this.socket._realtimeService = this;
            }
            else {
                this.protocol.authorization = _authorization;
                this._subChannels();
                return;
            }

            this.socket.on('connect', socket => {
                console.log('[SOCKET] CONNECTED');

                const date = new Date();
                const _msgObject = {
                    topic: 'REALTIME_STATUS_2',
                    content: `CONNECTED - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                };

                this.receiveMessagesFunc(_msgObject);

                this.connected = true;

                this._subChannels();

                this.pingIntervalFunc = setInterval(() => {
                    this.ping();
                }, this.pingTime);

                this.receive();
            });

            this.socket.on('close', () => {
                console.log('[SOCKET] CLOSE');

                const date = new Date();

                const _msgObject = {
                    topic: 'REALTIME_STATUS_2',
                    content: `CLOSE - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                };

                this.receiveMessagesFunc(_msgObject);

                if (this.connected) {
                    this.connected = false;

                    clearInterval(this.pingIntervalFunc);
                    this.pingIntervalFunc = null;
                }

                if (this.socket) {
                    if (this.retrying) {
                        clearTimeout(this.retrying);
                        this.retrying = null;
                    }

                    if (!this.retrying) {
                        this.retrying = setTimeout(() => {
                            this.retryingFunc();
                        }, this.retryingTime)
                    }

                    if (this.errorFunc) this.errorFunc();
                }

            });

            this.socket.on('error', error => {
                console.log('[SOCKET] ERROR', error);

                const date = new Date();
                const _msgObject = {
                    topic: 'REALTIME_STATUS_2',
                    content: `ERROR - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                };

                this.receiveMessagesFunc(_msgObject);

                if (this.retrying) {
                    clearTimeout(this.retrying);
                    this.retrying = null;
                }

                if (!this.retrying) {
                    this.retrying = setTimeout(() => {
                        this.retryingFunc();
                    }, this.retryingTime)
                }

                if (this.errorFunc) this.errorFunc();
            })
        } catch (error) {
            console.log(error);
        }
    },

    retryingFunc() {
        console.log('[SOCKET] RETRYING CONNECTION');

        const date = new Date();

        const _msgObject = {
            topic: 'REALTIME_STATUS_2',
            content: `RETRYING CONNECTION - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        };

        this.receiveMessagesFunc(_msgObject);

        if (this.socket) {
            this.socket = null;
        }

        this.connect(
            this.port,
            this.host,
            this.protocol.protocolName,
            this.protocol.commandTye,
            this.protocol.callbackId,
            this.protocol.authorization,
            this.protocol.topics,
            this.receiveMessagesFunc,
            this.errorFunc,
        );
    },

    _subChannels() {
        const topics = this.protocol.topics;

        for (let i = 0, length = topics.length; i < length; i++) {
            const content = this.protocol.protocolName
                + ' ' + this.protocol.commandTye
                + ' CALLBACK ID: ' + Base64.encode(this.protocol.callbackId)
                + ' AUTHORIZATION: ' + Base64.encode(this.protocol.authorization)
                + ' TOPIC: ' + Base64.encode(topics[i])
                + '\n';

            this.send(content);
        }
    },

    ping() {
        const content = this.protocol.protocolName
            + ' PING'
            + ' CALLBACK_ID: ' + this.protocol.callbackId
            + '\n';

        this.send(content);

        const date = new Date();
        const _msgObject = {
            topic: 'REALTIME_STATUS',
            content: `PING - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        };

        this.receiveMessagesFunc(_msgObject);

    },


    send(_content) {
        if (this.connected) {
            try {
                this.socket.write(_content, () => {
                    console.log('[SOCKET] SEND', _content);
                });
            } catch (error) {
                console.log('[SOCKET] SEND ERROR', error);
            }
        }
    },

    receive() {
        this.socket.on('data', data => {
            const dataString = data.toString('urf-8');

            this.dataBuffer += dataString;

            if (
                dataString.indexOf('\n') === -1
                || dataString.lastIndexOf('\n') !== (dataString.length - 1)
            ) {
                return;
            }
        })

        const messageList = this.dataBuffer.split('\n');

        this.dataBuffer = '';

        messageList.forEach((message) => {
            const arr = message.split(' ');

            if (arr[0] === this.protocol.protocolName) {
                switch (arr[1]) {
                    case 'TOPIC_MESSAGE':
                        const msgObject = {
                            type: null,
                            topic: null,
                            content: null,
                        };
                        msgObject.type = 'new-message';

                        for (let i = 2, length = arr.length; i < length; i++) {
                            const item = arr[i].split(':');
                            switch (item[0]) {
                                case 'TOPIC':
                                    try {
                                        msgObject.topic = Base64.decode(item[1]);
                                    } catch (error) {
                                        msgObject.topic = '';
                                    }
                                    break;
                                case 'BODY':
                                    try {
                                        msgObject.content = JSON.parse(Base64.decode(item[1]));
                                    } catch (error) {
                                        msgObject.content = {};
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }

                        this.receiveMessagesFunc(msgObject);
                        break;
                    case 'PONG':
                        const date = new Date();
                        const _msgObject = {
                            topic: 'REALTIME_STATUS',
                            content: `PONG - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                        };

                        this.receiveMessagesFunc(_msgObject);
                        break;
                    default:
                        break;
                }
            }
        })
    },

    end(callback = null)
    {
        if(this.socket)
        {
            this.socket.end();
            this.socket = null;
        }

        if(callback) callback();

        console.log('[SOCKET] END');

        const date = new Date();
        const _msgObject = {
            topic: 'REALTIME_STATUS_2',
            content: `DISCONNECTED - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        };

        this.receiveMessagesFunc(_msgObject);
        
    }
}

export default RealtimeService;