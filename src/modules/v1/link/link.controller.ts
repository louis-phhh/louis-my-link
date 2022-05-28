import { Response, } from 'express'
import { inject, injectable, } from 'inversify'
import { DEPENDENCIES_ID, } from '../../../constants'

import { IControllerLink, IServiceLink, TypeRequestGenNewLink, TypeRequestGetLinkById, } from './types'

@injectable()
export class CControllerLink implements IControllerLink {

  public constructor(
    @inject(DEPENDENCIES_ID.SERVICE_LINK) private readonly serviceLink: IServiceLink,
  ) {}

  getLinkById = async (req: TypeRequestGetLinkById, res: Response) => {
    const {
      link_id: linkId,
    } = req.params
    
    const link = await this.serviceLink.getLinkById(linkId)
  
    res.json(
      link ?
        {
          link_id: link.id,
          original_url: link.originalUrl,
          token: link.token,
        } :
        {}
    )
  }

  genNewLink = async (req: TypeRequestGenNewLink, res: Response) => {
    const {
      original_url: originalUrl,
    } = req.body

    const genNewLinkParams = {
      originalUrl,
    }
    const newLink = await this.serviceLink.genNewLink(genNewLinkParams)
  
    res.json({
      link_id: newLink.id,
      original_url: newLink.originalUrl,
      token: newLink.token,
    })
  }
}
