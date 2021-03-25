import get from "lodash.get";
import { Image, Layout, UnknownComponent } from "../components";
import { Container, makeStyles, Typography, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4)
  }
}));

function SimplePage(props) {
  const classes = useStyles();
  const page = get(props, "page.content.value[0]", null);

  const theme = useTheme();
  const imageSizes = `${theme.breakpoints.values.md}px`;

  if (!page) {
    return (
      <UnknownComponent>
        Page {page.system.codename} does not have any content!
      </UnknownComponent>
    );
  }

  return (
    <Layout {...props}>
      <Container className={classes.root} maxWidth="md">
        {get(page, "title.value", null) && (
          <Typography variant="h1">{get(page, "title.value", null)}</Typography>
        )}
        {get(page, "subtitle.value", null) && (
          <Typography variant="subtitle1" dangerouslySetInnerHTML={{ __html: get(page, "subtitle.value", null) }} />
        )}

        {get(page, "image.value[0]", null) && (
          <div>
            <Image
              sizes={imageSizes}
              asset={(get(page, "image.value[0]", null))}
              alt={get(page, "image.value[0].description") || get(page, "image.value[0].name", null)} />
          </div>
        )}
        <Typography component="div">
          <div dangerouslySetInnerHTML={{ __html: get(props, "page.content.value[0].content.value", null) }} />
        </Typography>
      </Container>
    </Layout>
  );
}

export default SimplePage;