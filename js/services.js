/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/

myApp.services = {

    transactions: {
        save: function() {
            var amount = $("#amount").val();
            var description = $("#amount").val();
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
            var list = $( "#transactions" );
            this.load(this.refreshList);
        },

        load: function(callback) {
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
            var list = $( "#transactionsList" );
            list.empty();
            if (!results){return;}
            $.each(
                results.rows,
                function( rowIndex ){
                    var row = results.rows.item( rowIndex );
                    list.append( "<li>" + row.Description + "</li>" );
                }
            );
        },

    }

};


