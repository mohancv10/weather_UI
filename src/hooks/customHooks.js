import { useEffect, useState } from "react";
import { weather } from "../api/weather.js";
import { useDispatch, useSelector } from "react-redux";
import { addWeather } from "../reducer/locationReducer.js";

export const useSetsearchValue = (value, delay) => {
    const [searchedLocation, setSearchLocation] = useState("");
    useEffect(()=>{
        const handler = setTimeout(()=>{
            if(value?.length > 2)
                setSearchLocation(value);
        }, delay)
        return () => clearTimeout(handler);
    },[value, delay]);

    return searchedLocation;
};

export const useFetchWeatherData = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.locations);
    const getWeatherData = async() => {
        try {
            const response = await Promise.all(
                state?.locations.map(async (location) => {
                    const res = await weather(location.name);
                    return res;
            }));

            dispatch(addWeather(response))
        } catch(err) {
            return err;
        }
    }
    return getWeatherData;
}