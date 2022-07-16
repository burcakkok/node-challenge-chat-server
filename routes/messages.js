const express = require('express');
const router = express.Router();
const Message = require('../models/message');


const welcomeMessage = new Message(0, 'Bart', 'Welcome to CYF')