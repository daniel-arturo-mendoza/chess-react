const storage = window.localStorage;

class Persistence {

    constructor() {
        this.storeId = "savedPosition";
    }

    set(data) {
        storage.setItem(this.storeId, JSON.stringify(data))
    }

    get() {
        const rawData = storage.getItem(this.storeId);
        return JSON.parse(rawData);
    }
}

const persistence = new Persistence;
export default persistence;