import axios from 'axios';
const fetchClient = () => {


    // let token = JSON.parse(localStorage.getItem("persist:root"))?
    //     JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth)?
    //         JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).token
    //         : null
    //     : null;
    // let token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).token;

     let instance = axios.create({
        baseURL: 'http://localhost:3001/'
    })

    instance.interceptors.request.use( function (config){
        // console.log('l',config)


        // let token = localStorage.getItem('token')
        //
        // if(token)
        // {
        //     config.headers.common['Authorization'] = "Token "+token;
        // }
        return config
     })

    // if(token)
    // {
    //     instance.defaults.headers.common['Authorization'] = "Bearer "+token;
    // }

    return instance;

}



export default fetchClient();