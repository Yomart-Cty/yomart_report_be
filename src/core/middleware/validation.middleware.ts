import messages from "@core/config/constants";
import { HttpException } from "@core/exceptions";
import { sendResponse } from "@core/utils";
import { Logger } from "@core/utils";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

const flattenValidationErrors = (
    errors: ValidationError[],
    parentPath = ""
): { field: string; messages: string[] }[] => {
    const result: { field: string; messages: string[] }[] = [];

    for (const err of errors) {
        const fieldPath = parentPath
            ? /^\d+$/.test(err.property)
                ? `${parentPath}[${err.property}]`
                : `${parentPath}.${err.property}`
            : err.property;

        if (err.constraints) {
            result.push({
                field: fieldPath,
                messages: Object.values(err.constraints),
            });
        }

        if (err.children && err.children.length > 0) {
            result.push(...flattenValidationErrors(err.children, fieldPath));
        }
    }

    return result;
};

const errorMiddleware = (type: any, location: 'body' | 'params' | 'query' = 'body', skipMissingProperties = false): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        let data;
        switch (location) {
            case 'body':
                data = req.body;
                break;
            case 'params':
                data = req.params;
                break;
            case 'query':
                data = req.query;
                break;
            default:
                return next(new HttpException(400, 'invalid location'))
        }
        if (!data) {
            return next(new HttpException(400, `${location} is missing`))
        }

        const dtoInstance = plainToClass(type, data);
        validate(dtoInstance, { skipMissingProperties }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                Logger.error('Validation errors:', errors);
                const errorMessages = flattenValidationErrors(errors);
                return sendResponse(res, 400, messages.VALIDATION_FAILED, null, null, errorMessages);
            } else {
                next();
            }
        }).catch((error: Error) => {
            Logger.error('Error Middleware:', error);
            return sendResponse(res, 500, 'server error');
        });
    }
}

export default errorMiddleware;