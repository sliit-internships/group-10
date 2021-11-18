import './App.css';
import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserRegister from './components/UserRegister';
import StudentRegistration from './components/StudentRegistration';
import UserLogin from './components/UserLogin';
import StudentDetails from './components/StudentDetails';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';

function App() {

  const [usertype, setUsertype] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className="App">
      <ToastContainer autoClose={5000}/>
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
            <UserLogin/>
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
        <Route path= '/reset-password' render= {(props) => (
          <>
            <ResetPassword/>
          </>
        )}/>
        <Route path= '/forgot-password' render= {(props) => (
          <>
            <ForgotPassword/>
          </>
        )}/>
      </Router>
    </div>
  );
}

export default App;
