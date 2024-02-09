import { useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';

// the redirect will only happen on the client-side. This is by design,
const IndexPage = () => {
  const history = useHistory();
  useEffect(() => {
    history.push('/grocery');
  });
  return (
    <head>
      <meta name="robots" content="noindex, nofollow" />
    </head>
  );
};

export default IndexPage;
