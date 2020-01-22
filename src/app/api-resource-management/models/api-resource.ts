import { ApiScope } from './api-scope';
import { ApiSecret } from './api-secret';
import { ApiResourceProperty } from './api-reosurce-property.';

export class ApiResource {
  constructor() {
    this.properties = new ApiResourceProperty();
  }
  enabled: boolean;
  name: string;
  displayName: string;
  description: string;
  apiSecrets?: ApiSecret[];
  scopes?: ApiScope[];
  userClaims?: string[];
  originalName: string;
  properties?: ApiResourceProperty;
}
