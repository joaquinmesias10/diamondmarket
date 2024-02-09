import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export const Scrollbar  = ({
  children,
  className,
  options,
  style,
  ...props
}) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        className: `${className} os-theme-thin`,
        scrollbars: {
          autoHide: 'leave',
        },
        ...options,
      }}
      style={style}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};
