import React, { useState } from 'react'
import axios from 'axios'

function App() {

  // data and location

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  //url: default url provided by API Open Weather Map  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=24d614f3804a5411503d24faaf83be10
  `
  // SearchLocation Function 

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
        // takes the location state 

          value={location}
        //it any change occurs  set event to searchedLocation 

          onChange={event => setLocation(event.target.value)}

          //On key press searchLocation 

          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text" />

      </div>

      <div className="container">
        <div className="top">
          <div className="location">

            {/* data state fetch the name from the search and display it  */}

            <p>{data.name}</p>
          </div>

          {/* Temperature is displayed by fetching the data from the api using data.mai */}

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {/* Fetching  */}

        {data.name !== undefined &&
          <div className="bottom">

            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>

            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;