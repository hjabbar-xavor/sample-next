import { Divider, Grid, makeStyles } from '@material-ui/core';
import { Footer, Header } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh'
  },
  flex: {
    flexGrow: 1
  }
}));

function Layout(props) {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="stretch" alignContent="stretch" className={classes.root}>
      <Grid item>
        <Header {...props} />
      </Grid>
      <Grid item className={classes.flex}>
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