import { Request, Response, } from 'express'

import * as LinkService from './link.service'
import { TypeEmpty, TypeGetLinkByIdPathParams, } from './types'

export async function getLinkById(req: Request<TypeGetLinkByIdPathParams, TypeEmpty, TypeEmpty, TypeEmpty>, res: Response) {
  const {
    link_id: linkId,
  } = req.params

  const link = await LinkService.getLinkById(linkId)

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

export async function genNewLink(req: Request, res: Response) {
  const {
    original_url: originalUrl,
  } = req.body

  const genNewLinkParams = {
    originalUrl,
  }
  const newLink = await LinkService.genNewLink(genNewLinkParams)

  res.json({
    link_id: newLink.id,
    original_url: newLink.originalUrl,
    token: newLink.token,
  })
}
