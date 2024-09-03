import { it, describe } from "vitest";
import "fake-indexeddb/auto";
import BrowserBase from "../browser-base";

describe("browser-base test", () => {
  let browserBase: BrowserBase;
  let DB_NAME = "first-db";
  it("expected create 'first-db' ", () => {
    browserBase = new BrowserBase(DB_NAME);
    browserBase.collection("first-collection");
    indexedDB.open(DB_NAME);
  });
});
