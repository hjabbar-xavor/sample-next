import React from 'react'
import get from 'lodash.get'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { CtaButtons } from '..';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(2)
  },
  intro: {
    textAlign: "center"
  }
}));

function FeaturesSection(props) {
  const section = get(props, 'section', null);
  const classes = useStyles();


  return (
    <section id={get(section, 'system.codename', null)} className={classes.section}>
      <Container>
        <div className={classes.intro}>
          {get(section, 'title.value', null) && (
            <Typography variant="h2">{get(section, 'title.value', null)}</Typography>
          )}
          {get(section, 'subtitle.value', null) && (
            <Typography variant="subtitle1" dangerouslySetInnerHTML={{ __html: get(section, 'subtitle.value', null) }} />
          )}
        </div>

        {get(section, 'features.value[0]', null) && (
          get(section, 'features.value', []).map((feature, index) => (
            <Grid container spacing={2} alignItems="center" key={index} direction={index % 2 ? 'row-reverse' : 'row'}>
              {get(feature, 'image.value[0]', null) && (
                <Grid item xs={12} sm={6} className={classes.column}>
                  {/* TODO use Next Image Component */}
                  <img width="100%" src={get(feature, 'image.value[0].url', null)} alt={get(feature, 'image.value[0].description') || get(feature, 'image.value[0].name')} />
                </Grid>
              )}

              <Grid item xs={12} sm={4} className={classes.column}>
                <Typography variant="h3">{get(feature, 'title.value', null)}</Typography>
                <div dangerouslySetInnerHTML={{ __html: get(feature, 'content.value', null) }} />
                {
                  get(feature, 'actions.value[0]', null) && (
                    <CtaButtons {...props} actions={get(feature, 'actions.value', null)} />
                  )
                }
              </Grid>
            </Grid>)
          )
        )}
      </Container>
    </section>
  )
}

export default FeaturesSection
