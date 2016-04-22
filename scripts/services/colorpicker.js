app.service('$colorpicker', function(){

    this.defaultColors = [
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

    this.defaultCurrentColor = {
        name: '',
        color: "#FF0000",
        red: "255",
        green: "0",
        blue: "0"
    };

    this.isPalleteActive = function($scope){
        return $scope.getColor.active;
    }

    resetCurrentColor = function($scope){
        $scope.currentColor = defaultCurrentColor;
    }

    this.addColor = function($scope){
        $scope.colors.push($scope.currentColor);
        resetCurrentColor($scope);
    }
});