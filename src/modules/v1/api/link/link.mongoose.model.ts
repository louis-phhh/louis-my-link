import mongoose from 'mongoose'

import { genRandomIdForMongoDocument, } from '../../../../utils/nanoid.util'

import { ILink, } from './types'

const linkSchema = new mongoose.Schema<ILink>(
  {
    id: {
      type: Number,
      required: true,
      default: genRandomIdForMongoDocument,
    },
    originalUrl: { type: String, required: true, },
    token: { type: String, required: true, unique: true, },
    isCustomized: { type: Boolean, default: false, },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)
// categorySchema.virtual("parent", {
//   ref: "Category",
//   localField: "parentId",
//   foreignField: "id",
//   count: true,
// })
// categorySchema.virtual("childrens", {
//   ref: "Category",
//   localField: "id",
//   foreignField: "parentId",
// })
// categorySchema.plugin(mongoosePaginate)

export default mongoose.model<ILink>('Link', linkSchema)
