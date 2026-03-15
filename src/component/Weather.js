import React from "react";
import { useSelector } from "react-redux";
import DetailWeather from "./DetailWeather";
import Delta from "./Delta";

const Weather = ({isDataLoaded}) => {
    const state = useSelector((state) => state.locations);
    return (
        <React.Fragment>
            <div style={{display:"flex", flexDirection: "row", justifyContent: "center"}}>
                {state?.locations?.length > 0 && state?.locations?.map((location, index)=>{
                    return (
                    <div style={{
                        margin: "4px 4px 0px 0px",
                        border: "1px solid #ccc",
                        padding: "4px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        backgroundColor:"#efefef"
                    }}
                    key={location.name}
                    >
                        <span>{location.name}</span>
                    </div>
                    )
                })}
            </div>
            <Delta />
            {state.weather.map((weatherInfo) => {
                return (<DetailWeather 
                    weatherInfo={weatherInfo}
                    key={weatherInfo.locationName}
                />)
            })}
            {isDataLoaded && 
                <div>
                    <h3>
                        Loading...
                    </h3>
                </div>
            }
        </React.Fragment>
    );
}

export default Weather;