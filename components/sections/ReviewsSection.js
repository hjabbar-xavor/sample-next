import React from 'react'
import get from 'lodash.get'
import { Card, CardContent, CardHeader, Container, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(2)
  },
  intro: {
    textAlign: "center"
  },
  reviewCard: {
    height: '100%'
  }
}));

function ReviewsSection(props) {
  const section = get(props, 'section', null);
  const classes = useStyles();


  return (
    <section id={get(section, 'system.codename', null)} className={classes.section}>
      <Container>
        <div className={classes.intro}>
          {get(section, 'title.value', null) && (
            <Typography variant="h2">{get(section, 'title.value', null)}</Typography>
          )}
          {/* TODO: Create RichText element */}
          {get(section, 'subtitle.value', null) && (
            <Typography variant="subtitle1" dangerouslySetInnerHTML={{ __html: get(section, 'subtitle.value', null) }} />
          )}
        </div>


        {get(section, 'reviews.value[0]', null) && (
          <Grid container spacing={2} alignItems="stretch">
            {get(section, 'reviews.value', []).map((review, index) => {
              const author = get(review, 'author.value[0]');
              return (
                <Grid item md={4} sm={12} className={classes.review} key={index}>
                  <Card className={classes.reviewCard} >
                    <CardContent>
                      <blockquote dangerouslySetInnerHTML={{ __html: get(review, 'content.value', null) }} />
                      <Typography component="cite">{get(author, 'first_name.value')} {get(author, 'last_name.value')}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </section>
  )
}

export default ReviewsSection
