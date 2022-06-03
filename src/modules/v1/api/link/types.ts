
import { Request, } from 'express'
import { TypeHandlerCommon, } from '../../../../types'

export interface IControllerLink {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genNewLink: TypeHandlerCommon<any, any, any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLinkById: TypeHandlerCommon<any, any, any, any>;
}

export enum EnumLinkServiceResponseCode {
  GEN_NEW_LINK_SUCCESS = 1000,
  GEN_NEW_LINK_DUPLICATE = 1001,
}

export interface IServiceLink {
  genNewLink: (params: TypeGenNewLinkParams) => Promise<{ link: ILink | null, code: EnumLinkServiceResponseCode }>;
  getLinkById: (id: number) => Promise<ILink | null>;
  getLinkByToken: (token: string) => Promise<ILink | null>;
  getShortenedLink: (link: ILink) => string;
}

export interface ILink {
  id: number;
  originalUrl: string;
  token: string;
  isCustomized: boolean;
}

export type TypeGenNewLinkParams = {
  originalUrl: string;
  customAlias?: string | null;
}

export type TypeGenNewLinkBody = {
  original_url: string;
  custom_alias?: string | null;
}

export type TypeRequestGenNewLink = Request<Dictionary<unknown>, Dictionary<unknown>, TypeGenNewLinkBody>

export type TypeGetLinkByIdPathParams = {
  link_id: number
}

export type TypeRequestGetLinkById = Request<TypeGetLinkByIdPathParams>
