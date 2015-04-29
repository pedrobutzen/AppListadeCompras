angular.module('ListaCompras')

.controller('ListasComprasCtrl', function($scope, $cordovaDialogs, DataApi) {
  DataApi.getListas().then(function(data){
    $scope.listas = data;
  });

  $scope.addLista = function(){
  	$cordovaDialogs.prompt(
			'Digite o nome', 
			"Nova Lista de Compras", 
			["Cadastrar", "Cancelar"]
		).then(function(result){
			if(result.buttonIndex == 1){
				DataApi.addLista(result.input1).then(
					function(data){
						$scope.listas.push(data);
					}
				);
			}
		});
	}

});