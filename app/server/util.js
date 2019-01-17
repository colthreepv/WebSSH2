'use strict'
/* jshint esversion: 6, asi: true, node: true */
// util.js

// private
require('colors') // allow for color property extensions in log messages
var debug = require('debug')('WebSSH2')
var Auth = require('basic-auth')

function basicAuth (config) {

  
  function authHandler (req, res, next) {
    console.log('session info', req.session)
    var myAuth = Auth(req)
    // if (req.session.username && req.session.privkey)
  
    if (myAuth && myAuth.pass !== '') {
      req.session.username = myAuth.name
      req.session.userpassword = myAuth.pass
      debug('myAuth.name: ' + myAuth.name.yellow.bold.underline +
        ' and password ' + ((myAuth.pass) ? 'exists'.yellow.bold.underline
        : 'is blank'.underline.red.bold))
      return next()
    } else {
      res.statusCode = 401
      debug('basicAuth credential request (401)')
      res.setHeader('WWW-Authenticate', 'Basic realm="WebSSH"')
      res.end('Username and password required for web SSH service.')
    }
  }

  return authHandler
}

exports.basicAuth = basicAuth

// takes a string, makes it boolean (true if the string is true, false otherwise)
exports.parseBool = function parseBool (str) {
  return (str.toLowerCase() === 'true')
}
