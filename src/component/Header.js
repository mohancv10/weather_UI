import React from "react";
import { useDispatch } from "react-redux";
import {addLocations, clearLocations, clearState} from "../reducer/locationReducer.js"
import { useFetchWeatherData } from "../hooks/customHooks";

const Header = ({setsearchValue, locationData, setShowSuggestion, showSuggestion, searchValue, setIsDataLoaded}) => {
    const dispatch = useDispatch();
    const getWeatherData = useFetchWeatherData();
    const handleSuggestion = async(locationName, item) => {
        setShowSuggestion(false);
        dispatch(addLocations(item));
        setsearchValue("");
    };

    const clearSelection = () => {
        dispatch(clearState());
    };

    const getWeatherInfo = async () => {
        setIsDataLoaded(true);
        await getWeatherData();
        dispatch(clearLocations());
        setIsDataLoaded(false);
    };    
    
    return (
        <React.Fragment>
            <input
                type="text"
                name='search'
                id="search"
                className="search-input"
                placeholder="Search location..."
                value={searchValue}
                multiple
                onChange={(e)=>{setsearchValue(e.target.value);}}
            />
            <button className="search-btn" onClick={() => getWeatherInfo()}>Search</button>
            <button className="clear-btn" onClick={() => clearSelection()}>Clear</button>
            {(locationData?.length > 0 && showSuggestion) && 
                <div style={{alignItems:"center", display: "flex", flexDirection: "column", maxHeight: "100px", overflow: "auto", position: "absolute", width: '100%'}}>
                    {locationData.map((item, index) => {
                        return (
                            <div style={{width: "25%", border: "1px solid #2ea12a", padding: "8px", cursor: "pointer", backgroundColor:"#fafafa"}} onClick={() => handleSuggestion(item.name, item)} key={index + 1}>
                                {item.name}
                            </div>
                        )
                    })}
                </div>
            }
        </React.Fragment>
    )
};

export default Header;