import { Router, } from 'express'
import { DEPENDENCIES_ID, } from '../../../../constants'
import { myContainer, } from '../../../../inversify.config'
import { validateGenNewLinkRequest, validateGetLinkByIdRequest, } from './link.validation'
import { IControllerLink, } from './types'

const ROUTE_PREFIX = '/links'

const moduleRouter = Router()
const actionRouter = Router()
moduleRouter.use(ROUTE_PREFIX, actionRouter)

const controllerLink = myContainer.get<IControllerLink>(DEPENDENCIES_ID.CONTROLLER_LINK)

actionRouter.get('/testerr', async () => { throw new Error('ấndkjhfg') })
actionRouter.get('/:link_id', validateGetLinkByIdRequest, controllerLink.getLinkById)
actionRouter.post('/', validateGenNewLinkRequest, controllerLink.genNewLink)

export default moduleRouter
