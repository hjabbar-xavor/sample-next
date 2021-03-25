import React from "react";
import _ from "lodash";

import pageLayouts from "../layouts";
import { getSitemapMappings, getPageStaticPropsForPath } from "../lib/api";
import UnknownComponent from "../components/UnknownComponent";


function Page(props) {
    // every page can have different layout, pick the layout based on content type
    const contentType = _.get(props, "page.system.type") === "post"
        ? "post"
        : _.get(props, "page.content.value[0].system.type");

    const PageLayout = pageLayouts[contentType];

    if (process.env.NODE_ENV === "development" && !PageLayout) {
        console.error(`Unknown Layout component for page content type: ${contentType}`);
        return (
            <UnknownComponent {...props} useLayout={true}>
                <pre>{JSON.stringify(props, undefined, 2)}</pre>
            </UnknownComponent>
        );
    }

    return <PageLayout {...props} />;
}

export async function getStaticPaths(ctx) {
    console.log("Page [[...slug]].js getStaticPaths", ctx);
    const paths = await getSitemapMappings();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params, preview = false }) {
    console.log("Page [[...slug]].js getStaticProps, params: ", params);
    const props = await getPageStaticPropsForPath(params, preview);
    return { props: { ...props, params, preview } };
}

export default Page;
