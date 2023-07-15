import AddButton from './AddButton';
import SignOutButton from './SignOutButton';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <h1>Skech.it</h1>
      <nav>
        <ul>
          <li>
            <AddButton />
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;