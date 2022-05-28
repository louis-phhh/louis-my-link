import { Request, Response, } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypeHandlerCommon<A = any, B = any, C = any, D = any, E = any> 
  = (req: Request<A, B, C, D, E>, res: Response) => Promise<unknown>
