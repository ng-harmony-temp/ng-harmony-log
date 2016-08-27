import "js-logger";

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

    export function Logging() {
		return function decorator(target) {
			target.mixin(Log);
		}
	}