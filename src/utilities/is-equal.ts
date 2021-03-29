export function isEqual(a: any, b: any): boolean {
  let result = true;
  if (a === null && b === null) {
    return true;
  } else {
    if (a === null || b === null) {
      return false;
    }
  }
  if (typeof a !== 'object' && b !== "object") {
    return a === b;
  }
  if (typeof a === 'object' && typeof b === 'object') {
    if (Object.keys(a).length !== Object.keys(b).length) {
      result = false;
    }
    for (let item of Object.keys(a)) {
      if (typeof a[item] !== 'object' || typeof b[item] !== 'object') {
        if (b[item] !== a[item]) {
          result = false
        }
      } else {
        return isEqual(a[item], b[item]);
      }
    }
    return result;
  }

  return false;
}