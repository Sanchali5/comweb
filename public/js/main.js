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
            templateUrl:"templates/showcase.html", // path ta de? thik moto dekh? konta route konta template?
            controller:"ShowcaseController"
      
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
        // .when("/show/kanjeevaram",{
        //     templateUrl:"templates/home.html",
        //     controller:"KanjeevaramController"

        // })
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
        .when("/add_subtype",{
            templateUrl:"templates/add_subtype.html",
            controller:"AddsubtypeController"

        })
        .when("/upload",{
            templateUrl:"/upload_pic.html",
            controller:"UploadpicController"
        });

});

app.factory('comwebService', function($http) {
    return {
        addToCart: function(product) {
            if(localStorage.getItem('user_id')){
                console.log(product);
                var bag = {
                    user_id:localStorage.getItem('user_id'),
                    product_id:product.product_id
                };
                $http.post('/add_to_bag',bag).then(function (response){ 
                    console.log(response);
                    window.location = '/#!/cart';
                },function (error){
                    console.log(error);
                });
            }
            else{
                alert('Login to add to cart');
            }
        },
        // admin_add_product: function(product) {
        //     if(localStorage.getItem('admin_user_id')){
        //         console.log(product);
        //         var bag = {
        //             user_id:localStorage.getItem('user_id'),
        //             product_id:product.product_id
        //         };
        //         $http.post('/add_to_bag',bag).then(function (response){ 
        //             console.log(response);
        //             window.location = '/#!/cart';
        //         },function (error){
        //             console.log(error);
        //         });
        //     }
        //     else{
        //         alert('Login to add to cart');
        //     }
        // },
        isLoggedIn: function() {
          if(localStorage.getItem('user_id')) {
            return true;
          }else{
             return false;
          }
        },
        isAdminLogedIn: function(){
            if(localStorage.getItem('admin_user_id')){
                return true;
            }else{
                return false;
            }
        }
    }
});

app.controller("ShowcaseController",function($scope,$http){

});

app.controller("AddsubtypeController",function($scope,$http){

    $scope.add_subproduct = function(){
        var subproduct = {
            type: $scope.type
        };

        $http.post('/add_subtype',subproduct).then(function (response){ 
            console.log(response);
            window.location='/#!/add_product';
        },function (error){     
            console.log(error);
        });
    };
    
});

app.controller("HomeController",function ($scope,$http){
    console.log('unstable molecule');

});

app.controller("ProductController",function($scope,$http,$routeParams,comwebService){
        
    var proid=$routeParams.pid;
    
    $http.get('/productdetails?pid='+proid).then(function (response) {
    $scope.product_details= response.data;
     console.log($scope.product_details);
    $scope.displayPic= $scope.product_details[0].img;

  }, function (error) {

        console.log(error);
  });

    console.log(proid);
    $scope.checklogin = function(){
        comwebService.addToCart($scope.product_details[0]);
    };

    $scope.getImage = function(path){
       $scope.displayPic=path;
    };
    
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
app.controller("TemplateController",function ($scope,$rootScope,$http, comwebService)
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
                    localStorage.setItem('user_name',response.data[0].user_name);
                    localStorage.setItem('user_id',response.data[0].user_id);
                    window.location = '/';
                    
                }else{
                  alert("Incorrect username or password");
                }
                
         }, function (error) {

                 console.log(error);
         });
     };
     
 });
app.controller('SareeController', function($scope,$http, $routeParams, comwebService){ 

    $http.get('/show/' + $routeParams.item).then(function (response) {
        console.log(response.data);
        $scope.productList= response.data;

    }, function (error) {

        console.log(error);
    });
    
    $scope.add_to_bag = function(product){

        comwebService.addToCart(product);
    };
    $scope.view_product = function(product){
        console.log(product);
        window.location ='/#!/productdetails/'+product.product_id; // kemon kore kortish? erom es refresh kor
    };


    
});
// app.controller('KanjeevaramController', function($scope,$http){ 

//     $http.get('/show/kanjeevaram').then(function (response) {
//         console.log('hey');
//         $scope.productList= response.data;

//     }, function (error) {

//         console.log(error);
//     });
    
    
    
// });

app.controller("CartController",function ($scope,$http,comwebService){

    $scope.isLoggedIn = comwebService.isLoggedIn();

    $http.get('/cart?user_id='+localStorage.getItem('user_id')).then(function (response) {
     console.log('response.data');
    console.log(response.data);
    $scope.lists= response.data;
  }, function (error) {

        console.log(error);
  });
    console.log('uuklk');
    $scope.remove_from_bag = function(list){
   
        var bag = {
             user_id:localStorage.getItem('user_id'),
             product_id:list.product_id

             
        };
             
           console.log('remove_bag');
        $http.post('/remove_from_bag',bag).then(function (response){ 
            console.log(response);
            var index=$scope.lists.indexOf(list);
            $scope.lists.splice(index,1);

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
app.controller("AddproductController",function ($scope, $http,comwebService)
{
    $scope.isALoggedIn = comwebService.isAdminLogedIn();


    console.log($scope.isALoggedIn);
    $http.get('/showtype').then(function (response) {
        $scope.types=response.data;
        $scope.types.forEach(function(type) { 
            $http.get('/showsubtype?type_id='+type._id).then(function (response) {
                type.subtype=response.data;
            }, function (error) {
                console.log(error);
            });        
        });
        console.log($scope.types);

    }, function (error) {
        console.log(error);
    });
    

    if(localStorage.getItem('admin_user_id')){        
        
    }else{
        alert('Admin should login to add to product');
    }


    $scope.selectItem = function(type){
        console.log(type);
    };



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
                    localStorage.setItem('admin_user_name',response.data[0].username);
                    localStorage.setItem('admin_user_id',response.data[0].id);
                    window.location = '/#!/add_product';
                    
                }
                
         }, function (error) {

                 console.log(error);
         });
     };
     
 });

