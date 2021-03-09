import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper color="grey" position="static">
        <Container>
          <footer>
            <Toolbar>
              Footer
          </Toolbar>
          </footer>
        </Container>
      </Paper>
    </div >
  );
};

export default Footer;
