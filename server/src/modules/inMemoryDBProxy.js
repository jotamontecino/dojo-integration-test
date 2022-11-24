import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

export function createClient(collectionId) {
  const adapter = new JSONFile(`./data/${collectionId}`);
  const db = new Low(adapter)
  db.data ||= { [collectionId]: [] };
  let localId = 0;

  function insertOne(item) {
    const insertedItem = {id: localId,...item};
    db.data[collectionId].push(insertedItem);
    localId+=1;
    return insertedItem;
  }
  function insertMultiple(itemList) {
    itemList.forEach((item) => {
      insertOne(item)
    });
  }
  function getById(id) {
    return db.data[collectionId][id];
  }
  function getList() {
    return db.data[collectionId];
  }
  function deleteById(id) {
    const filteredTab = db.data[collectionId].filter((item) => { return !(item.id === id)})
    db.data[collectionId] = filteredTab;
    return true;
  }

  return {
    insertOne,
    insertMultiple,
    getById,
    getList,
    deleteById,
  };
}
