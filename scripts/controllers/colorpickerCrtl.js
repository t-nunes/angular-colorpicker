app.controller('colorpickerCrtl', ["$scope", "$colorpicker", function ($scope,$colorpicker) {

    /*
    *   --- Defaults ---
    * */
    $scope.colors = $colorpicker.defaultColors;
    $scope.currentColor = $colorpicker.defaultCurrentColor;

    $scope.getColor = {
        active: false,
        offsetX: 0,
        offsetY: 0
    };

    $scope.slide = {
        currentColor: "#FF0000",
        active: false,
        percentage: '0%'
    };

    // Helpers
    var cp = {

        hexToRGB: function(hex){
            hex = hex.replace(/[^0-9A-F]/gi, '');
            var bigint = parseInt(hex, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;

            return [r, g, b];
        },
        RGBToHex: function (r,g,b) {

            var bin = r << 16 | g << 8 | b;
            return (function (h) {
                return new Array(7 - h.length).join("0") + h
            })(bin.toString(16).toUpperCase())
        },

        isPalleteActive: function(){
            return $scope.getColor.active;
        },


        shadeColor: function(color, percent) {

            var num = parseInt(color,16),
                amt = Math.round(2.55 * percent),
                R = (num >> 16) + amt,
                B = (num >> 8 & 0x00FF) + amt,
                G = (num & 0x0000FF) + amt;

            return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
        },

        setPalleteEnabled: function(){
            $scope.getColor.active = true;
        },
        setPalleteDisabled: function(){
            $scope.getColor.active = false;
        },

        setSlideEnabled: function(){
            $scope.slide.active = true;
        },
        setSlideDisabled: function(){
            $scope.slide.active = false;
        },

        // add cuurent color to swatches
        addCurrentColor: function(){
            $scope.colors.push($scope.currentColor);
        },

        // reset current color
        resetCurrentColor:function(){
            $scope.currentColor = {
                title: '',
                color: '#FF0000',
                red: "255",
                green: "0",
                blue: "0"
            }
        },

        // reset slide position
        resetSlidePosition: function(){
            $scope.slide.percentage = "0%";
        }
    };

    /*
     * --- Add Color ---
     * */
    $scope.addColor = function(){
        cp.addCurrentColor();
        cp.resetCurrentColor();
        cp.resetSlidePosition();
    };

    $scope.changeHex = function(){
        var c = cp.hexToRGB($scope.currentColor.color);

        $scope.currentColor.red = c[0];
        $scope.currentColor.green = c[1];
        $scope.currentColor.blue = c[2];

    };

    $scope.changeRGB = function(){
        var hex = cp.RGBToHex($scope.currentColor.red,$scope.currentColor.green,$scope.currentColor.blue);

        cp.resetSlidePosition();
        $scope.currentColor.color = "#" + hex;
    };

    // enable scrolling
    $scope.palleteEnable = function () {
        cp.setPalleteEnabled();
    };

    // disable scrolling
    $scope.palleteDisable = function () {
        cp.setPalleteDisabled();
    };

    $scope.onMovePallete = function ($event) {

        if (cp.isPalleteActive()) {
            var x = parseInt($event.offsetX),
                y = parseInt($event.offsetY);

            if ( x >= 0 && y >= 0 ){
                $scope.getColor.offsetX = x + "px";
                $scope.getColor.offsetY = y + "px";
            }
        }

    }

    // enable scrolling
    $scope.slideEnable = function () {
        cp.setSlideEnabled();
    };

    // disable scrolling
    $scope.slideDisable = function () {
        cp.setSlideDisabled();
        $scope.currentColor.color = "#" + cp.shadeColor($scope.currentColor.color.split("#")[1], -$scope.slide.percentage);
        cp.resetSlidePosition();
    };

    $scope.onMoveSlide = function($event){
        var height = $event.currentTarget.clientHeight;

        if ( $scope.slide.active ){
            $scope.slide.percentage = parseInt(($event.offsetY * 100) / height);
        }

    };

}]);