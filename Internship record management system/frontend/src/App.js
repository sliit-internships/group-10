import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import UserRegister from './components/UserRegister';
import StudentRegistration from './components/StudentRegistration';
import UserLogin from './components/UserLogin';


function App() {
  return (
    <div className="App">
      
      <Router>
        <Route path= '/' exact render= {(props) => (
          <>
            <UserRegister/>
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
      </Router>
    </div>
  );
}

export default App;
