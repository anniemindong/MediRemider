const axios = require('axios');

const BASE_URL = 'http://0.0.0.0:3000';

exports.BASE_URL = BASE_URL;

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

//Medicine
exports.getMedicine = async function (store) {
  const result = await axios.get(`${BASE_URL}/user/medicine`, {
    params: {
      store
    }
  })
  return result.data
}

//Store
exports.getStore = async function () {
  const result = await axios.get(`${BASE_URL}/user/store`)
  return result.data
}
