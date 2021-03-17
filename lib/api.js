import { DeliveryClient } from "@kentico/kontent-delivery";
import { readFile, writeFile } from './fs-helpers';
import _ from 'lodash';

const client = new DeliveryClient({
  projectId: process.env.KONTENT_PROJECT_ID,
  previewApiKey: process.env.KONTENT_PREVIEW_API_KEY
});

export async function getPageStaticPropsForPath(path, preview = false) {

  const mappings = JSON.parse(await readFile(`_mappings${preview ? '.preview' : ''}.json`, 'utf8'));
  const config = JSON.parse(await readFile(`_metadata${preview ? '.preview' : ''}.json`, 'utf8'));

  const systemInfo = mappings[path];
  if (!systemInfo) {
    console.log(`No information for path: ${path}`);
    return {};
  }

  const item = await client.item(systemInfo.codename)
    .depthParameter(5)
    .queryConfig({
      usePreviewMode: preview
    })
    .toPromise()
    .then(result => result.item);

  const result = {
    page: JSON.parse(JSON.stringify(item)), // TODO polish serialization of the js SDK response
    data: {
      config,  // TODO add root data for config
      mappings,
    },
    related: {}
  }

  const isLandingPage =
    item.system.type !== 'post'
    && item.content.value.length === 1
    && item.content.value[0].system.type === 'landing_page';

  const isListingPage = item.system.type !== 'post'
    && item.content.value.length === 1
    && item.content.value[0].system.type === 'listing_page';

  if (isLandingPage) {
    const listingSections = item.content.value[0].sections.value
      .filter(section => section.system.type === 'listing_section');

    for (const listingSection of listingSections) {

      const linkedItems = await client.items()
        .type(listingSection.content_type.value)
        .orderByDescending(listingSection.order_by.value)
        .limitParameter(listingSection.number_of_items.value)
        .queryConfig({
          usePreviewMode: preview
        })
        .toPromise()
        .then(result => result.items);

      result.related[listingSection.system.codename] = JSON.parse(JSON.stringify(linkedItems));  // TODO polish serialization of the js SDK response
    }
  } else if (isListingPage) {
    const listingPage = item.content.value[0];

    const linkedItems = await client.items()
      .type(listingPage.content_type.value)
      .queryConfig({
        usePreviewMode: preview
      })
      .toPromise()
      .then(result => result.items);

    result.related[listingPage.system.codename] = JSON.parse(JSON.stringify(linkedItems));  // TODO polish serialization of the js SDK response
  }

  return result;
}

export async function getContentPaths() {
  const pages = await fetchPages();
  const previewPages = await fetchPages(true);

  return [...pages]
    .concat(...previewPages);
}

export async function fetchPages(preview = false) {
  // TODO - Verify approach: Load both released and preview pages snapshot. Currently just published URL map and metadata + mappings
  // TODO split query into two separate one - one for content and for sitemap
  const websiteData = await client.item("homepage")
    .depthParameter(3)
    .queryConfig({
      usePreviewMode: preview
    })
    .toPromise()
    .then(result => result.item);

  writeFile(`_metadata${preview ? '.preview' : ''}.json`, JSON.stringify(websiteData, undefined, 2), 'utf8')
    .catch((reason) => console.error(reason));

  const pathsFromKontent = [
    {
      params: {
        slug: [`${preview ? 'preview' : ''}`],
      }
    }
  ];

  const mappingList = {
    [`${preview ? '/preview' : '/'}`]: websiteData.system
  }


  for (const subpage of websiteData.subpages.value) {
    const pages = await getPages(subpage, mappingList, preview);
    pathsFromKontent.push(...pages);

  }

  writeFile(`_mappings${preview ? '.preview' : ''}.json`, JSON.stringify(mappingList, undefined, 2), 'utf8')
    .catch((reason) => console.error(reason));

  return pathsFromKontent;
}

async function getPages(item, mappingList, preview = false) {

  const prefix = preview ? ['preview'] : [];

  const accumulator = [{
    params: {
      slug: prefix.concat(item.slug.value),
    }
  }]

  mappingList[`${preview ? '/preview/' : '/'}` + item.slug.value] = item.system;

  const contentItem = item.content.value && item.content.value[0];
  if (contentItem && contentItem.system.type === "listing_page") {
    const subItems = await client.items()
      .type(contentItem.content_type.value)
      .queryConfig({
        usePreviewMode: preview
      })
      .toPromise()
      .then(result => result.items);

    subItems.forEach(subItem => {
      accumulator.push({
        params: {
          slug: prefix.concat(item.slug.value, subItem.slug.value)
        }
      })

      mappingList[`${preview ? '/preview/' : '/'}` + item.slug.value + '/' + subItem.slug.value] = subItem.system;
    });
  }

  return accumulator;
}