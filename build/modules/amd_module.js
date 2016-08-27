import "js-logger";

export let Log = class Log {
    log(o) {
        if (typeof this._name === "undefined" || this._name === null) {
            this._name = this.constructor.name + "::" + (Math.random() / new Date().getTime()).toString(36).slice(-7);
        }
        let level = o.level || "info",
            logger = Logger.get(this._name),
            severe = o.level === "warn" || o.level === "error";
        logger["info"](o.name);
        o instanceof Error && logger["info"](`F: ${ o.fileName }, L: ${ o.lineNumber }, C: ${ o.columnNumber }`);
        logger[level](o.message);
        o instanceof Error && severe && logger[level](o.stack);
    }
};

export function Logging() {
    return function decorator(target) {
        target.mixin(Log);
    };
}

export let GenericError = class GenericError extends Error {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.name = this.constructor.name, this.level = "info", _temp;
    }

};

export let PromiseFailureError = class PromiseFailureError extends GenericError {
    constructor(...args) {
        var _temp2;

        return _temp2 = super(...args), this.message = "The Promise in question got rejected", _temp2;
    }

};

export let VoidError = class VoidError extends GenericError {
    constructor(...args) {
        var _temp3;

        return _temp3 = super(...args), this.message = "Expected a non-void content, but got falsy/void content", this.level = "error", _temp3;
    }

};

export let ValidationError = class ValidationError extends GenericError {
    constructor(...args) {
        var _temp4;

        return _temp4 = super(...args), this.message = "Validation failed!", this.level = "info", _temp4;
    }

};

export let RemoteValidationError = class RemoteValidationError extends ValidationError {
    constructor(...args) {
        var _temp5;

        return _temp5 = super(...args), this.level = "error", _temp5;
    }

};

export let LocalValidationError = class LocalValidationError extends ValidationError {
    constructor(...args) {
        var _temp6;

        return _temp6 = super(...args), this.level = "info", _temp6;
    }

};

export let DataRequestError = class DataRequestError extends GenericError {
    constructor(...args) {
        var _temp7;

        return _temp7 = super(...args), this.message = "Request failed", _temp7;
    }

};

export let DataReqeustTimeoutError = class DataReqeustTimeoutError extends DataRequestError {
    constructor(...args) {
        var _temp8;

        return _temp8 = super(...args), this.message = "The Request timed out", _temp8;
    }

};

export let DataRequestVoidError = class DataRequestVoidError extends DataRequestError {
    constructor(...args) {
        var _temp9;

        return _temp9 = super(...args), this.message = "The Request returned an unexpected empty response", _temp9;
    }

};

export let NotImplementedError = class NotImplementedError extends GenericError {
    constructor(...args) {
        var _temp10;

        return _temp10 = super(...args), this.message = "The method is to mandatory by design, but isn't implemented", _temp10;
    }

};

//# sourceMappingURL=amd_module.js.map