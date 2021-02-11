angular.module('FoursquareApp').factory('FoursquareSearchService', function($http) {
    var service = {
        async: function(query, near) {

            var baseUrl = 'https://api.foursquare.com/v2/venues/explore?';
            var clientId = 'client_id=B55KYNY4FGNGHGW4QVRGXVDY02BLHBNXSUSHVG2542D410E1';
            var cs = 'client_secret=L4HFGBEDB0TLHS24TC1A3VIZIC2N3YUVLZXTJOLDJOKJPGFY';
            var version = 'v=20151020';
            var venuePhotos = 'venuePhotos=1';
            var nearPlace = 'near=' + near.replace(" ", "+");
            var category = 'query=' + query;
            var limit = 'limit=10';
            var and = '&';

            var url = baseUrl + clientId + and + cs + and + version + and + venuePhotos + and + limit + and + nearPlace + and + category;

            var promise = $http.get(url).then(function(response) {

                var groups = response.data.response.groups;

                if (groups.length > 0) {
                    return groups[0].items;
                }
                return null;
            }, function errorCallback(response) {

                return null;
            });
            return promise;
        }
    };
    return service;
});