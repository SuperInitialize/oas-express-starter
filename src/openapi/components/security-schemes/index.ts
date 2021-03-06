import { OpenAPIV3 } from 'openapi-types';
import { loginAuth } from './login-auth';

export const securitySchemes: { [schemeName: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SecuritySchemeObject } = {
  loginAuth,
};
