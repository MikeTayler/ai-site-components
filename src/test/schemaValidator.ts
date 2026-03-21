import Ajv2020 from "ajv/dist/2020";

const ajv = new Ajv2020({ allErrors: true, strict: false });

export function validateAgainstSchema(schema: object, data: unknown): boolean {
  const validate = ajv.compile(schema);
  return validate(data) === true;
}
