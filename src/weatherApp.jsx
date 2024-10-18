import { useState } from "react";
import InfoBox from "./infobox";
import SearchBox from "./searchbox";
import "./weatherapp.css"

export default function WeatherApp(){
    const [weatherInfo , setWeatherInfo]= useState({});


    let updateInfo = (result) => {
setWeatherInfo(result);
    }




    return(
        <div style={{textAlign:"center"}}>
            <h2 className="app-title">Om's Weather App</h2>
            <SearchBox updateInfo={updateInfo}/>
            {Object.keys(weatherInfo).length > 0 ? <InfoBox info={weatherInfo} /> : ""}

        </div>
    )
}