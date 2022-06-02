import winston from 'winston'
import 'winston-daily-rotate-file'
import config from 'config'
import { CONFIG_NAME, ENV_NAME, } from '../constants'

function getTransport() {
  const envName = config.get(CONFIG_NAME.ENV)
  if (envName === ENV_NAME.DEV) {
    return new winston.transports.Console()
  }
  
  const logFilename = config.get(CONFIG_NAME.LOG_FILENAME) as string
  return new winston.transports.DailyRotateFile({
    filename: logFilename,
    datePattern: 'YYYY-MM-DD',
  })
}

function getLogFormat(id: string) {
  return winston.format.combine(
    winston.format.label({ label: id, }),
    winston.format.timestamp(),
    winston.format.printf((info) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const splat = info[Symbol.for('splat') as any]
      if (splat) {
        const firstSplat = splat[0]
        if (firstSplat instanceof Error) info.message += `\n${firstSplat.stack}`
        else info.message += `\n${JSON.stringify(firstSplat)}`
      }
      return `[${info.timestamp}] [${info.label}] [${info.level.toUpperCase()}] ${info.message}`
    })
  )
}

export type TypeCreateLoggerFunc = (id: string) => winston.Logger

export function createLogger(id: string) {
  return winston.loggers.add(id, {
    format:getLogFormat(id),
    transports: [
      getTransport(),
    ],
  })
}

