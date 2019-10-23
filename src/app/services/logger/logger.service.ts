import {Injectable, Optional} from '@angular/core';
import {LogLevel} from './log-level';

/**
 * Logger options.
 * See {@link Logger}.
 *
 * level - How much detail you want to see in the logs, 0 being off, 1 being the less detailed, 5 being the most. Defaults to WARN.
 * global - Whether you want the created logger object to be exposed in the global scope. Defaults to true.
 * globalAs - The window's property name that will hold the logger object created. Defaults to 'logger'.
 * store - Whether you want the level config to be saved in the local storage so it doesn't get lost when you refresh. Defaults to false.
 * storeAs - The local storage key that will be used to save the level config if the store setting is true.
 * Defaults to 'angular2.logger.level'.
 *
 * Created by Langley on 3/23/2016.
 *
 */
export class Options {
    level: LogLevel;
    global: boolean;
    globalAs: string;
    store: boolean;
    storeAs: string;
}

// For browsers that don't implement the debug method, log will be used instead. Fixes #62.
const CONSOLE_DEBUG_METHOD = console['debug'] ? 'debug' : 'log';

// Temporal until https://github.com/angular/angular/issues/7344 gets fixed.
const DEFAULT_OPTIONS: Options = {
    level: LogLevel.WARN,
    global: true,
    globalAs: 'logger',
    store: false,
    storeAs: 'angular2.logger.level'
};

@Injectable()
export class LoggerService {


    private _level: LogLevel;
    private _globalAs: string;
    private _store: boolean;
    private _storeAs: string;

    public LogLevel: any = LogLevel;

    constructor( @Optional() options?: Options ) {

        // tslint:disable-next-line:max-line-length
        // Move this to the constructor definition when optional parameters are working with @Injectable: https://github.com/angular/angular/issues/7344
        const { level, global, globalAs, store, storeAs } = Object.assign( {}, DEFAULT_OPTIONS, options );

        this._level = level;
        this._globalAs = globalAs;
        this._storeAs = storeAs;

        // tslint:disable-next-line:no-unused-expression
        global && this.global();

        if ( store || this._loadLevel() ) { this.store(); }

    }

    private _loadLevel = (): LogLevel => Number(localStorage.getItem( this._storeAs ));

    private _storeLevel(level: LogLevel) { localStorage[ this._storeAs ] = level; }

    error(className: string, message: string, optionalParam?: any) {

        if (this.isErrorEnabled()) {
            const displayDate = new Date().toLocaleString();
            message = displayDate + ' |' + className + '| ' + message;
            if (optionalParam) {
                console.error(message, optionalParam);
            } else {
                console.error(message);
            }
        }
    }

    warn(className: string, message: string, optionalParam?: any) {
        if (this.isWarnEnabled()) {
            const displayDate = new Date().toLocaleString();
            message = displayDate + ' |' + className + '| ' + message;
            if (optionalParam) {
                console.warn(message, optionalParam);
            } else {
                console.warn(message);
            }
        }
    }

    info(className: string, message: string, optionalParam?: any) {
        if (this.isInfoEnabled()) {
            const displayDate = new Date().toLocaleString();
            message = displayDate + ' |' + className + '| ' + message;
            if (optionalParam) {
                // tslint:disable-next-line:no-console
                console.info(message, optionalParam);
            } else {
                // tslint:disable-next-line:no-console
                console.info(message);
            }
        }
    }

    debug(className: string, message: string, optionalParam?: any) {
        if (this.isDebugEnabled()) {
            const displayDate = new Date().toLocaleString();
            message = displayDate + ' |' + className + '| ' + message;
            if (optionalParam) {
                // tslint:disable-next-line:no-console
                console.debug( message, optionalParam);
            } else {
                // tslint:disable-next-line:no-console
                console.debug(message);
            }
        }
    }

    log(className: string, message: string, optionalParam?: any) {
        if (this.isLogEnabled()) {
            const displayDate = new Date().toLocaleString();
            message = displayDate + ' |' + className + '| ' + message;
            if (optionalParam) {
                console.log( message, optionalParam );
            } else {
                console.log(message);
            }
        }
    }

    global = () => ( <any> window )[this._globalAs] = this;

    store(): LoggerService {

        this._store = true;
        const storedLevel = this._loadLevel();
        if ( storedLevel ) {
            this._level = storedLevel;
        } else {
            this._storeLevel( this.level );
        }

        return this;

    }

    unstore(): LoggerService {
        this._store = false;
        localStorage.removeItem( this._storeAs );
        return this;
    }

    isErrorEnabled = (): boolean => this.level >= LogLevel.ERROR;
    isWarnEnabled = (): boolean => this.level >= LogLevel.WARN;
    isInfoEnabled = (): boolean => this.level >= LogLevel.INFO;
    isDebugEnabled = (): boolean => this.level >= LogLevel.DEBUG;
    isLogEnabled = (): boolean => this.level >= LogLevel.LOG;

    get level(): LogLevel { return this._level; }

    set level(level: LogLevel) {
        // tslint:disable-next-line:no-unused-expression
        this._store && this._storeLevel(level);
        this._level = level;
    }

}
