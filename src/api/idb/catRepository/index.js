import { getDbNew } from '../index';

const TABLE = 'cats';

export default {
  async getAllItems() {
    let db = await getDbNew();

    return new Promise((resolve, reject) => {
      let trans = db.transaction(TABLE, 'readonly');
      let store = trans.objectStore(TABLE);
      let cats = [];

      trans.oncomplete = () => {
        resolve(cats);
      };

      trans.onerror = (err) => {
        console.log('transaction error');
        reject(err);
      };

      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          cats.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },
  async writeItem(cat) {
    console.log('[cat repository] write item');
    // const db = await getDbNew().catch(() => { console.log('oops!!!!'); });
    const db = await getDbNew();

    return new Promise(resolve => {
      console.log('DB save cat');
      const trans = db.transaction(TABLE, 'readwrite');
      trans.oncomplete = () => {
        console.log('[cat repository] write item completed');
        resolve();
      };
      const store = trans.objectStore(TABLE);
      store.put(cat);
    });
  },
  // async deleteItem(item) {
  //   // await this.deleteCatById(cat.id);
  //   let tmp = await this.getAllItems();
  //   let tmp =tmp.filter(i => i.text === item.text);
  //   deleteItemBy(id)
  // },
  async deleteItem(id) {
    console.log('[cat repository] - delete cat by id');
    const db = await getDbNew();

    return new Promise(resolve => {
      const trans = db.transaction('cats', 'readwrite');
      trans.oncomplete = () => {
        console.log('[cat repository] - delete done');
        resolve();
      };

      const store = trans.objectStore('cats');
      store.delete(id);
    });
  },
  async resetDB() {
    console.log('[cat repository][reset] start');
    const db = await getDbNew();

    return new Promise(resolve => {
      const trans = db.transaction('cats', 'readwrite');
      trans.oncomplete = () => {
        console.log('[cat repository][reset] done');
        resolve();
      };

      const store = trans.objectStore('cats');
      store.clear();
    });
  }
};
