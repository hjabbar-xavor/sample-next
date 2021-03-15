import get from "lodash.get";
import upperFirst from "lodash.upperfirst";
import camelCase from "lodash.camelCase";
import { Layout, UnknownComponent } from "../components"
import sections from '../components/sections';
import { Box, Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4)
  }
}));

function Post(props) {
  const classes = useStyles();
  const post = get(props, 'page', null);

  if (!post) {
    return (
      <UnknownComponent>
        Page {post.system.codename} does not have any content!
      </UnknownComponent>
    );
  }

  return (
    <Layout {...props}>
      <Container className={classes.root} maxWidth="md">
        {get(post, 'title.value', null) && (
          <Typography variant="h1">{get(post, 'title.value', null)}</Typography>
        )}
        {get(post, 'subtitle.value', null) && (
          <Typography variant="subtitle1" dangerouslySetInnerHTML={{ __html: get(post, 'subtitle.value', null) }} />
        )}

        {get(post, 'image.value[0]', null) && (
          <div>
            {/* TODO use Next Image Component */}
            <img width="100%" src={(get(post, 'image.value[0].url', null))} alt={get(post, 'image.value[0].description') || get(post, 'image.value[0].name', null)} />
          </div>
        )}
        <Typography component="div">
          <div dangerouslySetInnerHTML={{ __html: get(props, 'page.content.value', null) }} />
        </Typography>

        <footer>
          <time>{get(post, 'publishing_date.value', null) && new Date(get(post, 'publishing_date.value', null)).toDateString()}</time>
          {get(post, 'author.value[0]', null) &&
            (', by ' + get(post, 'author.value[0].first_name.value', null) + ' ' + get(post, 'author.value[0].last_name.value', null))}
        </footer>
      </Container>
    </Layout>
  );
}

export default Post;