
import './LoginPage.css'

import { LoginTabs } from './tabs/LoginTabs';
import LoginForm from './form/LoginForm';

const LoginPage = () => {
  return (    
    <div className='login-wrapper'>

      <div className='login-container'>
        <LoginTabs/>
        <LoginForm/>
      </div>
    
    </div>

  )
}

export default LoginPage