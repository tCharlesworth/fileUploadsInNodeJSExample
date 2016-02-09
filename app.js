angular.module('app', [])

.controller('mainCtrl', function($scope, imageSvc) {
    $scope.message = 'hi from ctrl';
    
    $('#fileUploadInput').change(function(event) {
        console.log('File: ', event.target.files[0]);
        //Make a file reader
        var fileReader = new FileReader();
        //Tell what to do when it has loaded
        fileReader.onload = function(loaded) {
            //Once loaded, run this code
            console.log(loaded);
            
            var newFile = {
                fileName: event.target.files[0].name,
                fileBody: loaded.target.result
            };
            imageSvc.uploadImage(newFile).then(function(data) {
                console.log('uploaded: ', data);
            }).catch(function(err) {
                console.error('upload err: ',err);
            });
            
        };
        
        fileReader.readAsDataURL(event.target.files[0]);
    });
    
})

.service('imageSvc', function($http) {
    this.uploadImage = function(imageData) {
        return $http({
            method: 'POST',
            url: '/api/uploadImage',
            data: imageData
        });
    }
})