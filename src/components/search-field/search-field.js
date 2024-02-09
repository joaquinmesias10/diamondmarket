import React from 'react';
import { SearchIconSmall } from 'assets/icons/SearchIconSmall';
import { SearchWrapper, Icon, Input } from './search-field.style';

type Props = {
  [x];
  className?;
  icon?;
  name;
  placeholder?;
};
export default function SearchField({
  className,
  icon = <SearchIconSmall />,
  name,
  placeholder,
  ...props
}) {
  const classes = `search-wrapper ${className}`;
  return (
    <SearchWrapper className={classes.trim()}>
      {icon && <Icon>{icon}</Icon>}
      <Input
        name={name}
        className="search-input"
        type="search"
        placeholder={placeholder}
        {...props}
      />
    </SearchWrapper>
  );
}
