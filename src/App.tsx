import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login/LoginPage.tsx';
import HomePage from "./HomePage.tsx";

function App() {


  return (
    <Router>
      <Routes>
      <Route path="/" element={ <HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </Router>
  )
}

export default App
