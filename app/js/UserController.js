/*global angular*/

(function () {
    'use strict';
    var app = angular.module("githubViewer"),
        UserController = function ($scope, github, $routeParams) {
            
            var onError = function () {
                    $scope.userError = "Failed to retrieve user.";
                },

                onRepos = function (data) {
                    $scope.user.repos = data;
                },

                onUserComplete = function (data) {
                    $scope.user = data;
                    github.getRepos($scope.user).then(onRepos, onError);
                };
            
            $scope.username = $routeParams.username;
            github.getUser($scope.username).then(onUserComplete, onError);
            
        };

    app.controller("UserController", UserController);

}());
