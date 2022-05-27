import LinkModel from './link.mongoose.model'
import * as nanoidUtils from '../../../utils/nanoid.util' 

import { TypeGenNewLinkParams, } from './types'

const genLinkToken = nanoidUtils.getGenFunction('nolookalikesSafe', 7)

export async function genNewLink(params: TypeGenNewLinkParams) {

  const linkToken = genLinkToken()
  const createLinkParams = {
    originalUrl: params.originalUrl,
    token: linkToken,
  }
  
  const newLink = await (await LinkModel.create(createLinkParams))
  
  return newLink
}

export async function getLinkById(linkId: number) {
  const link = await LinkModel.findOne({ id: linkId, })
  return link
}
