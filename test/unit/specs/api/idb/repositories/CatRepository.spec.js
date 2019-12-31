import allRepo from '@/api/idb/index';

// require('fake-indexeddb/auto');

const catRepository = allRepo.catRepo;

describe('Cat Repository', () => {
  it('should repository have all functions', () => {
    const repoFuncions = ['writeItem', 'getAllItems', 'deleteItem', 'resetDB'];

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
    catRepository.resetDB().then(
      () => { return Promise.all(items.map(catRepository.writeItem)); }
    ).then(
      () => { return catRepository.getAllItems(); }
    ).then(
      (repo) => {
        console.log('**[test] last step');
        console.log('**[test Done]item repo length: %d', repo.length);
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

    catRepository.resetDB().then(
      () => { return Promise.all(items.map(catRepository.writeItem)); }
    ).then(
      () => { return catRepository.getAllItems(); }
    ).then(
      (itemList) => {
        if (itemList.length > 2) return catRepository.deleteItem(itemList[1].id);
      }
    ).then(
      () => { return catRepository.getAllItems(); }
    ).then(
      (itemList) => {
        console.log('**[test] last step');
        console.log(itemList);
        console.log('test delete item repo length: %i', itemList.length);
        expect(itemList.length).to.equal(2);
        expect(itemList[0].text).to.equal('A');
        expect(itemList[1].text).to.equal('C');
      }
    ).then(done, done); // = finally(done); for later version of babel
  });
});
