var app = angular.module('myApp',[]);



app.controller('colorpickerCrtl',function($scope){
    $scope.colors = [
        {
            name: "BKG",
            color: "#FAFAFA"
        },
        {
            name: "Text",
            color: "#102A3B"
        },
        {
            name: "Accent",
            color: "#EF352B"
        },
        {
            name: "Secondary",
            color: "#33ACE0"
        },
        {
            name: "Tertiary",
            color: "#4AB659"
        }
    ];

    $scope.currentColor = "#FF0000";

    $scope.currentRed = "255";
    $scope.currentGreen = "0";
    $scope.currentBlue = "0";


});