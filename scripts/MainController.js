/*global angular*/

(function () {
    'use strict';
    var app = angular.module("githubViewer"),

        MainController = function ($scope, $interval, $location) {

            var countDownInterval,

                search = function () {
                    if (countDownInterval) {
                        $interval.cancel(countDownInterval);
                        $scope.countDown = null;
                    }
                    $location.path("/user/" + $scope.username);
                },

                decrementCountDown = function () {
                    $scope.countDown -= 1;
                    if ($scope.countDown < 1) {
                        search();
                    }
                },

                startCountDown = function () {
                    countDownInterval = $interval(decrementCountDown, 1000, $scope.countDown);
                };

            $scope.username = "angular";
            $scope.countDown = 5;
            $scope.search = search;
            startCountDown();
        };

    app.controller("MainController", MainController);

}());
