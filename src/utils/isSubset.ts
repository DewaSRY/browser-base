/**
 *
 * @param superObj
 * @param subObj
 * @returns
 */
export default function isSubSet(superObj: any, subObj: any): boolean {
  return Object.keys(subObj).every((ele) => {
    if (typeof Object.getPrototypeOf(subObj) == "object") {
      return isSubSet(superObj[ele], subObj[ele]);
    }
    return subObj[ele] === superObj[ele];
  });
}
