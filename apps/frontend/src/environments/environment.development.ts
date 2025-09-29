export const environment = {
  auth: {
    google: {
      issuer: 'https://accounts.google.com',
      redirectUri: window.location.origin,
      clientId:
        '139840034785-iuud31sup6246d4isd54q3n97oqtjl4k.apps.googleusercontent.com',
      scope: 'openid profile email',
      strictDiscoveryDocumentValidation: false,
    },
  },
};
