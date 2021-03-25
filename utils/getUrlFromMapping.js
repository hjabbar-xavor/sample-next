


export default function getUrlFromMapping(mappings, codename) {
  const path = mappings.find(mapping => mapping.params.info.codename === codename)
    .params
    .slug
    .join("/");
  return "/" + path;
}