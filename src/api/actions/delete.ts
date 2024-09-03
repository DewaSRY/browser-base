import Collection from "@/api/collection";
import BrowserBase from "@/browser-base";
// import isSubSet from "@/utils/isSubset";

/**
 *fk delete is delete factory use to delete something on data base base on the paramater pass to it
 * @param parent
 */
export default function fkDelete<T, U = unknown>(parent: T) {
  if (parent instanceof BrowserBase) {
    //delete database
    deleteDb(parent);
  }
  if (parent instanceof Collection) {
    if (parent._filter) {
      // if have filter
      deleteDataById<U>(parent);
    } else {
      // if there is no filter
      deleteCollection(parent);
    }
  }
}
function deleteDb(parent: BrowserBase) {
  const { dbName } = parent;
  indexedDB.deleteDatabase(dbName);
}

function deleteCollection(collection: Collection<unknown>) {
  const { _browserBase, collectionName } = collection;
  _browserBase._deleteCollectionQueue.queue.push(collectionName);
  if (_browserBase._deleteCollectionQueue.running === false) {
    _browserBase._deleteCollectionQueue.running = true;
    _deleteFromQueue(collection);
  }
}

function _deleteFromQueue(collection: Collection<unknown>) {
  const { _browserBase, lf } = collection;
  if (_browserBase._deleteCollectionQueue.queue.length) {
    let collectionToDelete = _browserBase._deleteCollectionQueue.queue[0];
    _browserBase._deleteCollectionQueue.queue.shift();
    lf.dropInstance({
      name: _browserBase.dbName,
      storeName: collectionToDelete,
    }).then(() => {
      _deleteFromQueue(collection);
    });
  } else {
    _browserBase._deleteCollectionQueue.running = false;
  }
}

function deleteDataById<T>(collection: Collection<T>) {
  const { lf, _filter } = collection;
  let docsToSets: string[] = [];
  new Promise(() => {
    lf.iterate<T, void>((_value, key) => {
      if (key === _filter?.id) {
        docsToSets.push(key);
      }
    }).then(() => {
      docsToSets.forEach((key) => {
        lf.removeItem(key);
      });
    });
  });
}
