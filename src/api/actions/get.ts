import Collection from "@/api/collection";
import BrowserBase from "@/browser-base";
export default function get<T>(parent: T) {
  if (parent instanceof BrowserBase) {
    //delete database
  }
  if (parent instanceof Collection) {
    if (parent._filter) {
      // if have filter
    } else {
      // if there is no filter
    }
  }
}
