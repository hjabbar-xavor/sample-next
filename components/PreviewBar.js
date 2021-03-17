import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container } from '@material-ui/core';
import get from 'lodash.get';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  actions: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    '& a': {
      margin: theme.spacing(1),
    }
  }
}));

function Header(props) {
  const classes = useStyles();
  const currentPath = '/' + get(props, 'params.slug', []).join('/');

  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="sticky">
        <Container>
          <Toolbar>
            {props.preview && (
              <p>
                You can see preview version of the site!
              </p>
            )}
            <div className={classes.actions}>
              <Button variant="outlined" href="/api/exit-preview">Exit preview</Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div >
  );
};

export default Header;
