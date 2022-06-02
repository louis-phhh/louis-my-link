import { Request, Response, } from 'express'
import { injectable, } from 'inversify'
import { VIEW_NAME, } from '../../../constants'
// import { DEPENDENCIES_ID, } from '../../../constants'

import { IControllerHome, } from './types'

@injectable()
export class CControllerHome implements IControllerHome {

  // public constructor(
  //   @inject(DEPENDENCIES_ID.SERVICE_LINK) private readonly serviceLink: IServiceLink,
  // ) {}

  home = async (req: Request, res: Response) => {
    return res.render(VIEW_NAME.HOME)
  }
}
