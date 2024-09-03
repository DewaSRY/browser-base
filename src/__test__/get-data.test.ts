import { expect, it, describe } from "vitest";
import "fake-indexeddb/auto";
import BrowserBase, { documentId } from "../browser-base";

interface user {
  name: string;
  age: number;
}
describe("browser-base test get all data", () => {
  let DB_NAME = "first-db";
  let browserBase: BrowserBase = new BrowserBase(DB_NAME);
  let userCollection = browserBase.collection<user>("user-collection");

  it("try get all data ", async () => {
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
    const actual = await userCollection.get();
    expect(actual.length).equal(10);
  });
  it("get by limit", async () => {
    const actual = await userCollection.limit(5).get();
    expect(actual.length).toBe(5);
  });
  it("get by limit and skipp", async () => {
    const actual = await userCollection.limit(5).skip(5).get();
    expect(actual.length).toBe(5);
  });
  it("get data by key ", async () => {
    const name = "hallo";
    const age = 10;
    const key = "some key";
    const userObject = {
      name,
      age,
    };

    await userCollection.add(userObject, key);
    const [actual] = await userCollection.byId(key).get();
    expect(actual.name).equal(name);
    expect(actual.age).equal(age);
  });
});
