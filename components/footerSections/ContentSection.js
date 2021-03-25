import React from "react";
import get from "lodash.get";
import { makeStyles, Typography } from "@material-ui/core";
import { CtaButtons, Image } from "..";

const useStyles = makeStyles(() => ({
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
            src={(get(section, "image.value[0].url", null))}
            alt={get(section, "image.value[0].description") || get(section, "image.value[0].name", null)}
            sizes="160px" />
        </div>
      )}

      {/* TODO: Create RichText element */}
      {get(section, "content.value", null) && (
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: get(section, "content.value", null) }} />
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
