import express from 'express'
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { Curl } = require("node-libcurl");
const querystring = require("querystring");
const cron = require('node-cron');
const { GoogleSpreadsheet } = require('google-spreadsheet');
var MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

const app = express()
app.use(express.json());

// app.use(express.json())

// cron.schedule('* * * * *', () => {console.log("Task is running every minute " + new Date())});

app.get('/data', async (req, res) => {
  const curlTest = new Curl();
  const terminate = curlTest.close.bind(curlTest);
  curlTest.setOpt(Curl.option.URL, "https://www.oddur.is");

  curlTest.on("end", function (statusCode, data, headers) {
    const parsed = cheerio.load(data)
    const text = parsed('.topnav').children('h2:first').text().trim()
    const values = text.split(' - ')
    const temperature = values[0]
    const wind = values[1].split(' ')[1]
    res.json({
      temperature,
      wind
  })
  this.close();
  });
  curlTest.on("error", terminate);

  curlTest.perform();
})


// discontinued
app.get('/v1/data', async (req, res) => {
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
      private_key: process.env.SERVICE
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

app.post('/spending/purchase', async (req, res) => {
  const doc = new GoogleSpreadsheet(process.env.SPENDING_SHEET);
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SERVICE_ACCOUNT,
      private_key: process.env.SERVICE
    })
    await doc.loadInfo();

    let sheet = doc.sheetsByTitle['Transactions']
    const result = await sheet.addRow(req.body);

    res.json({ success: req.body })

  } catch (err) {
    console.log(err)
  }
  console.log(4)
})

app.get('/todo', async (req, res) => {
  try {

    MongoClient.connect(process.env.MONGO, function (err, client) {

      var db = client.db('homedash')

      db.collection('todo').find().toArray(function (err, result) {
        if (err) throw err

        res.json(result)
      })
    })
  } catch (err) {
    console.log(err)
  }
})

app.post('/todo', async (req, res) => {
  MongoClient.connect(process.env.MONGO, function (err, client) {
    var db = client.db('homedash')
    db.collection("todo").insertOne(req.body, function(err, result) {
      if (err) throw err;
      client.close();
      res.json(result)
    });
  })
})

app.post('/todo/all', async (req, res) => {
  MongoClient.connect(process.env.MONGO, function (err, client) {
    var db = client.db('homedash')
    db.collection("todo").deleteMany({}, function(err, result) {
      if (err) throw err;
    });

    let items = req.body.items
    for (var i = items.length - 1; i >= 0; i--) {
      items[i]._id = new ObjectId(items[i]._id)
    }

    db.collection("todo").insertMany(req.body.items, function(err, result) {
      if (err) throw err;
      client.close();
      res.json(result)
    });
  })
})

app.patch('/todo', async (req, res) => {
  MongoClient.connect(process.env.MONGO, function (err, client) {
    var db = client.db('homedash')
    db.collection("todo").updateOne({ _id: new ObjectId(req.body.query._id)}, { $set: req.body.set } , function(err, result) {
      if (err) throw err;
      client.close();

      res.json({success: true})
    });
  })
})

app.delete('/todo/:id', async (req, res) => {
  MongoClient.connect(process.env.MONGO, function (err, client) {
    var db = client.db('homedash')
    const { id } = req.params
    db.collection("todo").deleteOne({ _id: new ObjectId(id)} , function(err, result) {
      if (err) throw err;
      client.close();

      res.json({success: true})
    });
  })
})

/// Article endpoints
app.get('/article', async (req, res) => {
  try {

    MongoClient.connect(process.env.MONGO, function (err, client) {

      var db = client.db('homedash')

      db.collection('article').find().toArray(function (err, result) {
        if (err) throw err

        res.json(result)
      })
    })
  } catch (err) {
    console.log(err)
  }
})

app.post('/article', async (req, res) => {
  MongoClient.connect(process.env.MONGO, function (err, client) {
    var db = client.db('homedash')
    db.collection("article").insertOne(req.body, function(err, result) {
      if (err) throw err;
      client.close();
      res.json(result)
    });
  })
})

app.patch('/article', async (req, res) => {
  MongoClient.connect(process.env.MONGO, function (err, client) {
    var db = client.db('homedash')
    db.collection("article").updateOne({ _id: new ObjectId(req.body.query._id)}, { $set: req.body.set } , function(err, result) {
      if (err) throw err;
      client.close();

      res.json({success: true})
    });
  })
})

app.delete('/article/:id', async (req, res) => {
  MongoClient.connect(process.env.MONGO, function (err, client) {
    var db = client.db('homedash')
    const { id } = req.params
    db.collection("article").deleteOne({ _id: new ObjectId(id)} , function(err, result) {
      if (err) throw err;
      client.close();

      res.json({success: true})
    });
  })
})
/////////////////

export default {
  path: '/api',
  handler: app
}