const fetch = require('node-fetch')
const cheerio = require('cheerio')

function oddur (app) {
  return fetch('https://www.oddur.is')
    .then(response => response.text())
    .then((data) => {
      const parsed = cheerio.load(data)
      const text = parsed('.topnav').children('h2:first').text().trim()
      const values = text.split(' - ')
      const temperature = values[0]
      const wind = values[1].split(' ')[1]
      console.log(temperature)
      console.log(wind)
    })
/*  const response = await app.$axios.put('rest/v1/data-management/access-url', {
    filename
  }) */
}

export default ({ app }, inject) => {
  inject('oddur', () => oddur(app))
}
