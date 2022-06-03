import LinkModel from './link.mongoose.model'
import { injectable, } from 'inversify'
import * as mongodb from 'mongodb'
import config from 'config'

import * as nanoidUtils from '../../../../utils/nanoid.util' 
import { EnumLinkServiceResponseCode, ILink, IServiceLink, TypeGenNewLinkParams, } from './types'
import { LINK_TOKEN_LENGTH, } from './link.constant'
import { CONFIG_NAME, } from '../../../../constants'

const genLinkToken = nanoidUtils.getGenFunction('nolookalikesSafe', LINK_TOKEN_LENGTH)
const REDIRECT_URL = config.get(CONFIG_NAME.REDIRECT_URL) as string

@injectable()
export class CServiceLink implements IServiceLink {
  
  genNewLink = async (params: TypeGenNewLinkParams) => {
    const [
      linkToken,
      isCustomized,
    ] = params.customAlias ?
      [params.customAlias, true,] :
      [genLinkToken(), false,]
      
    const createLinkParams = {
      originalUrl: params.originalUrl,
      token: linkToken,
      isCustomized,
    }
    
    try {
      const newLink = (await LinkModel.create(createLinkParams)).toObject()
      return {
        code: EnumLinkServiceResponseCode.GEN_NEW_LINK_SUCCESS,
        link: newLink,
      }
    } catch (err) {
      if (err instanceof mongodb.MongoServerError) {
        if (err.code === 11000) {
          return {
            code: EnumLinkServiceResponseCode.GEN_NEW_LINK_DUPLICATE,
            link: null,
          }
        }
      } 

      throw err
    }
  
  }

  getLinkById = async (linkId: number) => {
    const link = await LinkModel.findOne({ id: linkId, }).lean()
    return link
  }

  getLinkByToken = async (linkToken: string) => {
    const link = await LinkModel.findOne({ token: linkToken, }).lean()
    return link
  }

  getShortenedLink = (link: ILink) => {
    return `${REDIRECT_URL}/${link.token}`
  }
}
