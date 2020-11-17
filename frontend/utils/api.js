const axios = require('axios');

const BASE_URL = 'http://192.168.13.166:3000';

exports.register = async function (name, email, password) {
    const result = await axios.post(`${BASE_URL}/user/register`, {
        name,
        email,
        password
      })
     
    return result.data
}
exports.login = async function (email, password) {
    const result = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password
      })
     
    return result.data
}

//heartRate
exports.HeartRate = async function (email) {
  const result = await axios.post(`${BASE_URL}/user/HeartRate`, {
      email
    })
   
  return result.data
}