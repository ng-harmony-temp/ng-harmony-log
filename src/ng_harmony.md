# Ng-Harmony
============

## Development

![Harmony = 6 + 7;](logo.png "Harmony - Fire in my eyes")

Please concoct a rather useful gist here ...

## Concept

This extra lib to ng-harmony will serve the purpose of *[...]*

Use it in conjunction with

* [literate-programming](http://npmjs.org/packages/literate-programming "click for npm-package-homepage") to write markdown-flavored literate JS, HTML and CSS
* [jspm](https://www.npmjs.com/package/jspm "click for npm-package-homepage") for a nice solution to handle npm-modules with ES6-Module-Format-Loading ...

## Files

This serves as literate-programming compiler-directive

[build/index.js](#Compilation "save:")

You can extend these literate-programming directives here ... the manual is (on jostylr@github/literate-programming)[https://github.com/jostylr/literate-programming]

## Compilation

A logger Mixin that enable ng-harmony to
* abstract the console
//* log errors/exceptions to a db ... sweet dreams are made of the years

Use it via the `@Logging()`-decorator.
This will mixin the log-method into your class.

Also, use it in conjunction with ng-harmony-error.
It is advised to create your own Error-Classes for your purposes,
basing them upon GenericError ...
If you choose to log arbitrary JSON-like Objects, it is advised to
provide properties like so

"level": "debug|info|warn|error",
"name": "MyInformationalError",
"message": "My Msg describing a situation deserving attention"

```javascript
import { ClientConsoleLogger as ClientLogger, ClientRollbarLogger as RemoteLogger } from "we-js-logger";

const Console = new Logger({
    name: 'my-logger',
    environment: 'development',
    level: 'debug',
    codeVersion: process.env.SHA_VERSION,
    logentriesToken: process.env.LOGENTRIES_TOKEN,
    rollbarToken: process.env.ROLLBAR_TOKEN,
    scrubFields: ['password'], // blacklist field keys being sent through logger 
});
```
The Logger-Mixin

```javascript
export class Log {
    log ({ level, msg }, e = {}) {
        if (this.constructor.Loggers.environment !== "production" || level > 39) {
            this.constructor.Loggers.local.write({
                name: this.constructor.name, 
                time: new Date().getTime(),
                level: level,
                msg: msg,
                err: {
                    file: e.fileName || null,
                    line: e.lineNumber || null,
                    column: e.columnNumber || null,
                    stack: e.stack || null
                }    
            });
        }
        if (this.constructor.Loggers.remote !== null) {
            this.constructor.Loggers.remote({ level, msg, err: e});
        }
    }
    static create ({ rollbarToken, environment, npmPackageVersion}) {
        this.Loggers = this.Loggers || {
            local: new ClientLogger(), 
            remote: rollbarToken ? new RemoteLogger({
                token: rollbarToken,
                environment: environment,
                codeVersion: npmPackageVersion
            }) : null,
            environment
        }
    }
}
```
Error Classes
// check what to add n import for extending Error
// note and import to decorator
```javascript
export class GenericError extends Error {
    name = this.constructor.name;
    level = "info";
}

export class PromiseFailureError extends GenericError {
    message = "The Promise in question got rejected";
}

export class VoidError extends GenericError  {
    message = "Expected a non-void content, but got falsy/void content";
    level = "error";
}

export class ValidationError extends GenericError {
    message = "Validation failed!";
    level = "info";
}

export class RemoteValidationError extends ValidationError {
    level = "error";
}

export class LocalValidationError extends ValidationError {
    level = "info";
}

export class DataRequestError extends GenericError {
    message = "Request failed";
}

export class DataReqeustTimeoutError extends DataRequestError {
    message = "The Request timed out";
}

export class DataRequestVoidError extends DataRequestError {
    message = "The Request returned an unexpected empty response";
}

export class NotImplementedError extends GenericError {
    message = "The method is to mandatory by design, but isn't implemented";
    constructor (methodSignature) {
        super();
        this.message = methodSignature + ": " + this.message;
    }
}
```

## CHANGELOG
*v0.1.6* Debugging ...
*v0.1.5* Migrating the `Logging-Decorator` to `ng-harmony-decorator`
*v0.1.4* Due to setting the method dynamically `(Object.defineProperty)` elsewhere, it is possible to add the methodSignature
*v0.1.3* NotImplementedError
*v0.1.2* Basic Error classes
*v0.1.0* Basic Log class with log method only, Logging decorator
