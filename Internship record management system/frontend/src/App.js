import './App.css';
import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import UserRegister from './components/UserRegister';
import StudentRegistration from './components/StudentRegistration';
import UserLogin from './components/UserLogin';
import StudentDetails from './components/StudentDetails';


function App() {

  const [usertype, setUsertype] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className="App">
      
      <Router>
        <Route path= '/' exact render= {(props) => (
          <>
            <UserRegister usertype={usertype} setUsertype={setUsertype} email={email} setEmail={setEmail} 
              password={password} setPassword={setPassword}
            />
          </>
        )}/>
        <Route path= '/login' render= {(props) => (
          <>
            <UserLogin
              usertype={usertype} setUsertype={setUsertype} email={email} setEmail={setEmail} 
              password={password} setPassword={setPassword}
            />
          </>
        )}/>
        <Route path= '/studentregistration' render= {(props) => (
          <>
            <StudentRegistration/>
          </>
        )}/>
        <Route path= '/studentdetails' render= {(props) => (
          <>
            <StudentDetails/>
          </>
        )}/>
      </Router>
    </div>
  );
}

export default App;
