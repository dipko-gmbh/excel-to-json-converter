const axios = require('axios');

const BASE_URL =
    'https://search-dashboard-ukbjqckkgeqa2c2ybt2ryxp36q.eu-central-1.es.amazonaws.com';

const uploadDataToElastic = async (data) => {
    try {
        await axios.post(
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
    } catch (error) {
        console.error(error)
    }


    
};



module.exports = uploadDataToElastic;
