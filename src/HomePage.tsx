// HomePage.tsx
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToPage = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={() => goToPage('/login')}>Log In</button>
      {/* <button onClick={() => goToPage('/register')}>Go to Register</button> */}
    </div>
  );
};

export default HomePage;
