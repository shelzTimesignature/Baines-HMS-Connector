import axios from 'axios'


const http=axios.create({
    baseURL:`http://localhost:7048/BC130/ODataV4/Company('Baines Avenue Clinic - Live')`,
    auth:{
        username:'shelton',
        password:'33552211Tembo*'
    }
})

export default http