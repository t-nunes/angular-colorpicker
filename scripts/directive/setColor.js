app.directive('setColor',[function($timeout){
    return {
        restrict: 'A',
        link: function (scope,element,attributes) {

            element.bind('mousemove',function(e){

                var img = document.getElementById('image-colors');

                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

                var getColor = JSON.parse(attributes.getColor)

                var left = parseInt(getColor.offsetX);
                var top = parseInt(getColor.offsetY);

                var pixelData = canvas.getContext('2d').getImageData(left, top, 1, 1).data;

                var red = pixelData[0],
                    green = pixelData[1],
                    blue = pixelData[2],
                    alpha = pixelData[3];

                // getColor circle is active
                if ( getColor.active ){
                    scope.currentColor.red = red;
                    scope.currentColor.green = green;
                    scope.currentColor.blue = blue;

                    scope.changeRGB();
                }

                return;


            });

            return false;
        }
    };
}]);