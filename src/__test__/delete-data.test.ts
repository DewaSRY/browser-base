import { expect, it, describe } from "vitest";
import "fake-indexeddb/auto";
import BrowserBase, { documentId } from "../browser-base";

interface user {
  name: string;
  age: number;
}
describe("browser-base test", () => {
  let DB_NAME = "first-db";
  let browserBase: BrowserBase = new BrowserBase(DB_NAME);
  let userCollection = browserBase.collection<user>("user-collection");
  it("deleting data from collection with id' ", async () => {
    let name = "hallo";
    let age = 10;
    const userObject = {
      name,
      age,
    };
    let promiseArray: Promise<documentId<user>>[] = [];
    for (let i = 0; i < 10; i++) {
      let promise: Promise<documentId<user>> = userCollection.add(
        userObject,
        i.toString()
      );
      promiseArray.push(promise);
    }
    await Promise.all(promiseArray);
    let actual = await userCollection.get();
    expect(actual.length).equal(10);
    await userCollection.byId("0").delete();
    actual = await userCollection.get();
    expect(actual.length).equal(9);
  });
  it("deleting the collection ", async () => {
    const name = "hallo";
    const age = 10;
    const key = "this is key";
    await userCollection.add(
      {
        name,
        age,
      },
      key
    );
    let actual = await userCollection.get();
    expect(actual.length).toBe(10);
    await userCollection.delete();
    actual = await userCollection.get();
    expect(actual.length).toBe(0);
  });
  it("deleting the database ", async () => {
    const name = "hallo";
    const age = 10;
    const key = "this is key";
    await userCollection.add(
      {
        name,
        age,
      },
      key
    );
    let actual = await userCollection.get();
    expect(actual.length).toBe(1);
    await browserBase.delete();
  });
});
