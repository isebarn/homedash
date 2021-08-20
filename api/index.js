import express from 'express'
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const cron = require('node-cron');
const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config()

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

app.get('/spending', async (req, res) => {
  const doc = new GoogleSpreadsheet(process.env.SPENDING_SHEET);
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SERVICE_ACCOUNT,
      private_key: process.env.SERVICE_LOCK.replace(/\\n/g, '\n')
    })
    await doc.loadInfo();
    let summarySheet = doc.sheetsByTitle['Summary']
    const rows = await summarySheet.getRows();
    res.json({
      projection: rows[0].Projection,
      daily: rows[0].Daily
    })

  } catch (err) {
    console.log(err)
  }
})

/**
* logic for our api will go here
*/
export default {
  path: '/api',
  handler: app
}