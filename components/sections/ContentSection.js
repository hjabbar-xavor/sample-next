import React from 'react'
import get from 'lodash.get'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { CtaButtons } from '..';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(2)
  },
  column: {
    padding: theme.spacing(1)
  },
  actions: {
    '& a': {
      margin: theme.spacing(1)
    }
  }
}));

function ContentSection(props) {
  const section = get(props, 'section', null);
  const classes = useStyles();


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

          <Grid item xs={12} sm={get(section, 'image.value[0]', null) ? 6 : 12} className={classes.column}>
            {get(section, 'title', null) && (
              <Typography variant="h2">{get(section, 'title.value', null)}</Typography>
            )}

            {/* TODO: Create RichText element */}
            <Typography variant="subtitle1" className={classes.content} dangerouslySetInnerHTML={{ __html: get(section, 'content.value', null) }} />

            {get(section, 'actions', null) && (
              <div className={classes.actions}>
                <CtaButtons {...props} actions={get(section, 'actions.value', null)} />
              </div>
            )}
          </Grid>

        </Grid>
      </Container>
    </section>
  )
}

export default ContentSection
