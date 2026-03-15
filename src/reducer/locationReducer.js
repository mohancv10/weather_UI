import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locations: [],
    weather:[]
}

const locationReducer = createSlice({
    name: "locations",
    initialState: initialState,
    reducers: {
        addLocations(state, action){
            return {...JSON.parse(JSON.stringify(state)), locations: [...JSON.parse(JSON.stringify(state?.locations)), action?.payload]}
        },
        addWeather(state, action){
            return {...JSON.parse(JSON.stringify(state)), weather: [...JSON.parse(JSON.stringify(state?.weather)), ...action?.payload]}
        },
        clearLocations(state, action){
            return {...JSON.parse(JSON.stringify(state)), locations: []}
        },
        clearState(state, action){
            return {weather: [], locations: []}
        },
    }
});

export const {addLocations, addWeather, clearState, clearLocations} = locationReducer.actions;

export default locationReducer.reducer;