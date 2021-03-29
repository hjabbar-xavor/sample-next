


export default function getUrlFromMapping(mappings, codename) {
  const mapping = mappings.find(mapping => mapping.params.info.codename === codename);

  if (!mapping) {
    return undefined;
  }

  const path = mapping
    .params
    .slug
    .join("/");
  return "/" + path;
}