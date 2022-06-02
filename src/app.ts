import 'express-async-errors'
import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import config from 'config'
import path from 'path'
import * as expressHandlebars from 'express-handlebars'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import expressHandlebarsSection from 'express-handlebars-sections'

import { myContainer, } from './inversify.config'

import { CONFIG_NAME, DEPENDENCIES_ID, LOGGER_ID, ROUTE_PREFIX, VIEW_NAME, } from './constants'

import { mongodbConnect, } from './libs/mongoose'
import * as v1Module from './modules/v1'
import { TypeCreateLoggerFunc, } from './logger'

const createLogger = myContainer.get<TypeCreateLoggerFunc>(DEPENDENCIES_ID.LOGGER_CREATOR)
const appLogger = createLogger(LOGGER_ID.APP)
const app = express()

app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))
app.engine(
  'hbs',
  expressHandlebars.engine({
    layoutsDir: path.join(__dirname, 'views/_layouts'),
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views/_partials'),
    extname: '.hbs',
    helpers: {
      section: expressHandlebarsSection(),
    },
    
  })
)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
// app.use(cors());

v1Module.setUpRoute(app)

// error handle
app.use((req, res) => {
  if (req.path.startsWith(ROUTE_PREFIX.API)) {
    return res.status(404).json({
      message: 'Endpoint not found!',
    })
  }
  
  return res.render(VIEW_NAME.NOT_FOUND, { layout: false, })
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
  if (req.path.startsWith(ROUTE_PREFIX.API)) {
    res.status(500).json({
      message: 'An error has occurred!',
    })
  }
  
  return res.render(VIEW_NAME.INTERNAL_SERVER_ERR, { layout: false, })

})

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
