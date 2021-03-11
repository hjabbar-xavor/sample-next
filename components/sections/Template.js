import React from 'react'
import get from 'lodash.get'
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  section: {
    background: 'red'
  }
}));

function FeaturesSection(props) {
  const section = get(props, 'section', null);
  const classes = useStyles();


  return (
    <section id={get(section, 'system.codename', null)} className={classes.section}>
      <Container>
        Section: {get(section, 'system.codename', null)}
      </Container>
    </section>
  )
}

export default FeaturesSection
