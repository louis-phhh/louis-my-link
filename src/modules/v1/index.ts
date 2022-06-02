import { Express, } from 'express'

import { ROUTE_PREFIX, } from '../../constants'

import linkRouter from './api/link/link.route'
import linkRedirectRouter from './link-redirect/link-redirect.route'
import homeRouter from './home/home.route'

export function setUpRoute(app: Express) {
  app.use('/', linkRedirectRouter)
  app.use('/', homeRouter)
  app.use(`${ROUTE_PREFIX.API}${ROUTE_PREFIX.V1}`, linkRouter)
}
