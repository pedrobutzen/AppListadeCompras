angular.module('ListaCompras')

.factory('DataApi', function($q, CacheFactory) {

	self.listasCache = CacheFactory.get("listas");
	self.dispensaCache = CacheFactory.get("dispensa");

	var keys_dispensa = self.dispensaCache.keys(),
		keys_listas = self.listasCache.keys();

	if(keys_dispensa.length == 0){
		self.dispensaCache.put(
			10, 
			{
				"id": 10,
				"nome": "Uva",
				"idLista": 2,
				"comprado": false,
				"estoqueIdeal": 10,
				"estoqueMin": 2,
				"estoque": 1,
				"unidade": "Un"
			}
		);
		self.dispensaCache.put(
			20, 
			{
				"id": 20,
				"nome": "Maçã",
				"idLista": 2,
				"comprado": false,
				"estoqueIdeal": 10,
				"estoqueMin": 3,
				"estoque": 0,
				"unidade": "Un"
			}
		);
		self.dispensaCache.put(
			30, 
			{
				"id": 30,
				"nome": "Arroz",
				"idLista": 1,
				"comprado": false,
				"estoqueIdeal": 2,
				"estoqueMin": 1,
				"estoque": 1,
				"unidade": "Kg"
			}
		);
		self.dispensaCache.put(
			40, 
			{
				"id": 40,
				"nome": "Banana",
				"idLista": 2,
				"comprado": false,
				"estoqueIdeal": 10,
				"estoqueMin": 2,
				"estoque": 2,
				"unidade": "Un"
			}
		);
	}

	if(keys_listas.length == 0){
		self.listasCache.put(
			1, 
			{
				"id": 1,
				"nome": "Mercado"
			}
		);
		self.listasCache.put(
			2, 
			{
				"id": 2,
				"nome": "Frutas e Legumes"
			}
		);
	}

	function getItens(idLista){
		if(typeof idLista === "undefined"){idLista = false;}


		var itens = [],
			keys = self.dispensaCache.keys(),
			deferred = $q.defer();

		if(keys.length > 0){
			for (var i = 0; i < keys.length; i++) {
				var item = self.dispensaCache.get(keys[i]);
				if(item.idLista == idLista || !idLista){
					itens.push(item);
				}
			};
			deferred.resolve(itens);
		}else{
			deferred.reject();
		}
		
		return deferred.promise;
	}

	function getLista(idLista){
		var deferred = $q.defer(),
			lista = self.listasCache.get(idLista);

		if(lista){
			deferred.resolve(lista);
		}else{
			deferred.reject();
		}

		return deferred.promise;
	}

	function getListas(){
		var listas = [],
			keys = self.listasCache.keys(),
			deferred = $q.defer();

		if(keys.length > 0){
			for (var i = 0; i < keys.length; i++) {
				var lista = self.listasCache.get(keys[i]);
				listas.push(lista);
			};
			deferred.resolve(listas);
		}else{
			deferred.reject();
		}
		
		return deferred.promise;
	}

	function addLista(lista){
		var keys = self.listasCache.keys(),
			deferred = $q.defer(),
			max = Number(_.max(keys)) + 1;

		self.listasCache.put(
			max, 
			{
				"id": max,
				"nome": lista
			}
		);

		if(Number(_.max(self.listasCache.keys()))== max){
			deferred.resolve(self.listasCache.get(max));
		}else{
			deferred.reject();
		}

		return deferred.promise;

	}

	function comprarItem(itemKey){
		var key = Number(itemKey);
		var item_cache = self.dispensaCache.get(key);

		item_cache.comprado = !item_cache.comprado;

		self.dispensaCache.put(
			key, 
			item_cache
		);
	}

	return {
		getItens: getItens,
		getListas: getListas,
		getLista: getLista,
		addLista: addLista,
		comprarItem: comprarItem
	};

});