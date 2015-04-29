angular.module('ListaCompras', ['ionic', 'angular-cache', 'ngCordova'])

.run(function($ionicPlatform, CacheFactory) {
  CacheFactory("dispensa", { storageMode: "localStorage" });
  CacheFactory("listas", { storageMode: "localStorage" });

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

  .state('home', {
    abstract: true,
    url: "/home",
    templateUrl: "app/home/home.html"
  })
  .state('home.listas-compras', {
    url: "/listas-compras",
    views: {
      'tab-listas-compras': {
        templateUrl: "app/listas-compras/listas-compras.html"
      }
    }
  })
  .state('home.itens-lista', {
    url: "/itens-lista/:id",
    views: {
      'tab-listas-compras': {
        templateUrl: "app/itens-lista/itens-lista.html"
      }
    }
  })
  .state('home.dispensa', {
    url: "/dispensa",
    views: {
      'tab-dispensa': {
        templateUrl: "app/dispensa/dispensa.html"
      }
    }
  });

  $urlRouterProvider.otherwise('/home/listas-compras');
});
