// import { getDb } from '../index';
const TABLE = 'cats';

const repo = (tableName) => {
  return {
    test: '',
    getAllItems: db => {
      // let db = await getDb();
      if (!db) console.error('[cat repository] DB not available');

      return new Promise((resolve, reject) => {
        let trans = db.transaction(TABLE, 'readonly');
        let store = trans.objectStore(TABLE);
        let items = [];

        trans.oncomplete = () => {
          resolve(items);
        };

        trans.onerror = (err) => {
          console.error('transaction error');
          reject(err);
        };

        store.openCursor().onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            items.push(cursor.value);
            cursor.continue();
          }
        };
      });
    }
  };
};

export default {
  getAllItems: repo('cat').getAllItems,
  getAllItems2(db) {
    if (!db) console.error('[cat repository] DB not available');

    return new Promise((resolve, reject) => {
      let trans = db.transaction(TABLE, 'readonly');
      let store = trans.objectStore(TABLE);
      let cats = [];

      trans.oncomplete = () => {
        resolve(cats);
      };

      trans.onerror = (err) => {
        console.error('transaction error');
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

  writeItem(db, cat) {
    console.debug('[cat repository] write item');

    if (!db) console.error('[cat repository] DB not available');

    return new Promise((resolve, reject) => {
      console.debug('DB save cat');
      const trans = db.transaction(TABLE, 'readwrite');
      const store = trans.objectStore(TABLE);
      const request = store.put(cat);

      request.onsuccess = e => {
        console.debug('[cat repository][write item] on request success');
        resolve(e.target.result);
      };
      request.onerror = e => {
        console.error('Error Adding: %s', e);
        reject(e);
      };
    });
  },

  deleteItem(db, id) {
    console.debug('[cat repository] - delete cat by id');
    // const db = await getDb();
    if (!db) console.error('[cat repository] DB not available');

    return new Promise(resolve => {
      const trans = db.transaction('cats', 'readwrite');
      trans.oncomplete = () => {
        console.debug('[cat repository] - delete done');
        resolve();
      };

      const store = trans.objectStore('cats');
      store.delete(id);
    });
  },

  resetDB(db) {
    console.debug('[cat repository][reset] start');
    // const db = await getDb();
    if (!db) console.error('[cat repository] DB not available');

    return new Promise(resolve => {
      const trans = db.transaction('cats', 'readwrite');
      trans.oncomplete = () => {
        console.debug('[cat repository][reset] done');
        resolve();
      };

      const store = trans.objectStore('cats');
      store.clear();
    });
  }
};
