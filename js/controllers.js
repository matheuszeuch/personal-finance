/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

  navigatorPage: function(page) {
  },

  newTransactionPage: function(page) {
  },

  transactionsPage: function(page) {
    myApp.services.transactions.refresh();
      var pullHook = document.getElementById('pull-hook');
      pullHook.addEventListener('changestate', function(event) {
      var message = '';
      switch (event.state) {
        case 'initial':
          message = '<span ng-switch-when="initial"><ons-icon size="35px" icon="ion-arrow-down-a"></ons-icon> Pull down to refresh</span>';
          break;
        case 'preaction':
          message = '<span ng-switch-when="preaction"><ons-icon size="35px" icon="ion-arrow-up-a"></ons-icon> Release to refresh</span>';
          break;
        case 'action':
          message = '<span ng-switch-when="action"><ons-icon size="35px" spin="true" icon="ion-load-d"></ons-icon> Refreshing...</span>';
          break;
        }
        pullHook.innerHTML = message;
      });
      pullHook.onAction = function(done) {
        setTimeout(done, 1000);
      };
  },

  homePage: function(page) {
  },

};
