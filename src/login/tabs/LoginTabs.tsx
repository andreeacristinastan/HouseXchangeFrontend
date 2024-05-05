import { useState } from 'react';
import './LoginTabs.css'

export const LoginTabs = () => {
  const [activeTab, setActiveTab] = useState('guest');

  return (

    <div className='button-group'>
          <button 
            className={`tab ${activeTab === 'guest' ? 'active' : ''}`}
            onClick={() => setActiveTab('guest')}
            id='signin-button'
          >
            Guest Sign In
          </button>

          <button 
            className={`tab ${activeTab === 'host' ? 'active' : ''}`}
            onClick={() => setActiveTab('host')}
            id='signin-button'
          >
            Host Sign In
          </button> 
    </div>
      

  )
}
