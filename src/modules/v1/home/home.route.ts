import { Router, } from 'express'
import { DEPENDENCIES_ID, } from '../../../constants'
import { myContainer, } from '../../../inversify.config'
import { IControllerHome, } from './types'

const ROUTE_PREFIX = '/'

const moduleRouter = Router()
const actionRouter = Router()
moduleRouter.use(ROUTE_PREFIX, actionRouter)

const controllerHome = myContainer.get<IControllerHome>(DEPENDENCIES_ID.CONTROLLER_HOME)

actionRouter.get('/', controllerHome.home)

export default moduleRouter
