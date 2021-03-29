import React from "react";
import get from "lodash.get";
import { Card, CardActions, CardContent, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { CtaButtons, RichText } from "..";

const useStyles = makeStyles((theme) => ({
  section: {
  },
  intro: {
    textAlign: "center"
  },
  highlight: {
    borderColor: theme.palette.primary.main,
    borderStyle: "solid",
    borderWidth: "4px"
  },
  priceCard: {
    height: "100%",
    textAlign: "center",
    "& ul": {
      listStyle: "none",
      padding: 0
    },
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  },
  cardActions: {
    justifyContent: "center",
    marginBottom: theme.spacing(1)
  }
}));

function FeaturesSection(props) {
  const section = get(props, "section", null);
  const classes = useStyles();

  return (
    <section id={get(section, "system.codename", null)} className={classes.section}>
      <Container>
        <div className={classes.intro}>
          {get(section, "title.value", null) && (
            <Typography variant="h2">{get(section, "title.value", null)}</Typography>
          )}
          {get(section, "subtitle.value", null) && (
            <Typography variant="subtitle1">
              <RichText
                {...props}
                richTextElement={get(section, "subtitle", null)}
              />
            </Typography>)}
        </div>

        {get(section, "pricing_plans.value[0]", null) && (
          <Grid container spacing={2} alignItems="stretch">
            {get(section, "pricing_plans.value", []).map((plan, plan_idx) => {

              const highlight = plan.options.value.some(option => option.codename === "highlight");
              return (
                <Grid item xs={12} sm={4} className={classes.column} key={plan_idx}>
                  <Card variant='outlined' className={`${classes.priceCard} ${highlight ? classes.highlight : ""}`}>
                    <CardContent>
                      {get(plan, "title.value", null) && (
                        <Typography variant="h3" >{get(plan, "title.value", null)}</Typography>
                      )}
                      {get(plan, "subtitle.value", null) && (
                        <Typography variant="subtitle1" >{get(plan, "subtitle.value", null)}</Typography>
                      )}
                      {get(plan, "price.value", null) && (
                        <Typography variant="h4" >{get(plan, "price.value", null)}</Typography>
                      )}
                      {get(plan, "details.value", null) && (
                        <RichText
                          component="div"
                          {...props}
                          richTextElement={get(plan, "details", null)}
                        />
                      )}
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      {get(plan, "actions.value[0]", null) && (
                        <div className="plan-footer block-buttons">
                          <CtaButtons {...props} size="large" actions={get(plan, "actions.value", null)} />
                        </div>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

      </Container>
    </section >
  );
}

export default FeaturesSection;
