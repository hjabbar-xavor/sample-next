export default async function exit(_, res) {
  console.log('Exiting preview');
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.redirect('/');
}