export let removeEmptyLists = function (obj) {
  Object.keys(obj).forEach(element => {
    if (!obj[element].length) {
      delete obj[element]
    }
  })
  return obj
}