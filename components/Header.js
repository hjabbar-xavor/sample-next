import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import get from "lodash.get";
import { Action, Image, Link, SideDrawer } from ".";
import { Container, Hidden } from "@material-ui/core";
import {useEffect, useState} from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: "200px",
  },
  mainMenu: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
    "& a": {
      margin: theme.spacing(1),
    }
  }
}));

function Header(props) {
  const classes = useStyles();
  const [nav, setNav] = useState(null);

  useEffect(() => {

    const getNav = async () => {
      await fetch("https://deliver.kontent.ai/603f25ad-2b6d-008d-b5f3-5ca77371d45a/items/main_menu").then((response) => response.json()).then((results) => {
        const keys = Object.keys(results.modular_content);
        const tmp = Object.values(keys).map((value, key) => {
          return value.split('_').length > 2 ? value.split('_')[0]+' '+value.split('_')[1] : value.split('_')[0];
        });
        setNav(tmp);
      });
    };
    getNav();

  }, []);

  return (
    <div className={classes.root}>
      <AppBar color="transparent" position="sticky">
        <Container>
          <Toolbar>
            <Link href='/' className={classes.logo}>
              {get(props, "data.config.item.elements.header_logo.value[0]")
                ? (<Image
                  asset={get(props, "data.config.item.elements.header_logo.value[0]")}
                  alt={get(props, "data.config.item.elements.title.value", null)}
                  width="200"
                  height="60"
                />)
                : (<Typography variant="h6">{get(props, "data.config.item.elements.title.value", null)}</Typography>)
              }
            </Link>
            <Hidden smDown>
              <div className={classes.mainMenu}>
                {nav
                  ? Object.values(nav).map((value, key) => { return <Link href={value.replace(' ', '-')} key={key}>{value}</Link>})
                  : 'loading...'
                }
              </div>
            </Hidden>
            <Hidden mdUp>
              <div className={classes.mainMenu}>
                <SideDrawer navLinks={get(props, "data.config.item.elements.main_menu.linkedItems[0].elements.actions.linkedItems", [])} {...props} />
              </div>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    </div >
  );
}

export default Header;
