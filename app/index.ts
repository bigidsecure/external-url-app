/* index.ts
This file runs the basics of the application.
*/

import express from 'express'
import bodyParser from 'body-parser'
import Routes from './routes'
import winston from 'winston';
import session from 'express-session'
import path from 'path'
import fs from 'fs'

const app = express();


// REMOVE THIS IN PRODUCTION. THIS DISABLES SSL CERTIFICATE CHECKING FOR TRAINING...
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.emitWarning = (warning, options) => {
  if (typeof warning == 'string' && warning.includes('NODE_TLS_REJECT_UNAUTHORIZED')) {
    return;
  }
}
// END SSL DISABLE

// Logger settings
let logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: __dirname + '/app.log', })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  )
});


// Allow JSON parsing for POST bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.disable('view cache');

app.use("/ui", express.static('public'));
app.use(Routes);

// Logger setup
app.set('logger', logger)
app.use(function (err, req, res, next) {
  logger.error(err);
  res.status(500).send('Something broke! Check the log file!')
})
app.listen( 3000, function () {
    console.log( 'App listening on port 3000' );
} );

// DATABASE ERROR LOGGING
// COMMENT
// }).catch((err) =>
//   logger.error(err)
// )
// COMMENT
// END DATABASE ERROR LOGGING

export default app;