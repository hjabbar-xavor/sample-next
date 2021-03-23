import { Divider, Grid, makeStyles } from '@material-ui/core';
import { Footer, Header, PreviewBar } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh'
  },
  main: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4)
  }
}));

function Layout(props) {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="stretch" alignContent="stretch" className={classes.root}>
      {props.preview && (
        <Grid item>
          <PreviewBar {...props} />
        </Grid>
      )}
      <Grid item>
        <Header {...props} />
      </Grid>
      <Grid item className={classes.main}>
        <main>
          {props.children}
        </main>
      </Grid>
      <Grid item>
        <Footer {...props} />
      </Grid>
    </Grid>
  );
}

export default Layout;