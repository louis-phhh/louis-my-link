import 'express-async-errors'
import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import config from 'config'

import './inversify.config'

import { CONFIG_NAME, LOGGER_ID, } from './constants'
import { createLogger, } from './logger'

import { mongodbConnect, } from './libs/mongoose'
import * as v1Module from './modules/v1'

const appLogger = createLogger(LOGGER_ID.APP)
const app = express()

app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded())
// app.use(cors());

v1Module.setUpRoute(app)

// error handle
app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found!',
  })
})

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  // if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
  //   return res.status(400).json({
  //     message: 'Invalid input!',
  //   })
  // }
  appLogger.error('An error has occurred:', err)
  res.status(500).json({
    message: 'An error has occurred!',
  })
} )

mongodbConnect()
  .then(() => {
    appLogger.info('Connected to mongodb!')
  }).catch((err) => {
    appLogger.error('There\'s error while connecting to mongodb:', err)
  })

const PORT = config.get(CONFIG_NAME.PORT)
app.listen(PORT, () => {
  appLogger.info(`Server is listening on port: ${PORT}`)
})

export default app
