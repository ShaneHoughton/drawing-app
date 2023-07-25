import { Fragment } from 'react';
import MainHeader from './MainHeader/MainHeader';
import MobileNavBar from './MobileNavBar';

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader auth={props.auth}/>
      <main>{props.children}</main>
      <MobileNavBar />
    </Fragment>
  );
};

export default Layout;