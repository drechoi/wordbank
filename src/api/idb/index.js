import demoRepo from './demoRepository/DummyImpl';
import catRepo from './catRepository';

const DB_NAME = 'testdb';
const DB_VERSION = 1;
let DB = null;
let dbNamespace = null;
const TABLE = 'cats';

export const demoRepository = demoRepo;

// TODO: update it as a generic repository

export const getDb = function(namespace) {
  return new Promise((resolve, reject) => {
    if (namespace !== dbNamespace) {
      DB = null;
    }

    dbNamespace = namespace;

    if (DB) {
      return resolve(DB);
    }
    const dbName = (namespace == null || namespace === '') ? DB_NAME : `${DB_NAME}_${namespace}`;
    let request = indexedDB.open(dbName, DB_VERSION);

    request.onerror = e => {
      console.log('[idb] Error opening db', e);
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
};

export default {
  catRepo,
  getDb,
  profiles: {}
};
