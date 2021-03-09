import { getUrlFromMapping } from "../utils";
import get from 'lodash.get';
import { Button } from "@material-ui/core";
import { Link } from ".";

function Action(props) {
  const { action, data: { mappings } } = props;
  const role = get(action, 'role.value[0].codename', null);
  const navigationItem = get(action, 'navigation_item.value[0]', null)
  const href = getUrlFromMapping(mappings, navigationItem.system.codename);

  const config = {};

  if (role) {
    config.variant = "contained",
      config.color = role
  }

  return (
    <Button {...props} component={Link} underline="none" href={href} {...config}>
      {navigationItem.label.value}
    </Button>
  );
}

export default Action
