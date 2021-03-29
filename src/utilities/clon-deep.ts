export function cloneDeep(obj: PlainObject): PlainObject {
  let result: PlainObject;
  if (obj === null) {return {}};
  if (Array.isArray(obj)) {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] !== 'object'|| obj[i] === null) {
        result[i] = obj[i]
      } else result[i] = cloneDeep(obj[i]);
    }
  } else {
    result = {};
    for (let item of Object.keys(obj)) {
      if (typeof obj[item] !== 'object' || obj[item] === null) {
        result[item] = obj[item];
      } else result[item] = cloneDeep(obj[item]);
    }
  }
  return result;
}