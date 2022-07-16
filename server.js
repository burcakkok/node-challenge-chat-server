const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');

const messagesHandler = require('./routes/messages');

const app = express();

app.use(cors());

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// serves contents in public folder
app.use(express.static(path.join(__dirname, "public")));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
let availableId = 1;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// /messages
app.get("/messages", function (request, response) {
  response.send(messages);
});

app.get("/messages/:id", function (request, response) {
  let messageId = request.params.id;
  response.send(JSON.stringify(messages[messageId]));
});

// POST /messages
app.post("/messages", function (request, response) {
  // sanitize the input fields
  const {from, text} = request.body;
  const newMessage = {from, text};
  newMessage.id = availableId++;
  messages.push(newMessage);
  response.sendStatus(201);
});

app.delete("/messages/:id", function(request, response){
  let messageId = request.params.id;
  const selectedMessage = messages.find(message => message.id == messageId);
  if (selectedMessage) {
    messages.splice(selectedMessage, 1)
    response.status(200).send("Message deleted");
  } else {
    response.status(404).send("Message not found");
  }
});

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
