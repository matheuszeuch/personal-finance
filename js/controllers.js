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
    debug.log("debugando");
  },

  homePage: function(page) {
  },

};
