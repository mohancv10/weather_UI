import React, { useMemo } from "react"

const transformWeatherData = (weatherData) => {
    if(!weatherData) return {list: [],avghighTemp: 0, avgminTemp: 0};
    let totalHigh = 0;
    let totalLow = 0;

    const list = weatherData?.weather?.map((item)=>{
        const high = Math.ceil(item?.values?.temperatureMax || 0);
        const low = Math.floor(item?.values?.temperatureMin || 0);

        totalHigh += high;
        totalLow += low;
        
        return {
            date: new Date(item.time).toLocaleDateString(),
            celsius: Math.ceil(item?.values?.temperatureMax),
            fahrenheit: Math.floor((item?.values?.temperatureMax * 1.8) + 32),
            lowCelcius: Math.floor(item?.values?.temperatureMin)
        }
    });
    const count = list?.length || 1;
    return {
        list,
        avghighTemp: totalHigh / count,
        avgminTemp: totalLow / count
    }
};

const DetailWeather = ({weatherInfo}) => {
    const {list, avghighTemp, avgminTemp} = useMemo(()=> transformWeatherData(weatherInfo),[weatherInfo, weatherInfo?.locationName]);
    return (
        <React.Fragment key={weatherInfo?.locationName}>
            <div>
                <h2>{weatherInfo?.locationName}</h2>
                <h4 className="temp-values">Avg high temperature : <b>{Math.ceil(avghighTemp)} {"\u00B0C"}</b></h4>
                <h4 className="temp-values">Avg low temperature : <b>{Math.floor(avgminTemp)} {"\u00B0F"}</b></h4>
                 <div style={{display:"grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginTop: "30px", cursor: "pointer"}}>
                    {list?.length > 0 && list.map((item) => {
                        return (
                        <div style={{border: "1px solid #ccc", padding: "10px", display: "flex", flexDirection: "column"}} key={item?.date}>
                            <label>Date : <b>{item?.date}</b></label>
                            <label>Celcius : <b>{item?.celsius} {"\u00B0C"}</b></label>
                            <label>Farenheit : <b>{item?.fahrenheit} {"\u00B0F"}</b></label>
                        </div>)
                    })}
                </div>
            </div>
        </React.Fragment>
    )
};

export default DetailWeather;