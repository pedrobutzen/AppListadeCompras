angular.module('ListaCompras')

.controller('ItensListaCtrl', function($scope, $stateParams, DataApi) {

	var idLista = Number($stateParams.id);

	DataApi.getLista(idLista).then(function(data){
		$scope.lista = data;
		
	});

	DataApi.getItens(idLista).then(function(data){
		$scope.itens = data;
	});

	$scope.comprarItem = function(item){
		DataApi.comprarItem(item.id);
		item.comprado = !item.comprado;
	}
});