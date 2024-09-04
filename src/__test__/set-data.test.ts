import { expect, it, describe } from "vitest";
import "fake-indexeddb/auto";
import BrowserBase from "../browser-base";

interface user {
  name: string;
  age: number;
}
describe("browser-base update data", () => {
  let DB_NAME = "first-db";
  let browserBase: BrowserBase = new BrowserBase(DB_NAME);
  let userCollection = browserBase.collection<user>("user-collection");

  it.fails("set data with false key ", async () => {
    const name = "hallo";
    const age = 10;
    const key = "some key";
    const addObject = {
      name,
      age,
    };
    await userCollection.add(addObject, key);

    await userCollection.byId("false key").set({
      name: "new update",
    });
  });
  it("success update data ", async () => {
    const name = "hallo";
    const age = 10;
    const key = "some key";
    const newName = "new update";
    const addObject = {
      name,
      age,
    };
    await userCollection.add(addObject, key);

    let actual = await userCollection.byId(key).set({
      name: newName,
    });
    if (actual) {
      expect(actual.name).equal(newName);
      expect(actual.age).equal(age);
      expect(actual._id).equal(key);
    }
  });
  it("success update data ", async () => {
    const name = "hallo";
    const age = 10;
    const key = "some key";
    const newName = "new update";
    const newAge = 30;
    const addObject = {
      name,
      age,
    };
    const newUpdateObject = {
      name: newName,
      age: newAge,
    };
    await userCollection.add(addObject, key);
    let actual = await userCollection.byId(key).set(newUpdateObject);
    if (actual) {
      expect(actual.name).equal(newName);
      expect(actual.age).equal(newAge);
      expect(actual._id).equal(key);
    }
  });
});
