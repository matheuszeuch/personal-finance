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
            //var list = $( "#transactions" );
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
            var list = $( "#transactionsList" );
            list.empty();
            list.append('<ons-list-header>Transactions History</ons-list-header>');
            if (!results){return;}
            var len = results.rows.length, i, item;
            for (i = 0; i < len; i++) {
                item = results.rows.item(i);
                var content = '<ons-list-item tappable modifier="longdivider">';
                content += '<div class="left">'+ item.Description +'</div>';
                //content += '<div class="left">';
                //content += '<img class="list__item__thumbnail" src="http://placekitten.com/g/40/40">';
                //content += '</div>';
                //content += '<div class="center">';
                //content += '<span class="list__item__title">'+ item.Description +'</span>';
                //content += '<span class="list__item__subtitle">R$ '+ item.Amount +'</span>';
                //content += '</div>';
                content += '<div class="right"><span class="list__item__subtitle">R$ '+ item.Amount +'</span></div>';
                content += '</ons-list-item>';
                list.append(content);
            }
        },

    }

};


