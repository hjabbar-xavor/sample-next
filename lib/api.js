import { DeliveryClient } from "@kentico/kontent-delivery";
import { name, version } from "../package.json";
import get from "lodash.get";

const sourceTrackingHeaderName = "X-KC-SOURCE";

const client = new DeliveryClient({
  projectId: process.env.KONTENT_PROJECT_ID,
  previewApiKey: process.env.KONTENT_PREVIEW_API_KEY,
  globalHeaders: (_queryConfig) => [
    {
      header: sourceTrackingHeaderName,
      value: `${name};${version}`,
    },
  ],
});

async function loadWebsiteConfig(preview = false) {
  const config = await client.item("homepage")
    .depthParameter(6)
    // This overfetching by ignoring `subpages` element
    // https://docs.kontent.ai/reference/delivery-api#tag/Projection
    .elementsParameter([
      "title", "base_font", "favicon", "palette", "label", "header_logo",
      "main_menu", "actions", "label", "slug", "content", "icon", "icon_position", "role",
      "options", "footer_sections", "image", "content", "fields", "name",
      "type", "value", "navigation_item", "url",
      "submit_label", "form_id", "form_action", "default_value", "configuration",
      "palette", "font", "copyright"
    ])
    .queryConfig({
      usePreviewMode: preview
    })
    .toPromise()
    .then(result => result.item);
  return config;
}

async function getSubPaths(pages, parentSlug, preview = false) {
  const paths = [];

  for (const page of pages) {
    const pageSlug = parentSlug.concat(page.slug.value);
    paths.push({
      params: {
        slug: pageSlug,
        navigationItem: page.system, // will be ignored by next in getContentPaths
        contentItem: page.content.value[0].system // will be ignored by next in getContentPaths
      }
    });

    // Listing pages
    const contentItem = page.content.value && page.content.value[0];
    if (contentItem && contentItem.system.type === "listing_page") {
      const subItems = await client.items()
        .type(contentItem.content_type.value)
        .elementsParameter(["slug"])
        .queryConfig({
          usePreviewMode: preview
        })
        .toPromise()
        .then(result => result.items);

      subItems.forEach(subItem => {
        const subItemSlug = pageSlug.concat(subItem.slug.value);
        paths.push({
          params: {
            slug: subItemSlug,
            navigationItem: subItem.system, // will be ignored by next in getContentPaths
            // Listing items contains navigation and content item in one content model
            contentItem: subItem.system // will be ignored by next in getContentPaths
          }
        });
      });
    }

    const subPaths = await getSubPaths(page.subpages.value, pageSlug, preview);
    paths.push(...subPaths);
  }

  return paths;
}

export async function getSitemapMappings(preview = false) {
  const root = await client.item("homepage")
    .depthParameter(3) // depends on the sitemap level (+1 for content type to download)
    .elementsParameter(["subpages", "slug", "content", "content_type"])
    .queryConfig({
      usePreviewMode: preview
    })
    .toPromise()
    .then(result => result.item);

  const rootSlug = [];
  const pathsFromKontent = [
    {
      params: {
        slug: rootSlug,
        navigationItem: root.system, // will be ignored by next in getContentPaths
        contentItem: root.content.value[0].system // will be ignored by next in getContentPaths
      }
    }
  ];

  const subPaths = await getSubPaths(root.subpages.value, rootSlug, preview);

  return pathsFromKontent.concat(...subPaths);
}


export async function getPageStaticPropsForPath(params, preview = false) {
  const config = await loadWebsiteConfig(preview); // TODO could be cached
  const mappings = await getSitemapMappings(preview); // TODO could be cached

  const slugValue = params && params.slug ? params.slug : [];

  const pathMapping = mappings.find(path => path.params.slug.join("#") === slugValue.join("#")); // condition works for array of basic values

  const navigationItemSystemInfo = pathMapping && pathMapping.params.navigationItem;
  const contentItemSystemInfo = pathMapping && pathMapping.params.contentItem;

  if (!navigationItemSystemInfo || !contentItemSystemInfo) {
    return undefined;
  }

  // TODO could be loaded right in getSitemapMappings
  const seoData = await client.item(navigationItemSystemInfo.codename)
    .elementsParameter(["seo__title", "label", "seo__description", "seo__keywords", "seo__canonical_url", "seo__options"])
    .toPromise()
    .then(response => ({
      title: get(response, 'item.seo__title.value', null) || get(response, "item.label.value", null),
      description: get(response, 'item.seo__description.value', null),
      keywords: get(response, 'item.seo__keywords.value', null),
      canonicalUrl: get(response, 'item.seo__canonical_url.value', null),
      noIndex: get(response, 'item.seo__options.value', []).some(item => item.codename == "no_index"),
    }));

  // Loading content data
  const response = await client.item(contentItemSystemInfo.codename)
    .depthParameter(5)
    .queryConfig({
      usePreviewMode: preview
    })
    .toPromise();
  const item = response.item;

  const result = {
    seo: seoData,
    page: JSON.parse(JSON.stringify(item)), // TODO #12
    linkedItems: JSON.parse(JSON.stringify(response.linkedItems)), // TODO #12
    data: {
      config: JSON.parse(JSON.stringify(config)), // TODO #12
      mappings: JSON.parse(JSON.stringify(mappings)), // TODO #12
    },
    related: {}
  };

  const isLandingPage = item.system.type === "landing_page";

  const isListingPage = item.system.type === "listing_page";

  // Probably unify related and linkedItems
  if (isLandingPage) {
    const listingSections = item.sections.value
      .filter(section => section.system.type === "listing_section");

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
    const linkedItems = await client.items()
      .type(item.content_type.value)
      .queryConfig({
        usePreviewMode: preview
      })
      .toPromise()
      .then(result => result.items);

    result.related[item.system.codename] = JSON.parse(JSON.stringify(linkedItems));  // TODO polish serialization of the js SDK response
  }

  return result;
}