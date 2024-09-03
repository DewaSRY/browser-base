import { expect, it, describe } from "vitest";
import "fake-indexeddb/auto";
import BrowserBase from "../browser-base";

interface user {
  name: string;
  age: number;
}
describe("browser-base test", () => {
  let DB_NAME = "first-db";
  let browserBase: BrowserBase = new BrowserBase(DB_NAME);
  let userCollection = browserBase.collection<user>("user-collection");
  it("adding data' ", async () => {
    const name = "hallo";
    const age = 10;
    let actual = await userCollection.add({
      name,
      age,
    });
    // console.log(actual);
    expect(actual.name).equal(name);
    expect(actual.age).equal(age);
  });
  it("adding data with key' ", async () => {
    const name = "hallo";
    const age = 10;
    const key = "this is key";
    let actual = await userCollection.add(
      {
        name,
        age,
      },
      key
    );
    // console.log(actual);
    expect(actual.name).equal(name);
    expect(actual.age).equal(age);
    expect(actual._id).equal(key);
  });
});
