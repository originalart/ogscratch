const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const queryController = require('./controllers/queryController.js');
const bcryptController = require('./controllers/bcryptController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');

const testQueryController = require('./controllers/testQueryController.js');
const testBcryptController = require('./controllers/testBcryptController.js');
const testCookieController = require('./controllers/testCookieController.js');
const testSessionController = require('./controllers/testSessionController.js');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/api/getallart/', queryController.getAllArt, (req, res) => {
  if (res.locals.error) res.send(res.locals.error);
  else res.send(res.locals.result.rows);
});

app.get('/api/getartpriceascending/', queryController.getArtPriceAscending, (req, res) => {
  if (res.locals.error) res.send(res.locals.error);
  else res.send(res.locals.result.rows);
});

app.get('/api/getartpricedescending/', queryController.getArtPriceDescending, (req, res) => {
  if (res.locals.error) res.send(res.locals.error);
  else res.send(res.locals.result.rows);
});

app.get('/api/getartsizeascending/', queryController.getArtSizeAscending, (req, res) => {
  if (res.locals.error) res.send(res.locals.error);
  else res.send(res.locals.result.rows);
});

app.get('/api/getartsizedescending/', queryController.getArtSizeDescending, (req, res) => {
  if (res.locals.error) res.send(res.locals.error);
  else res.send(res.locals.result.rows);
});

// app.post('/api/testauth/', 
//   testBcryptController.hashPassword, 
//   testQueryController.testAuth, 
//   testCookieController.setSSIDCookie, 
//   testSessionController.verifySession, 
//   testSessionController.lookupSession, 
//   (req, res) => {
//     if (res.locals.error) res.send(res.locals.error);
//     else res.send(res.locals.result);
//   });

  app.post('/api/signup', 
  bcryptController.hashPassword,
  queryController.signUp,
  cookieController.setSSIDCookie,
  sessionController.verifySession,
  sessionController.lookupSession,
  (req, res) => {
    if (res.locals.error) res.send(res.locals.error);
    else res.send(res.locals.result);
    // console.log('END OF SIGNUP ROUTE ERROR', res.locals.error);
  }
  )

// app.post('/api/testsignin', 
//   testQueryController.testSignIn, 
//   testBcryptController.verifyPassword, 
//   testCookieController.setSSIDCookie, 
//   testSessionController.verifySession, 
//   testSessionController.lookupSession, 
//   (req, res) => {
//     if (res.locals.error) {
//       res.send(res.locals.error);
//       res.status(501);
//     } 
//     else res.send(res.locals.result);
//   });


app.post('/api/login', 
  queryController.signIn, 
  bcryptController.verifyPassword, 
  cookieController.setSSIDCookie, 
  sessionController.verifySession, 
  sessionController.lookupSession, 
  (req, res) => {
    if (res.locals.error) {
      res.send(res.locals.error);
      res.status(501);
    } 
    else res.send(res.locals.result);
  });
  
  app.post('/api/findbydistance',
  queryController.signIn,
  cookieController.setSSIDCookie,
  sessionController.lookupSession,
  queryController.findByDistance, (req, res) => {
    if (res.locals.error) {
      res.send(res.locals.error);
      console.log('~~err~~ at end of findDist', res.locals.error);
      res.status(501);
    }
    else res.send(res.locals.result);
    console.log('===END=== findbyDist route', res.locals.result);
  })

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
}); 

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));