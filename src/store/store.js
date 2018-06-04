
class Store {
    constructor() {
        this.setStateCallbackMap = {};
        this.getStateCallBackMap = {};
        this.data = {};
        this.initScreen = true;
        this.createData();
    }


    createData() {
        this.data['loginInfo'] = {};
        this.data['Profile'] = {};

        this.getStateCallBackMap['Profile'] = {};
        this.getStateCallBackMap['ListChat'] = {};


    }

    updateData(table, state) {
        this.data[table] = state;

    }

    loadData(table) {
        return this.data[table];
    }

    setStateOf(componentName, state) {
        this.setStateCallbackMap[componentName](state);
    }

    getStateOf(componentName) {
        return this.getStateCallBackMap[componentName]();
    }

    register(componentName, componentSetState, componentState) {
        this.setStateCallbackMap[componentName] = componentSetState;
        this.getStateCallBackMap[componentName] = componentState;
    }
}

export default Store;
