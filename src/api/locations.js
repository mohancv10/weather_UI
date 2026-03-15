import axios from "axios"

export const getLocations = async (searchValue) => {
    try {
        if(searchValue.length > 2){
            const locations = await axios.get(`http://localhost:5025/api/location?search=${searchValue}`);
            return locations?.data;
        } else {
            return {
                data: []
            }
        }
    } catch(err){
        return err.message;
    }
};