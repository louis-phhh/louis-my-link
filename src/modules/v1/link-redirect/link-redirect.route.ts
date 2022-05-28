import { Router, } from 'express'
import { DEPENDENCIES_ID, } from '../../../constants'
import { myContainer, } from '../../../inversify.config'
import { IControllerLinkRedirect, } from './types'

const ROUTE_PREFIX = '/'

const moduleRouter = Router()
const actionRouter = Router()
moduleRouter.use(ROUTE_PREFIX, actionRouter)

const controllerLink = myContainer.get<IControllerLinkRedirect>(DEPENDENCIES_ID.CONTROLLER_LINK_REDIRECT)

actionRouter.get('/:link_token', controllerLink.linkRedirect)

export default moduleRouter
