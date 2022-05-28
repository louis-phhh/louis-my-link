import { Express, } from 'express'

import { ROUTE_PREFIX, } from '../../constants'

import linkRouter from './link/link.route'

export function setUpRoute(app: Express) {
  app.use(`${ROUTE_PREFIX.API}${ROUTE_PREFIX.V1}`, linkRouter)
}
