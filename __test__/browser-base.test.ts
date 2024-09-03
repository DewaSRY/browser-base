import { expect, it, describe } from "vitest";
import "fake-indexeddb/auto";
import createBroserBase, { BrowserBase } from "../src/browser-base";

describe("browser-base test", () => {
  let browserBase: BrowserBase;
  let DB_NAME = "first-db";
  it("expected create 'first-db' ", () => {
    browserBase = createBroserBase(DB_NAME);
    browserBase.collection("first-collection");
    const actual = indexedDB.open(DB_NAME);
  });

  it("");
});
