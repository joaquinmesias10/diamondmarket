import React from 'react';
import { SearchBox } from '../../components/search-box/search-box';
import { useApp } from '../../contexts/app/use-app';
import { useIntl } from 'react-intl';
 
const Search = ({ onSubmit, ...props }) => {

  const {searchTerm, setSearchTerm} = useApp();
  // const router = useRouter();
  const intl = useIntl();

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };
  const query = {}
  // const { pathname, query } = router;
  const onSearch = (e) => {
    e.preventDefault();
    const { type, ...rest } = query;
    // if (type) {
    //   router.push(
    //     {
    //       pathname,
    //       query: { ...rest, text: searchTerm },
    //     },
    //     {
    //       pathname: `/${type}`,
    //       query: { ...rest, text: searchTerm },
    //     }
    //   );
    // } else {
    //   router.push({
    //     pathname,
    //     query: { ...rest, text: searchTerm },
    //   });
    // }
    setSearchTerm('');
    if (onSubmit) {
      onSubmit();
    }
  };
  return (
    <SearchBox
      onEnter={onSearch}
      onChange={handleOnChange}
      value={searchTerm}
      name="search"
      placeholder={intl.formatMessage({
        id: 'searchPlaceholder',
        defaultMessage: 'Search your products from here',
      })}
      categoryType={query.type || 'restaurant'}
      buttonText={intl.formatMessage({
        id: 'searchButtonText',
        defaultMessage: 'Search',
      })}
      {...props}
    />
  );
};

export default Search;
