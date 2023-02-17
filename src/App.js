import React,{useState} from 'react';
import axios from 'axios';
import './App.css';


function App() {


  //const url = `https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=24d614f3804a5411503d24faaf83be10`

  return (
   <div className='app'>
    <div className='container'>
      <div className='top'>
        <div className='location'>
          <p>Dallas</p>
        </div>
        <div className='temp'><h1>65degree F</h1> </div>
        <div className='description'>
          <p>Clouds</p>
        </div>
        <div className='bottom'>
          <div className='fells'>
            <p>65degree F</p>
          </div>
          <div className='humidity'>
            <p>20%</p>
            <p>Feels Like</p>
          </div>
          <div className='wind'>12 MPH</div>
        </div>
      </div>
    </div>
    
    </div>
  );
}

export default App;
