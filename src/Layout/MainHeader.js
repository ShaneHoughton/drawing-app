import AddButton from './AddButton';
import SignOutButton from './SignOutButton';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <h1>Sketchi.io</h1>
      <nav>
        <ul>
          <li>
            <AddButton />
          </li>
          <li>
            <SignOutButton auth={props.auth} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;