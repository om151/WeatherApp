import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./searchbox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}){


    let[city,setCity] = useState("");
    let[error,setError] = useState(false);
 
  const API_URL= import.meta.env.VITE_API_URL;
  const API_KEY= import.meta.env.VITE_API_KEY;


    let getWeatherInfo = async () =>{

      try{
        let responce = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        let jsonresponce =  await responce.json();
        console.log(jsonresponce);
        let result = {
          city:city,
          temp : jsonresponce.main.temp,
          tempmin: jsonresponce.main.temp_min,
          tempmax: jsonresponce.main.temp_max,
          humidity: jsonresponce.main.humidity,
          feelslike : jsonresponce.main.feels_like,
          weather : jsonresponce.weather[0].description,
  
  
        };
  
        return result;
      }catch(err){
throw err;
      }
      
    }



  

    let handelChange = (event)=>{
  setCity(event.target.value)
    }

    let handelSubmit = async (event) =>{
       try{
        event.preventDefault(),
        console.log(city);
        setCity("")
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
        setError(false)
       }catch(err){
        setError(true)
       }
      
    }



    return(
        <div className="SearchBox">
           
            <form action="" onSubmit={handelSubmit}>
           
            <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handelChange} required/>
            <br /> <br />
            <Button variant="contained" type="submit">Search</Button>

            {error && <p style={{color:"red"}}>No such place exist</p>}
            </form>
        </div>
    )
}