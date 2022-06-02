
import { Container, } from 'inversify'

import { DEPENDENCIES_ID, } from './constants'

import { IControllerLink, IServiceLink, } from './modules/v1/api/link/types'
import { CControllerLink, } from './modules/v1/api/link/link.controller'
import { CServiceLink, } from './modules/v1/api/link/link.service'
import { IControllerLinkRedirect, } from './modules/v1/link-redirect/types'
import { CControllerLinkRedirect, } from './modules/v1/link-redirect/link-redirect.controller'
import { createLogger, TypeCreateLoggerFunc, } from './logger'
import { IControllerHome, } from './modules/v1/home/types'
import { CControllerHome, } from './modules/v1/home/home.controller'

const myContainer = new Container()

myContainer.bind<IServiceLink>(DEPENDENCIES_ID.SERVICE_LINK).to(CServiceLink).inSingletonScope()
myContainer.bind<IControllerLink>(DEPENDENCIES_ID.CONTROLLER_LINK).to(CControllerLink).inSingletonScope()

myContainer.bind<IControllerLinkRedirect>(DEPENDENCIES_ID.CONTROLLER_LINK_REDIRECT).to(CControllerLinkRedirect).inSingletonScope()

myContainer.bind<IControllerHome>(DEPENDENCIES_ID.CONTROLLER_HOME).to(CControllerHome).inSingletonScope()

myContainer.bind<TypeCreateLoggerFunc>(DEPENDENCIES_ID.LOGGER_CREATOR).toConstantValue(createLogger)

export { myContainer, }
