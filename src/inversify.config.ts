
import { Container, } from 'inversify'

import { DEPENDENCIES_ID, } from './constants'

import { IControllerLink, IServiceLink, } from './modules/v1/link/types'
import { CControllerLink, } from './modules/v1/link/link.controller'
import { CServiceLink, } from './modules/v1/link/link.service'

const myContainer = new Container()
myContainer.bind<IServiceLink>(DEPENDENCIES_ID.SERVICE_LINK).to(CServiceLink).inSingletonScope()
myContainer.bind<IControllerLink>(DEPENDENCIES_ID.CONTROLLER_LINK).to(CControllerLink).inSingletonScope()

export { myContainer, }
