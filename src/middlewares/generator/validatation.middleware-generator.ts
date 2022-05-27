import joi from 'joi'
import express from 'express'
import { get, } from 'lodash'

type TypeRequestValidation = {
  query?: joi.ObjectSchema<any>,
  params?: joi.ObjectSchema<any>,
  body?: joi.ObjectSchema<any>,
}

export default function (validation: TypeRequestValidation) {
  return async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (validation.query) {
      try {
        const query = await validation.query.validateAsync(req.query)
        req.query = query
      } catch (err) {
        return res.status(400).json({
          message: `Request's query validation error: ${get(err, 'message')}`,
        })
      }
    }
    if (validation.params) {
      try {
        const params = await validation.params.validateAsync(req.params)
        req.params = params
      } catch (err) {
        return res.status(400).json({
          message: `Request's params validation error: ${get(err, 'message')}`,
        })
      }
    }
    if (validation.body) {
      try {
        const body = await validation.body.validateAsync(req.body)
        req.body = body
      } catch (err) {
        return res.status(400).json({
          message: `Request's body validation error: ${get(err, 'message')}`,
        })
      }
    }

    return next()
  }
}
