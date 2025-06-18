import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TikTak from './pages/TikTak';
import Wordle from './pages/Wordle';
import Main from './pages/Main';
import Rooms from './pages/Rooms';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/rooms' element={<Rooms />}/>
        <Route path='/tic-tac' element={<TikTak />} />
        <Route path='/wordle' element={<Wordle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
