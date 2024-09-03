import BrowserBase from "./browser-base";

export default function createBrowserBase(dbName: string) {
  return new BrowserBase(dbName);
}

export { default as BrowserBase } from "./browser-base";
