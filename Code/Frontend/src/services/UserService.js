import axios from 'axios';

class UserService {

    saveUser(json){
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "*",
                "Access-Control-Allow-Headers": "*"
            }
        };

        const response = axios.post("https://iheartrate-back.herokuapp.com/api/user", json, axiosConfig);
        return response.data;
    }

    update(json){
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "*",
                "Access-Control-Allow-Headers": "*"
            }
        };

        const response = axios.post("https://iheartrate-back.herokuapp.com/api/user/update", json, axiosConfig);
        return response.data;
    }

    async get(appleId){
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "*",
                "Access-Control-Allow-Headers": "*"
            }
        };

        const response = await axios.get("https://iheartrate-back.herokuapp.com/api/user/" + appleId, axiosConfig);
        return response.data;
    }



}

export default new UserService();