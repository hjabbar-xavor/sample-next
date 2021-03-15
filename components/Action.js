import { getUrlFromMapping } from "../utils";
import get from 'lodash.get';
import { Button } from "@material-ui/core";
import { Link } from ".";

function Action(props) {
  const { action, data: { mappings } } = props;
  const role = get(action, 'role.value[0].codename', null);
  const navigationItem = get(action, 'navigation_item.value[0]', null)
  const href = navigationItem.system.type === "external_url"
    ? get(navigationItem, 'url.value')
    : getUrlFromMapping(mappings, navigationItem.system.codename);
  const action_options = get(action, 'options.value', []);
  const new_window = action_options.some(item => item.codename === 'new_window');
  const no_follow = action_options.some(item => item.codename === 'no_follow');
  const outlined = action_options.some(item => item.codename === 'outlined');

  const config = {};
  if (role) {
    config.variant = "contained";
    config.color = role;
  }
  if (outlined) {
    config.variant = "outlined";
  }

  // TODO finish for all properties (no_follow, ...)

  return (
    <Button component={Link} underline="none" size={props.size} href={href} {...config}>
      {action.label.value}
    </Button>
  );
}

export default Action
