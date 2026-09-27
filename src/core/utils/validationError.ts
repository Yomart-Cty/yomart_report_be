import messages from "@core/config/constants";

export type ValidationError = {
  statusCode: number;
  errors: { field: string; messages: string[] }[];
  message: string;
};

export const validationError = (field: string, msg: string): ValidationError => ({
  statusCode: 400,
  errors: [{ field, messages: [msg] }],
  message: messages.VALIDATION_FAILED,
});
