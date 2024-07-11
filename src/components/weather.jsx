import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons' 
import clear from '../assets/clear.png'
import Humidity from '../assets/humidity.png'
import snow from '../assets/snow.png'
import rain from '../assets/rain.png'
import drizzle from '../assets/drizzle.png'
import cloud from '../assets/cloud.png'
import Wind from '../assets/wind.png'
import './weather.css'
function Weather(){
    const [weather, setweather] = useState(false);
    const [city, setcity] = useState('Chennai');
    const [errorMessage, setErrorMessage] = useState('');
    const icons={
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":cloud,
        "04n":cloud,
        "09d":drizzle,
        "09n":drizzle,
        "10d":rain,
        "10n":rain,
        "11d":rain,
        "11n":rain,
        "13d":snow,
        "13n":snow,
        "50d":drizzle,
        "50n":drizzle
    }
    const input=document.getElementById("input");
    const icon=icons[weather.icon]
    const search = async(city)=>{
        try {const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1fd4c0cb5950f26df1c248aa861c10df`)
        const data = await api.json()
        console.log(data)
        setweather({location:data.name,
            temp:Math.floor(data.main.temp),
            humidity:data.main.humidity,
            icon:data.weather[0].icon,
            description:data.weather[0].description,
            wind:data.wind.speed
        })
        input.style.border='none';
        setErrorMessage('');
        } catch (error) {
            input.style.border="1px solid red";
            setErrorMessage('Invalid city');
        }
    }
    useEffect(()=>{search(city)},[city])
    
    function getvalues(){
        setcity(input.value);
    }

    return(
        <div className="main">
            <div className="input">
            <input type="text" id="input" placeholder='Search' onKeyDown={(e) => {if (e.key === "Enter"){
                getvalues();}}} />
            <button onClick={getvalues}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
            </div>
            {errorMessage && <p style={{ color: 'red' , fontSize: '12px' ,fontFamily:'monospace',letterSpacing:'-1px',paddingRight:'85px'}}>{errorMessage}</p>}
            <img src={icon} alt=""/>
            <p className="temp">{weather.temp}°C</p>
            <p className="city">{weather.location}</p>
            <p className="description">{weather.description}</p>
            <div className="container">
            <div className="humidity">
                <p className='alignment'><img src={Humidity} alt=""/>{weather.humidity}%</p>
                <p>Humidity</p>
            </div>
            <div className="windSpeed">
            <p className='alignment'><img src={Wind} alt="" />{weather.wind}m/s</p>
                <p>Wind Speed</p>
            </div>
            </div>
        </div>
    )
}
export default Weather;