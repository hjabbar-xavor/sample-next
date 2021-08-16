import { kontentImageLoader, srcIsKontentAsset } from "../utils";
import NextImage from "next/image";
import { useTheme } from "@material-ui/core";


const Image = (props) => {
  const { asset, src, width, height } = props;
  const loader = srcIsKontentAsset(src)
    ? kontentImageLoader
    : undefined;
  const theme = useTheme();

  const componentWidth = width || asset.width || theme.breakpoints.values.md;
  const componentHeight = height || (componentWidth / asset.width) * asset.height;

  console.log(`Asset: ${asset.url} has loader ${loader ? "set" : "unset"}`);

  return <NextImage
    {...props}
    src={asset.url}
    width={componentWidth}
    height={componentHeight}
    loader={loader}
    layout="responsive"
  />;
};

export default Image;