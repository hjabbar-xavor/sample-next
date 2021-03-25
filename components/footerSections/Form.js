import React from "react";
import get from "lodash.get";
import { Button, makeStyles } from "@material-ui/core";
import { FormField } from "..";

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  }
}));

function Form(props) {
  const form = get(props, "section", null);
  const classes = useStyles();


  return (
    <section id={get(form, "system.codename", null)}>
      {get(form, "title", null) && (
        <h2>{get(form, "title.value", null)}</h2>
      )}

      {get(form, "content.value", null) && (
        <div>{get(form, "content.value", null)}</div>
      )}

      {/* TODO define best practices for forms submissions - API route for handling */}
      { form && (
        <form
          name={get(form, "form_id.value", null)}
          id={get(form, "form_id.value", null)}
          action={get(form, "form_action.value", null)}
          method="POST"
          className={classes.form}>

          {get(form, "fields.value", []).map((field, field_idx) => (
            <FormField field={field} key={field_idx} />
          ))
          }

          <Button variant="contained" color="primary">
            {get(form, "submit_label.value", null)}
          </Button>
        </form>
      )}

    </section>
  );
}

export default Form;
