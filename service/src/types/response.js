"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationError = void 0;
class CustomValidationError extends Error {
    constructor(errors, message = 'CustomValidationError') {
        super(message);
        this.name = 'CustomValidationError';
        this.errors = errors;
    }
    get fields() {
        const fields = {};
        this.errors.forEach((d) => {
            fields[d.property] = {
                value: d.value,
                message: d.toString(),
            };
        });
        return fields;
    }
}
exports.CustomValidationError = CustomValidationError;
//# sourceMappingURL=response.js.map