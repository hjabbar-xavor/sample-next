import React from 'react'
import get from 'lodash.get'
import { makeStyles } from '@material-ui/core';
import { Action } from '..';

const useStyles = makeStyles((theme) => ({
  noListStyle: {
    listStyle: 'none',
    padding: 0
  }
}));

function Menu(props) {
  const section = get(props, 'section', null);
  const classes = useStyles();


  return (
    <section id={get(section, 'system.codename', null)} className={classes.section}>
      {get(section, 'label', null) && (
        <h2>{get(section, 'label.value', null)}</h2>
      )}

      {get(section, 'actions.value[0]', null) && (
        <ul className={classes.noListStyle}>
          {get(section, 'actions.value', []).map((action, action_idx) => {
            return (
              <li key={action_idx}>
                <Action {...props} action={action} size="small" />
              </li>
            );
          })}
        </ul>
      )}

    </section>
  )
}

export default Menu
