import {AllowedGrantTypes} from './allowed-grant-type';

export class Client {

    constructor() {
        this.allowedGrantTypes = new Array<AllowedGrantTypes>();
        this.requireConsent = true;
        this.requireClientSecret = true;
    }

    id: number;
    enabled: boolean;
    clientId: string;
    requireClientSecret: boolean;
    clientName?: any;
    description?: any;
    requireConsent: boolean;
    requirePkce: boolean;
    allowOfflineAccess: boolean;
    identityTokenLifetime: number;
    accessTokenLifetime: number;
    created: string;
    updated?: any;
    lastAccessed?: any;
    allowedGrantTypes: AllowedGrantTypes[];
    displaySecret: boolean;
    displayRedirectUrl: boolean;
    displayLogoutUrl: boolean;
    displayCors: boolean;
    allowAccessTokensViaBrowser: boolean;
    // userSsoLifetime?: any;
    // userCodeType?: any;
    // deviceCodeLifetime: number;
    // nonEditable: boolean;
    // protocolType: string;
    // clientSecrets?: any;
    // clientUri?: any;
    // logoUri?: any;
    // allowRememberConsent: boolean;
    // alwaysIncludeUserClaimsInIdToken: boolean;
    // allowPlainTextPkce: boolean;
    // redirectUris?: any;
    // postLogoutRedirectUris?: any;
    // frontChannelLogoutUri?: any;
    // frontChannelLogoutSessionRequired: boolean;
    // backChannelLogoutUri?: any;
    // backChannelLogoutSessionRequired: boolean;
    // allowedScopes?: any;
    // authorizationCodeLifetime: number;
    // consentLifetime?: any;
    // absoluteRefreshTokenLifetime: number;
    // slidingRefreshTokenLifetime: number;
    // refreshTokenUsage: number;
    // updateAccessTokenClaimsOnRefresh: boolean;
    // refreshTokenExpiration: number;
    // accessTokenType: number;
    // enableLocalLogin: boolean;
    // identityProviderRestrictions?: any;
    // includeJwtId: boolean;
    // claims?: any;
    // alwaysSendClientClaims: boolean;
    // clientClaimsPrefix: string;
    // pairWiseSubjectSalt?: any;
    // allowedCorsOrigins?: any;
    // properties?: any;
}
