import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Box, colors, Container, Divider, Grid, Paper } from '@material-ui/core';
import get from "lodash.get";
import upperFirst from "lodash.upperFirst";
import camelCase from "lodash.camelCase";
import { UnknownComponent } from "../components"
import sections from './footerSections';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.grey[200],
    marginTop: theme.spacing(2)
  },
  copyright: {
    margin: 0,
    padding: theme.spacing(1),
    textAlign: "center"
  }
}));

function Footer(props) {
  const footerSections = get(props, 'data.config.footer_sections.value', []);
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container>
        <footer>
          {footerSections.length > 0 && (
            <Grid container spacing={2} alignItems="stretch">
              {footerSections.map((section, index) => {
                const contentType = upperFirst(camelCase(get(section, 'system.type', null)));
                const Component = sections[contentType];

                if (process.env.NODE_ENV === 'development' && !Component) {
                  console.error(`Unknown section component for section content type: ${contentType}`)
                  return (
                    <Grid item xs={12} sm={3} key={index} >
                      <UnknownComponent {...props}>
                        <pre>{JSON.stringify(section.system, undefined, 2)}</pre>
                      </UnknownComponent>
                    </Grid>
                  );
                }

                return (
                  <Grid item xs={12} sm={3} key={index}>
                    <Component  {...props} section={section} />
                  </Grid>
                )
              })
              }
            </Grid>
          )}

          {get(props, 'data.config.copyright.value', null) && (
            <div className={classes.copyright}>
              <Divider/>
              {/* TODO: Create RichText element */}
              <div dangerouslySetInnerHTML={{ __html: get(props, 'data.config.copyright.value') }} />
            </div>
          )}
        </footer>
      </Container>
    </Box>
  );
};

export default Footer;
