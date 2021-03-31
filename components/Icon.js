import { ArrowLeft, ArrowRight, Email, Facebook, GitHub, Instagram, LinkedIn, Twitter, YouTube } from "@material-ui/icons";
import get from "lodash.get";
import React from "react";
import UnknownComponent from ".";

function Icon(props) {
  let icon = get(props, "icon.icon.value[0].codename", null);

  console.log(icon);
  switch (icon) {
    case "arrow_left":
      return <ArrowLeft />;
    case "arrow_right":
      return <ArrowRight />;
    case "envelope":
      return <Email />;
    case "facebook":
      return <Facebook />;
    case "github":
      return <GitHub />;
    case "instagram":
      return <Instagram />;
    case "linkedin":
      return <LinkedIn />;
    case "twitter":
      return <Twitter />;
    case "youtube":
      return <YouTube />;
    default:
      return (
        <UnknownComponent>Unknown icon</UnknownComponent>
      );
  }
}

export default Icon;
