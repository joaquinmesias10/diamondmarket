import React from 'react';

export const SEO = ({
  title,
  description,
  canonical,
  css,
  js,
  image,
}) => (
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta
      name="viewport"
      content="width=device-width,maximum-scale=1,initial-scale=1"
    />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta property="og:site_name" content="Proper Noun" />
    <meta property="og:url" content={`${canonical}`} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="@propernounco" />
    <meta name="twitter:creator" content="@propernounco" />
    {css && <link rel="stylesheet" href={`${css}`} />}
    {image ? (
      <meta property="og:image" content={`${image}`} />
    ) : (
      <meta
        property="og:image"
        content="https://www.propernoun.co/static/images/proper-noun-social.png"
      />
    )}
    {image && <meta name="twitter:image" content={`${image}`} />}
    {canonical && <link rel="canonical" href={`${canonical}`} />}
    {js && <script type="text/javascript" src={`${js}`}></script>}
  </head>
);
