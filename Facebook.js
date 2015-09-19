var Q = require('q');
var _ = require('underscore');

module.exports = function (facebookIntegrationProvider, integrationService) {

    return {
        api: function () {
            var fb = require('fb');
            var args = arguments;
            return integrationService.integrationsForAppId('facebook').then(function (integrations) {
                if (!integrations[0]) {
                    throw new Error("There are no facebook integrations");
                }
                fb.setAccessToken(integrations[0].accessToken);
                var deferred = Q.defer();
                var callback = function (res) {
                    if (!res || res.error) {
                        deferred.reject(new Error(!res ? 'FB API call error' : res.error.message));
                    } else {
                        deferred.resolve(res);
                    }
                };
                fb.api.apply(fb.api, _.flatten([args, [callback]], true));
                return deferred.promise;
            });
        }
    }
};