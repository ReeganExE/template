(function() {
    angular.module('questions').directive('selectButton', ['$rootScope', function($rootScope){
        return {
            controllerAs: 'vm',
            controller: function($scope, $element, $attrs, $transclude) {
                this.accept = function() {
                    $rootScope.$broadcast('select-text');
                };
            },
            template: '<button title="Accept this selection" id="select-button" class="select-button" ng-click="vm.accept()">Select</button>',
            replace: true,
            link: angular.noop
        };
    }]);
})();