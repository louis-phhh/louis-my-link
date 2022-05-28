
import { Request, } from 'express'
import { TypeHandlerCommon, } from '../../../types'

export interface IControllerLink {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genNewLink: TypeHandlerCommon<any, any, any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLinkById: TypeHandlerCommon<any, any, any, any>;
}

export interface IServiceLink {
  genNewLink: (params: TypeGenNewLinkParams) => Promise<ILink>;
  getLinkById: (id: number) => Promise<ILink | null>;
}

export interface ILink {
  id: number;
  originalUrl: string;
  token: string;
}

export type TypeGenNewLinkParams = {
  originalUrl: string;
}

export type TypeGenNewLinkBody = {
  original_url: string;
}

export type TypeRequestGenNewLink = Request<Dictionary<unknown>, Dictionary<unknown>, TypeGenNewLinkBody>

export type TypeGetLinkByIdPathParams = {
  link_id: number
}

export type TypeRequestGetLinkById = Request<TypeGetLinkByIdPathParams>
