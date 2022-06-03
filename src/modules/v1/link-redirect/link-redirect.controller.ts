import { Response, } from 'express'
import { inject, injectable, } from 'inversify'
import { DEPENDENCIES_ID, } from '../../../constants'
import { IServiceLink, } from '../api/link/types'

import { IControllerLinkRedirect, TypeRequestLinkRedirect, } from './types'

@injectable()
export class CControllerLinkRedirect implements IControllerLinkRedirect {

  public constructor(
    @inject(DEPENDENCIES_ID.SERVICE_LINK) private readonly serviceLink: IServiceLink,
  ) {}

  linkRedirect = async (req: TypeRequestLinkRedirect, res: Response) => {
    const {
      link_token: linkToken,
    } = req.params
    
    const link = await this.serviceLink.getLinkByToken(linkToken)
  
    if (!link) {
      // render 404 page
      return res.status(400).json({ message: 'Link not found!', })
    }

    console.log(link.originalUrl)
    res.redirect(link.originalUrl)
    
  }
}
