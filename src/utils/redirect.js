import {Link, useHistory} from 'react-router-dom';

export default (context, target) => {
  if (context.res) {
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    Router.replace(target);
  }
};
