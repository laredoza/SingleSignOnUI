export const environment = {
  production: true,
  adminApi: 'http://10.133.7.99:5001',
  OidcClient: {
    authority: 'http://10.133.7.99:5000/',
    client_id: 'single_sign_on_server',
    redirect_uri: 'http://10.133.7.99:4200/auth-callback',
    post_logout_redirect_uri: 'http://10.133.7.99:4200/',
    response_type: 'id_token token',
    scope: 'openid profile identity_admin admin-api',
    filterProtocolClaims: true,
    loadUserInfo: true
  },
  urlRegEx: "^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$"
};
