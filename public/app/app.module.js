angular.module('app', [])
    .controller('RegisterController', function($scope, $http){
        $scope.users = [];

        $scope.register = function() {
            /*$scope.users.push($scope.user);
            $scope.user = {};*/

            $http({
                method: 'POST',
                url: '/api/user/register',
                data: $scope.user
            }).then(function(response) {
                $scope.user = {}
            });
        }

        $scope.refresh = function() {
            $http.get('/api/user/register').then(function(response) {
                $scope.users = response.data;
            });
        }

    })
