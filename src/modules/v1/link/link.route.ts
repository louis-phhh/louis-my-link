import { Router, } from 'express'

import {
  getLinkById,
  genNewLink,
} from './link.controller'

const ROUTE_PREFIX = '/links'

const moduleRouter = Router()
const actionRouter = Router()
moduleRouter.use(ROUTE_PREFIX, actionRouter)

actionRouter.get('/testerr', async () => { throw new Error('ấndkjhfg') })
actionRouter.get('/:link_id', getLinkById)
actionRouter.post('/', genNewLink)

export default moduleRouter
