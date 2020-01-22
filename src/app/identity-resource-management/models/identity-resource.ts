export class IdentityResource {
    id: number;
    enabled: boolean;
    name: string;
    displayName: string;
    description?: string;
    required: boolean;
    emphasize: boolean;
    showInDiscoveryDocument: boolean;
    userClaims?: any;
    properties?: any;
    created: string;
    updated?: any;
    nonEditable: boolean;
    originalName: string;
}
