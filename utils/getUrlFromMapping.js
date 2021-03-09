function getItemKeyByCodename(object, codename) {
  return Object.keys(object).find(key => object[key].codename === codename);
}


export default function getUrlFromMapping(mappings, codename) {
  const path = getItemKeyByCodename(mappings, codename);
  return path;
}