import { kontentImageLoader, srcIsKontentAsset } from "../utils"
import NextImage from 'next/image'


const Image = (props) => {
  const { asset, src, width, height } = props;
  const loader = srcIsKontentAsset(src)
    ? kontentImageLoader
    : undefined;

  const componentWidth = width || asset.width || theme.breakpoints.values.md;
  const componentHeight = height || (componentWidth / asset.width) * asset.height;

  return <NextImage
    {...props}
    src={asset.url}
    width={componentWidth}
    height={componentHeight}
    loader={loader}
    layout="responsive"
  />
}

export default Image