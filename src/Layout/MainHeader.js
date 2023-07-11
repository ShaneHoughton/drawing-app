import AddButton from './AddButton';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <h1>Prompt</h1>
      <nav>
        <ul>
          <li>
            <AddButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;