import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [weather, setWheater] = useState({});
  useEffect(()=>{
    changeWeather();
  }, []);

  const changeWeather = () =>{
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a7f31378e502e0893f1ce220bb1455cf&units=metric&languaje=es`)
              .then(res => setWheater(res.data))
      });  
  }else{
      console.error('geolocation not available')
  }
  }
  const inCelsius = weather.main?.temp;
  const inFahrenheit = Math.round((inCelsius*1.82) + 32);

  const [isMetric, setIsMetric] = useState(true);

  const changeTemperature = () =>{
    setIsMetric(!isMetric);
  }

  return (
    <div className="App">
      <div className='container'>
        <h1>Weather APP</h1>
        <h2>{weather.name}, {weather.sys?.country}</h2>
        <div className='content'>
          <div className='icon'>
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`} alt="weather-icon" className="temp-img" />
          </div>
          <div className='data'>
            <p>"{weather.weather?.[0].description}"</p>
            <p>Velocidad del viento: {weather.wind?.speed} m/s</p>
            <p>Temperatura: {isMetric ? inCelsius: inFahrenheit} {isMetric ? '°C' : '°F'}</p>
          </div>
        </div>
        <button className='button' onClick={changeTemperature}>Cambiar unidad de medida</button>
      </div>
    </div>
  )
}

export default App
