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
import "js-logger";
```
The Logger-Mixin

```javascript
export class Log {
    log (o) {
        if (typeof this._name === "undefined" || this._name === null) {
            this._name = this.constructor.name + "::" + (Math.random() / (new Date()).getTime()).toString(36).slice(-7);
        }
        let level = o.level || "info",
            logger = Logger.get(this._name),
            severe = (o.level === "warn" || o.level === "error");
        logger["info"](o.name);
        o instanceof Error && logger["info"](`F: ${o.fileName}, L: ${o.lineNumber}, C: ${o.columnNumber}`);
        logger[level](o.message);
        o instanceof Error && severe && logger[level](o.stack);
    }
}
```

The decorator

```javascript
    export function Logging() {
		return function decorator(target) {
			target.mixin(Log);
		}
	}
```

## CHANGELOG

*v0.1.0* Basic Log class with log method only, Logging decorator
