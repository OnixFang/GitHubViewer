/*global angular*/

(function () {
    'use strict';

    var module = angular.module("githubViewer"),

        github = function ($http) {
            var returnData = function (response) {
                    return response.data;
                },

                getUser = function (username) {
                    return $http.get("https://api.github.com/users/" + username).then(returnData);
                },
                getRepos = function (user) {
                    return $http.get(user.repos_url).then(returnData);
                },

                getRepo = function (username, reponame) {
                    var repo,
                        repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;

                    return $http.get(repoUrl).then(function (response) {
                        repo = response.data;
                        return $http.get(repo.contributors_url);
                    }).then(function (response) {
                        repo.contributors = response.data;
                        return repo;
                    });
                };

            return {
                getUser: getUser,
                getRepos: getRepos,
                getRepo: getRepo
            };
        };

    module.factory("github", github);

}());
