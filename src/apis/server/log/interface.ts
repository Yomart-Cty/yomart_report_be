export interface LogPayload {
  module: string;
  module_name: string;
  log_type_code: string;
  create_id: number;
  created_at: Date;
  oldData?: object;
  newData?: object;
}
