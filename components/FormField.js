import React from 'react'
import get from 'lodash.get'
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  section: {
    background: 'red'
  }
}));

function FormField(props) {
  const styles = useStyles();
  let field = get(props, 'field', null);
  let form = get(props, 'form', null);
  let hideLabel = get(form, 'options.value', [])
    .some(option => option.codename === 'hide_labels');

  let fieldComponent;

  if (field.system.type === 'base_form_field') {
    // TODO finish all types (esp. checkbox)
    fieldComponent = (
      <TextField
        type={get(field, 'type.value[0].codename')}
        label={get(field, 'label.value', null)}
        placeholder={get(field, 'default_value.value', null)}
        required={get(field, 'configuration.value', []).some(config => config.codename) === 'required'}
        name={get(field, 'name.value', null)} />
    );
  }
  else {
    // TODO Select box
  }

  return (
    <div>
      {fieldComponent}
    </div>
  );
}

export default FormField
