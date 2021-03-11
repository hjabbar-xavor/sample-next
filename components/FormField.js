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

  //   return (
  //     <>
  //       {(get(field, 'type.value', []).some(option => option.codename !== 'checkbox')) && (
  //         get(field, 'label.value', null) && (
  //           <label
  //             id={get(field, 'name.value', null) + '-label'}
  //             htmlFor={get(field, 'name.value', null)}
  //             className={classNames({
  //               'screen-reader-text': get(section, 'form.value[0].options.value', [])
  //                 .some(option => option.codename === 'hide_labels')
  //             })}>
  //             {get(field, 'label.value', null)}
  //           </label>
  //         )
  //       )}

  //       {(get(field, 'type.value', []).some(option => option.codename === 'checkbox')) ? (
  //         <div className="form-checkbox">
  //           <input id={get(field, 'name.value', null)} type="checkbox" name={get(field, 'name.value', null)}{...(get(field, 'label.value', null) ? ({ "aria-labelledby": get(field, 'name.value', null) + '-label' }) : null)}{...(get(field, 'configuration.value', []).some(config => config.codename === 'required') ? ({ required: true }) : null)} />
  //           {get(field, 'label.value', null) && (
  //             <label htmlFor={get(field, 'name.value', null)} id={get(field, 'name.value', null) + '-label'}>{get(field, 'label.value', null)}</label>
  //           )}
  //         </div>
  //       ) : ((get(field, 'system.type', null) === 'select_form_field') ? (
  //         <div className="form-select">
  //           <select id={get(field, 'name.value', null)} name={get(field, 'name.value', null)}{...(get(field, 'label.value', null) ? ({ "aria-labelledby": get(field, 'name.value', null) + '-label' }) : null)}{...(get(field, 'configuration.value', []).some(config => config.codename) === 'required' ? ({ required: true }) : null)}>
  //             {get(field, 'default_value.value', null) && (
  //               <option value="">{get(field, 'default_value.value', null)}</option>
  //             )}
  //             {_.map(get(field, 'options.value', null), (option, option_idx) => (
  //               <option key={option_idx} value={option.value.value}>{option.label.value}</option>
  //             ))}
  //           </select>
  //         </div>
  //       ) : ((get(field, 'type.value', []).some(option => option.codename === 'textarea')) ? (
  //         <textarea id={get(field, 'name.value', null)} name={get(field, 'name.value', null)} rows="5"{...(get(field, 'label.value', null) ? ({ "aria-labelledby": get(field, 'name.value', null) + '-label' }) : null)}{...(get(field, 'default_value.value', null) ? ({ placeholder: get(field, 'default_value.value', null) }) : null)}{...(get(field, 'configuration.value', []).some(config => config.codename === 'required') ? ({ required: true }) : null)} />
  //       ) :
  //         <input id={get(field, 'name.value', null)} type={get(field, 'type.value[0].codename', null)} name={get(field, 'name.value', null)} {...(get(field, 'label.value', null) ? ({ "aria-labelledby": get(field, 'name.value', null) + '-label' }) : null)} {...(get(field, 'default_value.value', null) ? ({ placeholder: get(field, 'default_value.value', null) }) : null)}{...(get(field, 'configuration.value', []).some(config => config.codename === 'required') ? ({ required: true }) : null)} />
  //       ))}

  //     </>
  //   );
}

export default FormField
