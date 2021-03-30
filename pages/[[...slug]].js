import React from "react";
import _ from "lodash";

import pageLayouts from "../layouts";
import { getSitemapMappings, getPageStaticPropsForPath } from "../lib/api";
import UnknownComponent from "../components/UnknownComponent";
import { useRouter } from "next/router";
import Error from "next/error";


function Page(props) {
    const router = useRouter();
    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return (
            <div>Loading...</div>
        );
    }

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

    const usingGitHubActions = process.env.GITHUB_ACTIONS;

    return {
        paths,
        // Set to false when exporting to static site (during GitHub action CI process)
        fallback: usingGitHubActions ? false : true, 
    };
}

export async function getStaticProps({ params, preview = false }) {
    console.log("Page [[...slug]].js getStaticProps, params: ", params);
    const props = await getPageStaticPropsForPath(params, preview);

    if (props === undefined) {
        return <Error statusCode={errorCode} />
    }

    return {
        props:
        {
            ...props,
            params,
            preview,
        },
        // Next.js will attempt to re-generate the page:
        // https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
        // - When a request comes in
        // - At most once every 5 second
        revalidate: 5, // In seconds
    };
}

export default Page;
