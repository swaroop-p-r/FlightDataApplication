import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import GetFlightDetails from './FlightData/GetFlightDetails'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GetFlightDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
