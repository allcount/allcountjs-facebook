module.exports = function () {
    return {
        appId: 'facebook',
        appName: 'Facebook',
        accessTokenUrl: function () {
            return '/oauth/facebook';
        },
        compile: function (objects) {
            var self = this;
            objects.forEach(function (obj) {
                var facebookAppId = obj.propertyValue('facebookAppId');
                if (facebookAppId) {
                    self.facebookAppId = facebookAppId;
                }
                var facebookSecret = obj.propertyValue('facebookSecret');
                if (facebookSecret) {
                    self.facebookSecret = facebookSecret;
                }
            });
        }
    }
};