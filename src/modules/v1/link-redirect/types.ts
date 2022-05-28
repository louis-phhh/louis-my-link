
import { Request, } from 'express'
import { TypeHandlerCommon, } from '../../../types'

export interface IControllerLinkRedirect {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkRedirect: TypeHandlerCommon<any, any, any, any>;
}

// export interface IServiceLinkRedirect {
//   genNewLink: (params: TypeGenNewLinkParams) => Promise<ILink>;
//   getLinkById: (id: number) => Promise<ILink | null>;
// }

export type TypeLinkRedirectParams = {
  link_token: string;
}

export type TypeRequestLinkRedirect = Request<TypeLinkRedirectParams>
