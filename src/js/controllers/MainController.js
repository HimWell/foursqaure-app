(function() {
    angular.module('FoursquareApp', ['result-directives']);

    angular.module('FoursquareApp').controller('MainController', function($scope, FoursquareSearchService) {
        var mainScope = this;
        mainScope.items = [];
        mainScope.category = '';
        mainScope.place = 'South Africa';
        $scope.showPhotos = false;

        this.doExplore = function() {

            $scope.showPhotos = false;
            mainScope.selectedIndex = -1;
            FoursquareSearchService.async(this.category, this.place).then(function(items) {
                mainScope.items = items;
            });
        };

        this.doExplore();

        this.showPhotoPreview = function(venue) {
            return venue.photos.groups.length > 0;
        };

        this.buildPhotoUrl = function(venue) {
            var url = '';
            if (venue.photos != null &&
                venue.photos.groups.length > 0 &&
                venue.photos.groups[0].items.length > 0) {
                var item = venue.photos.groups[0].items[0];
                url = item.prefix + '500x500' + item.suffix;
            }
            return url;
        };

        this.getCategory = function(venue) {
            var category = '';
            if (venue.categories.length > 0)
                category = venue.categories[0].name;
            return category;
        };

        this.setSelectedItem = function(item, index) {
            this.selectedIndex = index;
            var itemId = item.venue.id;
            if (itemId != null) {
                $scope.$emit('selectedItemChanged', itemId);
            }
        };

    });
})();