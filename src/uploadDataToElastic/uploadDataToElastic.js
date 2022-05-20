const axios = require('axios');

const BASE_URL =
    'https://search-dashboard-ukbjqckkgeqa2c2ybt2ryxp36q.eu-central-1.es.amazonaws.com';

axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
    })
    
    axios.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
    })

const uploadDataToElastic = async (data) => {
    
    
    
    try {
        const res = await axios.post(
            BASE_URL + '/global/_doc',
            {
                ...data
            },
            {
                headers: {
                    Authorization: `Basic YWRtaW46byQmI0RiNGRjI0JzQnA1Q3N0JWJkemR4aiR2KmJiQVRXJCo2R2F0NQ==`
                }
            }
        );

        console.log(`Upload successfull ${res.data}`);
        console.log('\n');
    } catch (error) {
        console.error('Error in uploadDataToElastic', error)
    }
};



module.exports = uploadDataToElastic;
