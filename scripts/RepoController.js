/*global angular*/

(function () {
    'use strict';
    var app = angular.module("githubViewer"),
        RepoController = function ($scope, github, $routeParams) {

            var username = $scope.username = $routeParams.username,
                reponame = $routeParams.reponame,
                
                onRepoSuccess = function (data) {
                    $scope.repo = data;
                },

                onError = function () {
                    $scope.error = "Could not get the repository.";
                };

            github.getRepo(username, reponame).then(onRepoSuccess, onError);

        };

    app.controller("RepoController", RepoController);

}());
