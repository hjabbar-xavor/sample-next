import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash.get';
import { Action, Link } from '.';
import Image from 'next/image';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: '200px',
  },
  mainMenu: {
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
      <AppBar color="transparent" position="sticky">
        <Container>
          <Toolbar>
            <Link href='/' className={classes.logo}>
              {get(props, 'data.config.header_logo.value[0]')
                ? (<Image
                  asset={get(props, 'data.config.header_logo.value[0]')}
                  src={get(props, 'data.config.header_logo.value[0].url')}
                  alt={get(props, 'data.config.title.value', null)}
                  width="200"
                  height="60"
                />)
                : (<Typography variant="h6">{get(props, 'data.config.title.value', null)}</Typography>)
              }
            </Link>
            <div className={classes.mainMenu}>
              {get(props, 'data.config.main_menu.value[0].actions.value', []).map((navigationItem, index) => (
                <Action key={index} action={navigationItem} {...props} />
              ))}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div >
  );
};

export default Header;
