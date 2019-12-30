const DB_NAME = 'testdb';
const DB_VERSION = 1;
let DB = null;

const TABLE = 'cats';

export default {
  async getDb() {
    return new Promise((resolve, reject) => {
      if (DB) { return resolve(DB); }

      let request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = e => {
        console.log('Error opening db', e);
        reject(Error('Error'));
      };

      request.onsuccess = e => {
        DB = e.target.result;
        resolve(DB);
      };

      request.onupgradeneeded = e => {
        console.log('on upgrade needed');
        let db = e.target.result;
        db.createObjectStore(TABLE, { autoIncrement: true, keyPath: 'id' });
      };
    });
  },
  async getCats() {
    let db = await this.getDb();

    return new Promise(resolve => {
      let trans = db.transaction(TABLE, 'readonly');
      trans.oncomplete = () => {
        resolve(cats);
      };

      let store = trans.objectStore(TABLE);
      let cats = [];

      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          cats.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },
  async saveCat(cat) {
    const db = await this.getDb();

    return new Promise(resolve => {
      console.log('DB save cat');
      const trans = db.transaction(TABLE, 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };
      const store = trans.objectStore(TABLE);
      store.put(cat);
    });
  },
  async deleteCat(cat) {
    await this.deleteCatById(cat.id);
  },
  async deleteCatById(id) {
    console.log('db - delete cat by id');

    const db = await this.getDb();

    return new Promise(resolve => {
      console.log('db - promise');
      const trans = db.transaction('cats', 'readwrite');
      trans.oncomplete = () => {
        console.log('db - resolve');
        resolve();
      };

      console.log('db - delete ' + id);
      const store = trans.objectStore('cats');
      store.delete(id);
    });
  }
};
