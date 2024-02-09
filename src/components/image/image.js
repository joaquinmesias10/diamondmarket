import React from "react";
import { Img } from "react-image";
import placeholder from "./product-placeholder.png";
const Placeholder = () => <img src={placeholder} alt="product img loader" />;
export default function Image({
  url,
  alt = "placeholder",
  unloader,
  loader,
  className,
  style,
} ) {
  return (
    <Img
      draggable={false}
      style={style}
      src={url}
      key={url}
      alt={alt}
      loader={<Placeholder />}
      unloader={<Placeholder />}
      className={className}
    />
  );
}
