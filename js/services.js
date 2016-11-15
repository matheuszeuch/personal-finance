/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/

myApp.services = {

    transactions: {
        save: function() {
            //debug("saving transaction");
            var amount = $("#amount").val();
            var description = $("#description").val();
            db.transaction(
                function( transaction ){
                    transaction.executeSql(
                        ("INSERT INTO Event (Amount, Description) VALUES (?, ?)"),
                        [amount, description]
                    );
                    myApp.services.transactions.refresh();
                    myNavigator.popPage();
                }
            );
        },

        refresh: function()  {
            //debug("refreshing transactions");
            var list = $( "#transactions" );
            this.load(this.refreshList);
        },

        load: function(callback) {
            //debug("loading transactions");
            db.transaction(
                function( transaction ){
                    transaction.executeSql(
                        ("SELECT * FROM Event ORDER BY Description ASC"),
                        [],
                        function( transaction, results ){
                            callback( results );
                        }
                    );

                }
            );
        },

        refreshList: function(results) {
            //debug("refreshing transactions list");
            var list = $( "#transactionsList" );
            debug(list);
            list.empty();
            if (!results){debug("!results");return;}
            debug("result.rows: "+ results.rows.length);
            $.each(
                results.rows,
                function( rowIndex ){
                    debug("rowIndex: "+ rowIndex);
                    var row = results.rows.item( rowIndex );
                    list.append( "<li>" + row.Description + "</li>" );
                }
            );
        },

    }

};


