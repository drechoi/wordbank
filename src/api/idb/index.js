import demoRepo from './demoRepository/DummyImpl';
import catRepository from './catRepository';
import profileRepository from './profileRepository';
import wordRepository from './wordRepository';

const DB_NAME = 'appdb';
const DB_VERSION = 2;
let DB = null;
let dbNamespace = null;
// const TABLE = 'cats';

export const demoRepository = demoRepo;

const repositories = {
  catRepo: catRepository,
  profileRepository: profileRepository,
  wordRepository: wordRepository,
};
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

      Object.values(repositories).forEach(r => {
        r.onUpgradeDB(db);
      });
      // repositories.values().forEach(r => r.onUpgradeDB(db));
    };
  });
};

export default {
  getDb,
  ...repositories,
  // catRepo,
  // profiles: profileRepository,
};
