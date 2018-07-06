(function(){
  var app = angular.module("pokeApp");

  app.service('pokedata', function($http) {
    this.getPoke = function(id) {
      return $http.get("https://pokeapi.co/api/v2/pokemon/" + id)
                .then(function(response){
                  return response.data;
                });
    };
    this.getType = function(types){
      return $http.get(types.type.url)
                .then(function(response){
                  return response.data;
                });
    };
  });

}());
