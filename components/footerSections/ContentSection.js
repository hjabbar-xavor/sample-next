import React from "react";
import get from "lodash.get";
import { makeStyles, Typography } from "@material-ui/core";
import { CtaButtons, Image, RichText } from "..";

const useStyles = makeStyles((_theme) => ({
  content: {
    textAlign: "center"
  }
}));

function ContentSection(props) {
  const section = get(props, "section", null);
  const classes = useStyles();

  return (
    <section id={get(section, "system.codename", null)} className={classes.section}>
      {get(section, "title", null) && (
        <Typography variant="h2">{get(section, "title.value", null)}</Typography>
      )}

      {get(section, "image.value[0]", null) && (
        <div>
          <Image
            width="160"
            height="80"
            asset={(get(section, "image.value[0]", null))}
            alt={get(section, "image.value[0].description") || get(section, "image.value[0].name", null)}
            sizes="160px" />
        </div>
      )}

      {get(section, "content.value", null) && (
        <Typography component="div" className={classes.content} >
          <RichText
            {...props}
            richTextElement={get(section, "content", null)}
          />
        </Typography>
      )}

      {get(section, "actions", null) && (
        <div className={classes.actions}>
          <CtaButtons {...props} actions={get(section, "actions.value", null)} />
        </div>
      )}
    </section>
  );
}

export default ContentSection;
