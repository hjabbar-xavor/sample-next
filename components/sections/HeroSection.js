import { colors, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import get from 'lodash.get';
import React from 'react'
import CtaButtons from '../CtaButtons';

const useStyles = makeStyles((theme) => ({
  section: {
    background: `linear-gradient(to right,${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText
  },
  column: {
    margin: "auto",
    color: theme.palette.primary.contrastText,
    background: "transparent",
  },
  headline: {
    fontSize: theme.spacing(4)
  },
  content: {
    fontSize: theme.spacing(2),
  },
  actions: {
    paddingTop: theme.spacing(2),
    color: theme.palette.primary.contrastText
  }
}));

function HeroSection(props) {
  const classes = useStyles();
  const section = props.section;

  return (
    <section id={get(section, 'system.codename', null)} className={classes.section}>
      <Container>
        <Grid container spacing={2} alignItems="stretch" direction="row-reverse">

          {get(section, 'image.value[0]', null) && (
            <Grid item xs={12} sm={6} className={classes.column}>
              {/* TODO use Next Image Component */}
              <img width="100%" src={get(section, 'image.value[0].url', null)} alt={get(section, 'image.value[0].description') || get(section, 'image.value[0].name')} />
            </Grid>
          )}

          <Grid item xs={12} sm={4} className={classes.column}>
            {get(section, 'title', null) && (
              <h2 className={classes.headline}>{get(section, 'title.value', null)}</h2>
            )}

            {/* TODO: Create RichText element */}
            <div dangerouslySetInnerHTML={{ __html: get(section, 'content.value', null) }} className={classes.content} />

            {get(section, 'actions', null) && (
              <div className={classes.actions}>
                <CtaButtons {...props} actions={get(section, 'actions.value', null)} />
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </section >
  );
}

export default HeroSection
