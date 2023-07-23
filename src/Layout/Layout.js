import { Fragment } from 'react';
import MainHeader from './MainHeader';

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader auth={props.auth}/>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;