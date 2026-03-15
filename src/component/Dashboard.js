import React, { lazy, useEffect, useState } from "react";
import Header from "./Header";
import { useSetsearchValue } from "../hooks/customHooks";
import { getLocations } from "../api/locations";
const Weather = lazy(()=> import("./Weather.js"));

const Dashboard = () => {
    const [locationData, setLocationData] = useState([]);
    const [searchValue, setsearchValue] = useState("");
    const [errorValue, setErrorMessage] = useState("");
    const debounceSearch = useSetsearchValue(searchValue, 300);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    useEffect(()=>{
        const locationsData= async() => {
            const response = await getLocations(searchValue);
            if(!Array.isArray(response)) {
                setErrorMessage(response)
            } else {
                setErrorMessage("")
                setLocationData(response);
                setShowSuggestion(true);
            }
        };
        locationsData();
    },[debounceSearch])
    return (
        <React.Fragment>
            <Header
                setsearchValue={setsearchValue}
                locationData={locationData}
                showSuggestion={showSuggestion}
                setShowSuggestion={setShowSuggestion}
                searchValue={searchValue}
                setIsDataLoaded={setIsDataLoaded}
            />
            {errorValue.length > 0 && <h6>{errorValue}</h6>}
            
            <Weather
                isDataLoaded={isDataLoaded}
            />
        </React.Fragment>
    )
};

export default Dashboard;