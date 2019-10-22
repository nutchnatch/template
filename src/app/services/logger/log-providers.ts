import {Options, LoggerService} from "./logger.service";
import {LogLevel} from "./log-level";

/**
 * Custom Providers if the user wants to avoid some configuration for common scenarios.
 * @type {Provider|LoggerService[]}
 *
 * Created by Langley on 8/24/2016.
 */
export const OFF_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { level: LogLevel.OFF } }, LoggerService ];
export const ERROR_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { level: LogLevel.ERROR } }, LoggerService ];
export const WARN_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { level: LogLevel.WARN } }, LoggerService ];
export const INFO_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { level: LogLevel.INFO } }, LoggerService ];
export const DEBUG_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { level: LogLevel.DEBUG } }, LoggerService ];
export const LOG_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { level: LogLevel.LOG } }, LoggerService ];
