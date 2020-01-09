import allRepo, {getDb} from '@/api/idb';

let db;
const catRepository = allRepo.catRepo;

describe('Cat Repository', () => {
  before(async function() {
    // await someLongSetupFunction();
    db = await getDb('catRepoSpec');
  });

  it('should repository have all functions', () => {
    const repoFuncions = ['update', 'getAll', 'delete', 'reset'];

    repoFuncions.forEach(
      item => expect(catRepository).to.respondTo(item)
    );
  });

  it('should able to write new item', (done) => {
    const items = [
      { text: 'A' },
      { text: 'B' },
      { text: 'C' },
    ];

    // let itemsFromRepo = null;
    catRepository.reset(db).then(
      () => { return Promise.all(items.map(i => catRepository.update(db, i))); }
    ).then(
      () => { return catRepository.getAll(db); }
    ).then(
      (repo) => {
        console.debug('**[test Done]item repo length: %d', repo.length);
        expect(repo.length).to.equal(3);
        expect(repo[0].text).to.equal('A');
        expect(repo[1].text).to.equal('B');
        expect(repo[2].text).to.equal('C');
      }
    ).then(done, done); // = finally(done); for later version of babel
  });

  it('should delete item correctly', (done) => {
    const items = [
      { text: 'A' },
      { text: 'B' },
      { text: 'C' },
    ];

    catRepository.reset(db).then(
      () => {
        return Promise.all(items.map(i => catRepository.update(db, i)));
      }
    ).then(
      (returnIds) => {
        if (returnIds.length > 2) return catRepository.delete(db, returnIds[1]);
      }
    ).then(
      () => { return catRepository.getAll(db); }
    ).then(
      (itemList) => {
        console.debug('**[test] last step');
        console.debug(itemList);
        expect(itemList.length).to.equal(2);
        expect(itemList[0].text).to.equal('A');
        expect(itemList[1].text).to.equal('C');
      }
    ).then(done, done); // = finally(done); for later version of babel
  });
});
