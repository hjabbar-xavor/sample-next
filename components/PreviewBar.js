import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container } from '@material-ui/core';
import { Link } from '.';

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
              {/* <Button variant="outlined" href={`/api/refresh-mappings?callbackPath=${}`}>Exit preview</Button> */}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div >
  );
};

export default Header;
