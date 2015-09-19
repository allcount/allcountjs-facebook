exports.installModule = function (injection) {
    injection.bindMultiple('integrationProviders', ['facebookIntegrationProvider']);
    injection.bindMultiple('compileServices', ['facebookIntegrationProvider']);
    injection.bindFactory('facebookIntegrationProvider', require('./facebook-integration-provider'));
    injection.bindMultiple('appConfigurators', ['facebookOauthRoute']);
    injection.bindFactory('facebookOauthRoute', require('./oauth-route'));
    injection.bindFactory('Facebook', require('./Facebook'));
};