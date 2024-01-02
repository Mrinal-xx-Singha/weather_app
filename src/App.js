import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // data and location

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  //url: default url provided by API Open Weather Map

  const generateApiUrl =() => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=24d614f3804a5411503d24faaf83be10`;
  };

  // Temperature Conversion Logic
  const convertToFahrenheit = (temp) => {
    const fahrenheit = (temp * 9 / 5 + 32).toFixed();
    return `${fahrenheit}°F`;
  };
  
  const convertToCelsius = (temp) => {
    const celsius = ((temp - 32) * 5 / 9).toFixed();
    return `${celsius}°C`;
  };
  
  const fetchData = () => {
    setLoading(true);
    setError(null);

    axios.get(generateApiUrl())
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError("Search the place in the search bar,Error fetching data.Please try again. ");

      })
      .finally(() => {
        setLoading(false);
      });
  };
  // SearchLocation Function

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetchData();
      setLocation("");
    }
  };

  useEffect(() => {
    //Fetch data when the component mounts

    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="search">
        <input
          // takes the location state

          value={location}
          //it any change occurs  set event to searchedLocation

          onChange={(event) => setLocation(event.target.value)}
          //On key press searchLocation

          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <>
            <div className="top">
              <div className="location">
                {/* data state fetch the name from the search and display it  */}

                <p>{data.name}</p>
              </div>

              {/* Temperature is displayed by fetching the data from the api using data.mai */}

              <div className="temp">
                {/* {data.main ? <h1>{data.main.temp-32/1.8.toFixed()}°C</h1> : null} */}
                {data.main && (
                  <>
                    <h1>{convertToCelsius(data.main.temp)}</h1>
                    <h1>{convertToFahrenheit(data.main.temp)}</h1>
                  </>
                )}
              </div>

              <div className="description">
                {data.weather && data.weather.length > 0 && (
                  <p>{data.weather[0].main}</p>
                )}
              </div>

            </div>

            {/* Fetching  */}

            {data.name && (
              <div className="bottom">
                <div className="feels">
                  {data.main && (
                    <>
                      <p className="bold">
                        {convertToFahrenheit(data.main.feels_like)}
                      </p>
                      <p>Feels Like</p>
                    </>
                  )}
                </div>

                <div className="humidity">
                  {data.main && (
                    <>
                      <p className="bold">{data.main.humidity}%</p>
                      <p>Humidity</p>
                    </>
                  )}
                </div>

                <div className="wind">
                  {data.wind && (
                    <>
                      <p className="bold">{data.wind.speed.toFixed()}MPH</p>
                      <p>Wind Speed</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
