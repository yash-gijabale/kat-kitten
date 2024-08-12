import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import Playground from './component/Playground';
import {useSelector} from 'react-redux'
import { useEffect } from 'react';


function App() {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user.userData){
      navigate('/play')
    }    
  },[user])
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/play' Component={Playground} />
      </Routes>
    </div>
  );
}

export default App;
