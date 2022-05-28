import LinkModel from './link.mongoose.model'
import { injectable, } from 'inversify'

import * as nanoidUtils from '../../../../utils/nanoid.util' 
import { IServiceLink, TypeGenNewLinkParams, } from './types'
import { LINK_TOKEN_LENGTH, } from './link.constant'

const genLinkToken = nanoidUtils.getGenFunction('nolookalikesSafe', LINK_TOKEN_LENGTH)

@injectable()
export class CServiceLink implements IServiceLink {

  genNewLink = async (params: TypeGenNewLinkParams) => {

    const linkToken = genLinkToken()
    const createLinkParams = {
      originalUrl: params.originalUrl,
      token: linkToken,
    }
    
    const newLink = (await LinkModel.create(createLinkParams)).toObject()
  
    return newLink
  }

  getLinkById = async (linkId: number) => {
    const link = await LinkModel.findOne({ id: linkId, }).lean()
    return link
  }

  getLinkByToken = async (linkToken: string) => {
    const link = await LinkModel.findOne({ token: linkToken, }).lean()
    return link
  }
}
