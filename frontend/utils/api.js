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

//Upload heart rate record 
exports.uploadHeartRateRecord = async function (email, value) {
  const result = await axios.post(`${BASE_URL}/api/heart_rate_record`, {
    email,
    value
  })
  return result.data
}

//Get heart rate record
exports.getHeartRateRecord = async function (email, limit) {
  const result = await axios.get(`${BASE_URL}/api/heart_rate_record`, {
    params: {
      email,
      limit
    }
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
