import express from 'express'
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const cron = require('node-cron');

const app = express()

// app.use(express.json())

// cron.schedule('* * * * *', () => {console.log("Task is running every minute " + new Date())});


app.get('/data', async (req, res) => {
  return fetch('https://www.oddur.is')
    .then(response => response.text())
    .then((data) => {
      const parsed = cheerio.load(data)
      const text = parsed('.topnav').children('h2:first').text().trim()
      const values = text.split(' - ')
      const temperature = values[0]
      const wind = values[1].split(' ')[1]
      res.json({
        temperature,
        wind
      })
    })
})

/**
* logic for our api will go here
*/
export default {
  path: '/api',
  handler: app
}