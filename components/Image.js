import { kontentImageLoader, srcIsKontentAsset } from "../utils"
import NextImage from 'next/image'
import { useTheme } from "@material-ui/core";


const Image = ({ asset, src, width, height, alt, quality }) => {
  const loader = srcIsKontentAsset(src)
  ? kontentImageLoader
  : undefined;
  
  if (asset && asset.type === "image/svg+xml") {
    return (<img src={asset.url} width={width || '100%'} height={height} />);
  }
  
  const theme = useTheme();

  const componentWidth = width || theme.breakpoints.values.md; // TODO remove the fallback
  const componentHeight = height || (componentWidth / asset.width) * asset.height;

  return <NextImage
    src={asset.url}
    width={componentWidth}
    height={componentHeight}
    alt={alt}
    quality={quality}
    loader={loader}
    layout={componentWidth && componentHeight ? undefined : "fill"}
  />
}

export default Image