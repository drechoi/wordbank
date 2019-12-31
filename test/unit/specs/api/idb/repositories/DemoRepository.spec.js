import {demoRepository} from '@/api/idb/index';

describe('DemoRepository', () => {
  it('should demo repository got all functions', () => {
    const repoFuncions = ['writeItem', 'getAllItems', 'deleteItem', 'resetDB'];

    repoFuncions.forEach(
      item => expect(demoRepository).to.respondTo(item)
    );
  });

  it('should able to write new item', done => {
    const items = [
      { text: 'A' },
      { text: 'B' },
      { text: 'C' },
    ];

    demoRepository.resetDB();
    items.forEach(demoRepository.writeItem);

    const itemsFromRepo = demoRepository.getAllItems();

    // expect(itemsFromRepo).toHaveLength(3);
    expect(itemsFromRepo.length).to.equal(3);
    expect(itemsFromRepo[0].text).to.equal('A');
    expect(itemsFromRepo[1].text).to.equal('B');
    expect(itemsFromRepo[2].text).to.equal('C');
    done();
  });

  it('should delete item correctly', (done) => {
    const items = [
      { text: 'A' },
      { text: 'B' },
      { text: 'C' },
    ];

    demoRepository.resetDB();
    // items.forEach(await DemoRepository.write);
    items.forEach(demoRepository.writeItem);
    demoRepository.deleteItem(items[1]);

    const itemsFromRepo = demoRepository.getAllItems();
    console.log(itemsFromRepo.length);

    expect(itemsFromRepo.length).to.equal(2);
    expect(itemsFromRepo[0].text).to.equal('A');
    expect(itemsFromRepo[1].text).to.equal('C');
    done();
  });
});
