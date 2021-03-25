import React from "react";
import get from "lodash.get";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { Action } from "..";

const useStyles = makeStyles((theme) => ({
  section: {
    background: `linear-gradient(to right,${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText
  }
}));

function CtaSection(props) {
  const section = get(props, "section", null);
  const classes = useStyles();


  return (
    <section id={get(section, "system.codename", null)} className={classes.section}>
      <Container>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <div className={classes.intro}>
              {get(section, "title.value", null) && (
                <Typography variant="h2">{get(section, "title.value", null)}</Typography>
              )}
              {get(section, "subtitle.value", null) && (
                <Typography variant="subtitle1" dangerouslySetInnerHTML={{ __html: get(section, "subtitle.value", null) }} />
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Action {...props} action={get(section, "action.value[0]")} />
          </Grid>
        </Grid>


      </Container>
    </section>
  );
}

export default CtaSection;
