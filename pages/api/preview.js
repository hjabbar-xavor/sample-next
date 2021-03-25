export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.PREVIEW_SECRET
  ) {
    return res
      .status(401)
      .json({ message: "Invalid token" });
  }

  console.log("Entering preview");
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});
  res.redirect("/");
}