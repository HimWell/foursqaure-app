angular.module('FoursquareApp').factory('FoursquarePhotosService', function($http) {
    var service = {
        async: function(venueId) {

            var baseUrl = 'https://api.foursquare.com/v2/venues/' + venueId + '/photos?'
            var clientId = 'client_id=B55KYNY4FGNGHGW4QVRGXVDY02BLHBNXSUSHVG2542D410E1';
            var cs = 'client_secret=L4HFGBEDB0TLHS24TC1A3VIZIC2N3YUVLZXTJOLDJOKJPGFY';
            var version = 'v=20151020';
            var limit = 'limit=5';
            var and = '&';

            var url = baseUrl + clientId + and + cs + and + version + and + limit;

            var promise = $http.get(url).then(function(response) {

                var photos = response.data.response.photos.items;

                if (photos.length > 0) {
                    return photos;
                }
                return null;
            });
            return promise;
        }
    };
    return service;
});