import axios from "axios";

export const weather = async(location) => {
    try {
        const weatherData = await axios.get(`http://localhost:5025/api/weather?location=${location}`);
        return {
            locationName: location,
            weather: weatherData?.data?.timelines?.daily
        }
        // return weatherData?.data
    } catch(err) {
        return err;
    }
    
}