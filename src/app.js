require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const { v4: uuid } = require('uuid')
const API_TOKEN = process.env.API_TOKEN



const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.json())

function bearerTokenValidation(req, res, next) {
  const authHeader = req.get('Authorization')
  const token = authHeader.split(' ')[1]

  if(token !== API_TOKEN) {
    return res
      .status(401)
      .send('Yeen got no busniess over here. Get now')
  }
  next()
}

const addressBook = [
  {
    'id': uuid(),
    'firstName': 'Bob',
    'lastName': 'Test',
    'address1': '123 Main Street',
    'address2': 'apt 1',
    'city': 'SLC',
    'state': 'UT',
    'zip': 84123
  }
]

app.get('/address', (req, res) => {
  res.status(200).json(addressBook)
})

app.post('/address', bearerTokenValidation, (req, res) => {
  const { firstName, lastName, address1, address2, city, state, zip } = req.body
  
   if (!address) {
    return res
    .status(400)
    .send('Did you...did you skip the whole form?')
  }

  if (!id) {
    return res
    .status(400)
    .send('I hope you know what id means becuse I sure do not');
  }

  if (!firstName) {
  return res
  .status(400)
  .send('How you skip over yo own name????');
}

if (!lastName) {
  return res
  .status(400)
  .send('Not trying to look you up on the internet or anything, I just need all your info');
}



  if (!city) {
    return res
    .status(400)
    .send('Bro, pick a city');
  }



  if (!state) {
    return res
    .status(400)
    .send('<_< The state too');
  }

  if (state.length !== 2) {
    return res
    .status(400)
    .send('Nobody asked you to type in all those letters. Common sense bruh, just the two capital ones');
  }

  if (zip.length !== 5) {
    return res
    .status(400)
    .send('Where have you ever lived where the zip code was more or less than 5 digits?');
  }

  if (!address1) {
    return res
    .status(400)
    .send('Ay lemme get that address so I can pull up');
  }

  if (!zip) {
    return res
    .status(400)
    .send('Ian ask for yo number, I asked for yo zip code. Lemme get that');
  }

  const id = uuid()
  const newAddress = {
    id,
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip
  }

  addressBook.push(newAddress)

  res
    .status(201)
    .location(`http://localhost:8000/address/${id}`)
    .json(newAddress)
})

app.delete('/address/:id', bearerTokenValidation, (req, res) => {
  const { id } = req.params
  const addressIndex = addressBook.findIndex(item => item.id === id)

  addressBook.splice(addressIndex, 1)

  res
    .status(204)
    .end()
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if(NODE_ENV === 'production') {
    response = { error: {message: 'server error'}}
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app

