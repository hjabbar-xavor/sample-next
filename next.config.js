module.exports = {
  // https://github.com/vercel/next.js/issues/21079
  // Remove the workaround the issue is fixed
  images: {
    loader: "imgix",
    path: "",
  },
  target: "serverless",
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    console.log(defaultPathMap);
    return {};
    // return {
    //   '/': { page: '/' },
    //   '/about': { page: '/about' },
    //   '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
    //   '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
    //   '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    // }
  },
};