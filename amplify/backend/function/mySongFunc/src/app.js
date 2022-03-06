const express = require("express")
const bodyParser = require("body-parser")
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware")
const axios = require("axios")

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

/**********************
 * Example get method *
 **********************/

app.get("/songs", async function (req, res) {
  try {
    const { data } = await axios.get(`https://striveschool-api.herokuapp.com/api/deezer/search?q=wizkid`)
    res.json({
      success: "post call succeed!",
      url: req.url,
      songs: data.data
    })
  } catch (error) {console.log(error)}
})

app.get("/songs/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url })
})

/****************************
 * Example post method *
 ****************************/

app.post("/songs", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body })
})

app.post("/songs/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body })
})

/****************************
 * Example put method *
 ****************************/

app.put("/songs", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body })
})

app.put("/songs/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body })
})

/****************************
 * Example delete method *
 ****************************/

app.delete("/songs", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url })
})

app.delete("/songs/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url })
})

app.listen(3000, function () {
  console.log("App started")
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
