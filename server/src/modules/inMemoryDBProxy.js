import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

export function createClient(collectionId) {
  const adapter = new JSONFile(`./data/${collectionId}`);
  const db = new Low(adapter)
  db.data ||= { [collectionId]: [] };
  // console.log("#####################");
  // console.log(db.data.posts);
  // console.log("#####################");

  function insertOne(item) {}
  function insertMultiple(itemList) {}
  function getById(id) {}
  function getByListId(idList) {}
  function deleteById(id) {}
  function updateById(id) {}
  function query(query) {}

  return {
    getById,
    getByListId,
    deleteById,
    updateById,
    query,
  };
}
