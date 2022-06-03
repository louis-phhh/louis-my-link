import joi from 'joi'
import genValidationMiddleware from '../../../../middlewares/generator/validatation.middleware-generator'

export const validateGetLinkByIdRequest = genValidationMiddleware({
  params: joi.object({
    link_id: joi.number().required().positive().invalid(null),
  }),
})

export const validateGenNewLinkRequest = genValidationMiddleware({
  body: joi.object({
    original_url: joi.string().required().invalid(null, ''),
    custom_alias: joi.string().optional().allow(''),
  }),
})
