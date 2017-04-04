var app = angular.module('myApp', ["ngRoute"]);
app.directive('onEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.onEnter, {'event': event});
                });
                event.preventDefault();
            }
        });
    };
});

app.config(function($routeProvider, $locationProvider)
{
    
   $routeProvider
        .when("/productdetails/:pid",{
            templateUrl:"templates/productdetails.html",
            controller:"ProductController"
        })
        .when("/",{
            templateUrl:"templates/home.html", // path ta de? thik moto dekh? konta route konta template?
            controller:"HomeController"
      
        })
        .when("/cart",{
            templateUrl:"templates/cart.html",
            controller:"CartController"
      
        })
        .when("/signup",{
            templateUrl:"/signup.html",
            controller:"SignupController"
        })
        .when("/login",{
            templateUrl:"/login.html",
            controller:"TemplateController"
      
        })
        .when("/show/:item",{
            templateUrl:"templates/home.html",
            controller:"SareeController"
      
        })
        .when("/admin_signup",{
            templateUrl:"/admin_signup.html",
            controller:"AdminSignupController"
        })
        .when("/admin_login",{
            templateUrl:"/admin_login.html",
            controller:"AdminLoginController"
      
        })
        .when("/add_product",{
            templateUrl:"templates/addproduct.html",
            controller:"AddproductController"
      
        })
        .when("/upload",{
            templateUrl:"/upload_pic.html",
            controller:"UploadpicController"
        });

});




app.controller("HomeController",function ($scope,$http){
    console.log('unstable molecule');

});

app.controller("ProductController",function($scope,$http,$routeParams){
        
    var proid=$routeParams.pid;
    $http.get('/productdetails?pid='+proid).then(function (response) {
     console.log('response.data');
    console.log(response.data);
    $scope.product_details= response.data;
     console.log($scope.product_details);

  }, function (error) {

        console.log(error);
  });

    console.log(proid);
});

app.controller("SignupController",function ($scope, $http)
{
    
    $scope.signup = function(){
        var data = {
             user_name: $scope.user_name,
             pass: $scope.pass,
             address: $scope.address,
             contact_no: $scope.contact_no           
        };

        $http.post('/signup',data).then(function (response){ 
            console.log(response);
            window.location='/#!/login'; 

        },function (error){
            
            console.log(error);
        });

    };
});
app.controller("TemplateController",function ($scope,$rootScope,$http)
{
    $scope.my_name=""; 
     $scope.my_pass=""; 
     $scope.login=function(){
        var data = {
             user_name: $scope.my_name,
             pass: $scope.my_pass           
        };
        $http.post('/auth/login',data).then(function (response) {

                console.log(response.data);

                if(response.data.length>0) 
                {
                    localStorage.setItem('key1',response.data[0].user_name);
                    localStorage.setItem('key2',response.data[0].user_id);
                    window.location = '/';
                    
                }
                
         }, function (error) {

                 console.log(error);
         });
     };
     
 });




















app.controller('SareeController', function($scope,$http, $routeParams){ 

    $http.get('/show/' + $routeParams.item).then(function (response) {
        console.log(response.data);
        $scope.productList= response.data;

    }, function (error) {

        console.log(error);
    });
    
    $scope.add_to_bag = function(product){
        console.log(product);
        var bag = {
            user_id:localStorage.getItem('key2'),
             product_id:product.product_id
        };
             
        console.log('bag');
        $http.post('/add_to_bag',bag).then(function (response){ 
            console.log(response);
        },function (error){
            
            console.log(error);
        });
    };
    $scope.view_product = function(product){
        console.log(product);
        window.location ='/#!/productdetails/'+product.product_id; // kemon kore kortish? erom es refresh kor
    };


    
});

app.controller("CartController",function ($scope,$http){
    $http.get('/cart?user_id='+localStorage.getItem('key2')).then(function (response) {
     console.log('response.data');
    console.log(response.data);
    $scope.lists= response.data;
  }, function (error) {

        console.log(error);
  });
    console.log('uuklk');
    $scope.remove_from_bag = function(list){
   
        var bag = {
             user_id:localStorage.getItem('key2'),
             product_id:list.product_id

             
        };
             
           console.log('remove_bag');
        $http.post('remove_from_bag',bag).then(function (response){ 
            console.log(response);
           

        },function (error){
            
            console.log(error);
        });

    };


});
app.controller("AdminSignupController",function ($scope, $http)
{
    
    $scope.signup = function(){
        var data = {
             username: $scope.username,
             pass: $scope.pass            
        };

        $http.post('/admin_signup',data).then(function (response){ 
            console.log(response);
            window.location='/'; 

        },function (error){
            
            console.log(error);

        });

    };
});
app.controller("AddproductController",function ($scope, $http)
{
    
    $scope.add_product = function(){
        var data = {
             product_type: $scope.product_type,
             product_subtype: $scope.product_subtype,
             product_description: $scope.product_description,
             product_price: $scope.product_price,
             date_of_manufacture: $scope.date_of_manufacture,
             img:$scope.img

        };

        $http.post('/add_product',data).then(function (response){ 
            console.log(response);
            

        },function (error){
            
            console.log(error);

        });

    };
});
app.controller("UploadpicController",function ($scope, $http)
{
    
    
        
});


app.controller("AdminLoginController",function ($scope,$rootScope,$http)
{
    $scope.my_name=""; 
     $scope.my_pass=""; 
     $scope.login=function(){
        var data = {
             username: $scope.my_name,
             pass: $scope.my_pass           
        };
        $http.post('/auth/admin_login',data).then(function (response) {

                console.log(response.data);

                if(response.data.length>0) 
                {
                    localStorage.setItem('key1',response.data[0].username);
                    localStorage.setItem('key2',response.data[0].id);
                    window.location = '/#!/add_product';
                    
                }
                
         }, function (error) {

                 console.log(error);
         });
     };
     
 });
