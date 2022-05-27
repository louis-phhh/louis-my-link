
export interface ILink {
  id: number;
  originalUrl: string;
  token: string;
}

export type TypeEmpty = Record<string, never>

export type TypeGenNewLinkParams = {
  originalUrl: string;
}

export type TypeGetLinkByIdPathParams = {
  link_id: number
}

