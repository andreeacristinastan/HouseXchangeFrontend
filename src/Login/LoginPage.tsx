
import './LoginPage.css'

import { LoginTabs } from './Tabs/LoginTabs';
import LoginForm from './Form/LoginForm';

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