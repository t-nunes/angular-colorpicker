app.controller('colorpickerCrtl', ["$scope", "$colorpicker", function ($scope,$colorpicker) {

    $scope.colors = $colorpicker.defaultColors;
    $scope.currentColor = $colorpicker.defaultCurrentColor;

    $scope.getColor = {
        active: false,
        offsetX: 0,
        offsetY: 0
    };

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

        setPalleteEnabled: function(){
            $scope.getColor.active = true;
        },
        setPalleteDisabled: function(){
            $scope.getColor.active = false;
        },

        setMainColor: function(){

        },

        shadeColor1: function (color, percent) {
            var num = parseInt(color, 16),
                amt = Math.round(2.55 * percent),
                R = (num >> 16) + amt,
                G = (num >> 8 & 0x00FF) + amt,
                B = (num & 0x0000FF) + amt;
            return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
        },

        addCurrentColor: function(){
            $scope.colors.push($scope.currentColor);
        },
        resetCurrentColor:function(){
            $scope.currentColor = {
                title: '',
                color: '#FF0000',
                red: "255",
                green: "0",
                blue: "0"
            }
        }
    };

    /*
     * --- Add Color ---
     * */
    $scope.addColor = function(){
        cp.addCurrentColor();
        cp.resetCurrentColor();
    };

    $scope.changeHex = function(){
        var c = cp.hexToRGB($scope.currentColor.color);

        $scope.currentColor.red = c[0];
        $scope.currentColor.green = c[1];
        $scope.currentColor.blue = c[2];

    };

    $scope.changeRGB = function(){
        var hex = cp.RGBToHex($scope.currentColor.red,$scope.currentColor.green,$scope.currentColor.blue);

        $scope.currentColor.color = "#" + hex;
    };

    // enable scrolling
    $scope.palleteEnable = function ($pallete) {

        // ativa paleta
        cp.setPalleteEnabled();

    };

    // disable scrolling
    $scope.palleteDisable = function ($pallete) {

        // desativa paleta
        cp.setPalleteDisabled();

    };

    $scope.onMovePallete = function ($pallete,$event) {

        if (cp.isPalleteActive()) {
            var x = parseInt($event.offsetX),
                y = parseInt($event.offsetY);

            if ( x >= 0 && y >= 0 ){
                $scope.getColor.offsetX = x + "px";
                $scope.getColor.offsetY = y + "px";
            }
        }

    }


}]);