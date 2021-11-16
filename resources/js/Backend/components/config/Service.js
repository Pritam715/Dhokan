
export const ROOT_URL = '/Dhokan'

export const BASE_URL = 'http://localhost:8000/api/admin'
export const FRONT_URL = 'http://localhost:8000/api'

const getHeaders = async () => {

    // const tokenString = await localStorage.getItem('token');
    // const userToken = JSON.parse(tokenString);

    const userToken = await localStorage.getItem('token');
    // const userToken = JSON.parse(tokenString);

    const headers = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Authorization": "Bearer " + userToken,


        }
    }
    return headers;
}

// frontend
export async function retriveData(path) {

    return await axios.get(FRONT_URL + path, await getHeaders())
        .then((response) => {

            if (response.status === 200) {
                return response;
            }
        })
        .catch(error => alert("Something went wrong!"))
}


export async function createData(path, data) {


    return await axios.post(FRONT_URL + path, data, await getHeaders())
        .then((response) => {
            if (response.status === 200) {
                return response;
            }
        })
        .catch(error => console.log(error))
}




export async function retrive(path) {

    return await axios.get(BASE_URL + path, await getHeaders())
        .then((response) => {

            if (response.status === 200) {
                return response;
            }
        })
        .catch(error => alert("Something went wrong!"))
}
export async function create(path, data) {


    return await axios.post(BASE_URL + path, data, await getHeaders())
        .then((response) => {
            if (response.status === 200) {
                return response;
            }
        })
        .catch(error => console.log(error))
}
