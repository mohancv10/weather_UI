import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../reducer/locationReducer.js";

export const store = configureStore({
    reducer: {
        locations: locationReducer
    }
})