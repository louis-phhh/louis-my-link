import { Express, } from 'express'

import { ROUTE_PREFIX, } from '../../constants'

import linkRouter from './link/link.route'

const VERSION_PREFIX = '/v1'

export function setUpRoute(app: Express) {
  app.use(`${ROUTE_PREFIX.API}${VERSION_PREFIX}`, linkRouter)
}
