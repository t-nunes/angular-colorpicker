app.directive('setColor',[function($rootScope){
    return {
        restrict: 'A',
        link: function (scope,element,attributes) {

            var img = document.getElementById('image-colors');

            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

            element.bind('mousedown',function(){

            });

            element.bind('mousemove',function(e){

                var getColor = JSON.parse(attributes.getColor)

                var offset = $(this).offset();

                var left = e.pageX - offset.left;
                var top = e.pageY - offset.top;

                var pixelData = canvas.getContext('2d').getImageData(left, top, 1, 1).data;

                var red = pixelData[0],
                    green = pixelData[1],
                    blue = pixelData[2],
                    alpha = pixelData[3];

                if ( getColor.active ){
                    scope.currentColor.red = red;
                    scope.currentColor.green = green;
                    scope.currentColor.blue = blue;

                    scope.changeRGB();
                }

                return;

                var getColor = JSON.parse(attributes.getColor),
                    x = parseInt(getColor.offsetX),
                    y = parseInt(getColor.offsetY);

                if ( getColor.active ){
                    mouseMouveActive(element, x, y);
                }


            })

            function mouseMouveActive (element,x,y) {

                var pixelData = ctx.getImageData(x, y, 1, 1).data;

                var red = pixelData[0],
                    green = pixelData[1],
                    blue = pixelData[2],
                    alpha = pixelData[3];

                console.log(red);
                console.log(green);
                console.log(blue);
                console.log(alpha);

                return false;
            }

            return false;
        }
    };
}]);