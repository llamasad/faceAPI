
const express = require('express')
const path = require('path')
const { get } = require('request')
const router= require('./router')
const morgan = require('morgan');
const handlebars = require('express-handlebars'); 
const sass = require('sass');
const tf = require('@tensorflow/tfjs-node');
tf.setBackend('tensorflow');
const app = express()

// app.use(morgan('combined'))
app.use(express.urlencoded())
app.use(express.json())
const connectDB = require('./config/db')
app.use(express.urlencoded({ extended: true }))
connectDB.connect();
app.engine('handlebars',handlebars.engine())

app.set('view engine','handlebars')

app.set('views',path.join(__dirname,'resources/views'))

const viewsDir = path.join(__dirname, 'views')
app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, '../images')))
app.use(express.static(path.join(__dirname, '../media')))
app.use(express.static(path.join(__dirname, '../../weights')))
app.use(express.static(path.join(__dirname, '../../dist')))

router(app);
app.post('/fetch_external_image', async (req, res) => {
  const { imageUrl } = req.body
  if (!imageUrl) {
    return res.status(400).send('imageUrl param required')
  }
  try {
    const externalResponse = await request(imageUrl)
    res.set('content-type', externalResponse.headers['content-type'])
    console.log(externalResponse)
    return res.status(202).send(Buffer.from(externalResponse.body))
  } catch (err) {
    return res.status(404).send(err.toString())
  }
})

app.listen(3000, () => console.log('Listening on port 3000!'))

function request(url, returnBuffer = true, timeout = 10000) {
  return new Promise(function(resolve, reject) {
    const options = Object.assign(
      {},
      {
        url,
        isBuffer: true,
        timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
      },
      returnBuffer ? { encoding: null } : {}
    )

    get(options, function(err, res) {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}