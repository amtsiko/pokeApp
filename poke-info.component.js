var app = angular.module("pokeApp");

app.component("pokeInfo", {
  templateUrl: "poke-info.html",
  controller: "pokeInfoCtrl"
});

app.controller("pokeInfoCtrl", ["$scope", "pokedata", function($scope, pokedata) {
  $scope.damageFrom = [];
  $scope.damageTo = [];

  var onPokeComplete = function(data) {
    $scope.pokemon = data;

    for (i = 0; i < $scope.pokemon.types.length; i++) {
      pokedata.getType($scope.pokemon.types[i])
        .then(onType, onError);
    }
  };

  var onType = function(data) {
    $scope.damageFrom = $scope.damageFrom.concat(data.damage_relations.double_damage_from);
    $scope.damageTo = $scope.damageTo.concat(data.damage_relations.double_damage_to);
  }

  var onError = function(response) {
    $scope.error = "Could not get pokemon data";
  };

  var reset = function() {
    $scope.damageFrom = [];
    $scope.damageTo = [];
    $scope.pokemon = [];
    $scope.error = "";
  }

  $scope.searchPoke = function(id) {
    reset();
    pokedata.getPoke(id)
      .then(onPokeComplete, onError);
  };

  $scope.randomPoke = function() {
    reset();
    var random = Math.floor((Math.random() * 807) + 1);
    pokedata.getPoke(random)
      .then(onPokeComplete, onError);
  };

}]);