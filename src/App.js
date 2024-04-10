import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Page/HomePage/HomePage';
import SignUp from './Page/SignUp/SignUp';
import Login from './Page/Login/Login';
import { AuthContextProvider} from './Context/AuthContext';
import { SocketContextProvider } from './Context/SocketContext';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <SocketContextProvider>
          <Routes>
            <Route path='/' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<HomePage/>}/>
          </Routes>
          </SocketContextProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
