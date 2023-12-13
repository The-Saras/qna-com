
import './App.css'
import Signup from './components/Signup'
import Home from './components/Home';
import Login from './components/Login';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import QnaPage from './components/QnaPage';

function App() {


  return (
    <>
    <Router>
      <RecoilRoot>
        
          <Routes>

            <Route path={'/'} element={<Home />} />
            <Route path={'/signup'} element={<Signup />} />
            <Route path={'/signup'} element={<Signup />} />
            <Route path = {'/login'} element={<Login />} />
            <Route path={'/getallque/:qnaid'} element={<QnaPage />} />
            
          </Routes>
      </RecoilRoot>
        </Router>
    </>
  )
}

export default App
