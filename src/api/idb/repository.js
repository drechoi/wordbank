export default (tableName) => {
  return {
    getAll: db => {
      // let db = await getDb();
      if (!db) console.error(`[repository] ${tableName}: DB not available`);

      return new Promise((resolve, reject) => {
        let trans = db.transaction(tableName, 'readonly');
        let store = trans.objectStore(tableName);
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
    },

    update: (db, item) => {
      console.debug('[cat repository] write item');

      if (!db) console.error('[cat repository] DB not available');

      return new Promise((resolve, reject) => {
        console.debug('DB save cat');
        const trans = db.transaction(tableName, 'readwrite');
        const store = trans.objectStore(tableName);
        const request = store.put(item);

        request.onsuccess = e => {
          console.debug('[repository][write] on request success');
          resolve(e.target.result);
        };
        request.onerror = e => {
          console.error('Error Adding: %s', e);
          reject(e);
        };
      });
    },

    delete: (db, id) => {
      console.debug('[repository] - delete by id');
      // const db = await getDb();
      if (!db) console.error('[repository] DB not available');

      return new Promise(resolve => {
        const trans = db.transaction(tableName, 'readwrite');
        trans.oncomplete = () => {
          console.debug('[repository] - delete done');
          resolve();
        };

        const store = trans.objectStore(tableName);
        store.delete(id);
      });
    },

    reset: (db) => {
      console.debug('[repository][reset] start');
      // const db = await getDb();
      if (!db) console.error('[repository] DB not available');

      return new Promise(resolve => {
        const trans = db.transaction(tableName, 'readwrite');
        trans.oncomplete = () => {
          console.debug('[repository][reset] done');
          resolve();
        };

        const store = trans.objectStore(tableName);
        store.clear();
      });
    },

    onUpgradeDB(db) {
      db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });
    },
  };
};
