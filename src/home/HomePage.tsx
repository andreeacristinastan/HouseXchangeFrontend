// import { useNavigate } from 'react-router-dom';
import Categories from './Categories';
import GettingStarted from './GettingStarted';

export default function ProductCategories() {
  // const navigate = useNavigate();

  // const goToPage = (path: string) => {
  //   navigate(path);
  // };
  return (
    <div>
      {/* <h1>Welcome to the Home Page!</h1>
      <button onClick={() => goToPage('/login')}>Log In</button>
      <button onClick={() => goToPage('/register')}>Sign Up</button> */}
      <GettingStarted/>
      <Categories/>
    
    </div>

  );
}