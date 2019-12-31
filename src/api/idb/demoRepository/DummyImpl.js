const db = new Map();
let id = 0;

function resetDB() {
  db.clear();
}

function writeItem(newItem) {
  if (!db.has(newItem.id)) {
    let itemId = id++;
    newItem.id = itemId;
  }

  db.set(newItem.id, newItem);
}

function getAllItems() {
  return Array.from(db.values());
}

function deleteItem(item) {
  db.delete(item.id);
}

export default {writeItem, getAllItems, deleteItem, resetDB};
