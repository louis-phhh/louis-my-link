import mongoose from 'mongoose'
import config from 'config'

import { CONFIG_NAME, } from '../constants'

const MONGODB_URI = config.get(CONFIG_NAME.MONGODB_URI) as string

export function mongodbConnect() {
  return mongoose.connect(MONGODB_URI)
}
