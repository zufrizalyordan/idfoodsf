import axios from 'axios'
import Config from '../config/env'

const api = axios.create({
    baseURL: 'https://api.yelp.com/v3',
    headers: {
        Authorization: `Bearer ${Config.YELP_API_KEY}`,
    },
})


const getBusinesses = (location, categories) => {
    return api
        .get('/businesses/search', {
            params: {
                limit: 10,
                categories: categories ,
                ...location,
            },
        })
        .then(res =>
            res.data.businesses.map(business => {
                return {
                    name: business.name,
                    coords: business.coordinates,
                }
            })
        )
        .catch(error => console.error(error))
}

export default {
    getBusinesses,
}