module.exports = function (appAccessRouter, integrationService, facebookIntegrationProvider, baseUrlService, Q) {
    var route = {};

    var OAuth= require('oauth').OAuth2;
    var oAuth = new OAuth(facebookIntegrationProvider.facebookAppId, facebookIntegrationProvider.facebookSecret, 'https://www.facebook.com/dialog', '/oauth');

    oAuth._getAccessTokenUrl = function () {
        return 'https://graph.facebook.com/v2.3/oauth/access_token';
    };

    route.configure = function () {
        var params = function (req) {
            return {
                redirect_uri: baseUrlService.getBaseUrl() + '/oauth/facebook/callback?integrationId=' + req.query.integrationId,
                scope: facebookIntegrationProvider.facebookPermissions && facebookIntegrationProvider.facebookPermissions.join(',') || undefined
            };
        };

        appAccessRouter.get('/oauth/facebook', function(req, res) {
            res.redirect(oAuth.getAuthorizeUrl(params(req)));
        });

        appAccessRouter.get('/oauth/facebook/callback', function(req, res, next) {
            var getAccessToken = Q.nfbind(oAuth.getOAuthAccessToken.bind(oAuth));

            getAccessToken(req.query.code, params(req)).then(function(results) {
                var access_token = results[0];
                var refresh_token = results[1];
                return integrationService.updateIntegrationAccessToken(req.query.integrationId, access_token).then(function () {
                    return res.redirect('/entity/Integration');
                });
            }).catch(next);
        });
    };

    return route;
};