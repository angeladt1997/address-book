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

// validate auth Token in request, must match token in .env
function bearerTokenValidation(req, res, next) {
  const authHeader = req.get('Authorization')
  const token = authHeader.split(' ')[1]

  if(token !== API_TOKEN) {
    return res
      .status(401)
      .send('Unauthorized request')
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

// require('dotenv').config()
// const express = require('express')
// const morgan = require('morgan')
// const cors = require('cors')
// const helmet = require('helmet')
// const { NODE_ENV } = require('./config')
// const { v4: uuid } = require('uuid')

// const app = express()

// const morganOption = (NODE_ENV === 'production')
//   ? 'tiny'
//   : 'common';

// app.use(morgan(morganOption))
// app.use(cors())
// app.use(helmet())
// app.use(express.json())

// function validateBearerToken(req, res, next){
//   const apiToken = process.env.API_TOKEN;
//   const authToken = req.get('authorisation')
//   if(!authToken || authToken.split('')[1] !==apiToken){
//     return res.status(401).json({error:'unauthorized request'})
//   }
//   next ();
// }

//  const address= [{
//   "id": "3c8da4d5-1597-46e7-baa1-e402aed70d80",
//   "firstName": "sallyStudent",
//   "lastName": "c00d1ng1sc00l",
//   "address1": "Cache Valley Stone Society",
//   "address2": "false",
//   "city": "yes",
//   "state": "mhm",
//   "zip": 12345

// }]



// 	app.get('/address', (req, res) => {
// 		res.json(address); 
// 	})

  
//   //   res.send('POST Request recieved');
//   //    const data = {
//   //     user: "username",
//   //     pw: "password"
//   //   };
//   //   fetch('http://localhost: 8000/auth/login', {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json"
//   //     }
//   //     body: JSON.stringify(date)
//   //   })
//   //   .then(...)
//   // })

//   app.delete('/address/addressId', validateBearerToken)


// app.use(function errorHandler(error, req, res, next) {
//    let response
//    if (NODE_ENV === 'production') {
//      response = { error: { message: 'server error' } }
//    } else {
//      console.error(error)
//      response = { message: error.message, error }
//    }
//    res.status(500).json(response)
// })







// app.post('/address', validateBearerToken (req, res) => {

//    const {firstName, lastName, address1, address2 = false, city, state, zip}=req.body;
 


// const id = uuid();
// const newAddress = {
//     id,
//     firstName,
//     lastName,
//     address1,
//     address2,
//     city,
//     state,
//     zip

//   }

// address.push(newAddress);
// res
// .status(200)
// .location(`http://localhost:8000/address/${id}`)
// .send('You did that right. So proud of you')

//   app.delete('/adress/:id', (req, res) => {
//   const { userId } = req.params;

//   const index = address.findIndex(u => address.id === id);
//   if (index === -1) {
//     return res
//       .status(404)
//       .end();
//   }

//   address.splice(index, 1);

//   res.send('Deleted');
// });

// module.exports = app