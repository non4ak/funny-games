import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TikTak from './pages/TikTak';
import Wordle from './pages/Wordle';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TikTak />} />
        <Route path='/wordle' element={<Wordle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
