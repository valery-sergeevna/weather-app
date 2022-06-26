import React, {useState} from 'react';
import {useLazyQuery} from "@apollo/client";
import {GET_WEATHER_QUERY} from "../graphql/Queries";

const Home = () => {
    const [city, setCity] = useState('');
    const [getWeather, {data, error}] = useLazyQuery(GET_WEATHER_QUERY, {
        variables:{
            name: city
        }
    })

    if(error) return <p>Error found</p>;

    if(data){
        console.log(data);
    }

    return (
        <div className="home">
            <h1>Search for weather</h1>
            <input type="text" placeholder="Enter city name..." onChange={event=>setCity(event.target.value)}/>
            <button onClick={()=>getWeather()}>Search</button>

            <div className="weather">
                {data &&
                    <>
                        <h3>{data.getCityByName.name}</h3>
                        <h3>Temperature {data.getCityByName.weather.temperature.actual}</h3>
                        <h3>Description {data.getCityByName.weather.summary.description}</h3>
                        <h3>Wind Speed {data.getCityByName.weather.wind.spead}</h3>
                    </>
                }

            </div>
        </div>
    );
};

export default Home;