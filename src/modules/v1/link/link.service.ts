import LinkModel from './link.mongoose.model'
import { injectable, } from 'inversify'

import * as nanoidUtils from '../../../utils/nanoid.util' 
import { IServiceLink, TypeGenNewLinkParams, } from './types'

const genLinkToken = nanoidUtils.getGenFunction('nolookalikesSafe', 7)

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
    const link = await LinkModel.findOne({ id: linkId, })
    return link
  }
}
