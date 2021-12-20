let ctri = {

    data: [
        {
            journal: "foo",
            author: "adam"
        }
    ],

    init: () => {
        
        $('#mainDataTable').DataTable({
            columns: [{
                title: "display",
                data: "display",
                className: "dataTablesDisplayCol",
                render: (data, type, row, meta) => {
                    if ( type === 'display' ) {
                        return data;
                    }
                    if ( type === 'filter' ) {
                        return data;
                    }
                    return data;
                }
            }],
            data: ctri.generateData(),
            createdRow: (row,data,index) => $(row).addClass('dataTablesRow'),
            sDom: 'ftpi'
        });

        $('#mainDataTable').on('click', '.dataTablesRow', (e) => {
            let $rowEl = $(e.currentTarget);
            let table = $('#mainDataTable').DataTable();
            let row = table.row(e.currentTarget);
            if (row.child.isShown()) {
                row.child.hide();
                $rowEl.removeClass('shown');
            } else {
                let cells = table.cells(row, '.expandedInfo').render('display');
                row.child( generateHTMLforChild(), 'dataTableChild').show();
                $rowEl.next().addClass($rowEl.hasClass('even') ? 'even' : 'odd');
                $rowEl.addClass('shown');
            }
        });
        
    },
    
    generateData: () => {
        let data = [];
        ctri.data.forEach( (el) => {
            data.push({
                'display': `
                    <div class="container">
                      <div class="row ">
                        <div class="col-12">
                            ${el.journal}
                        </div>
                      </div>
                    </div>
                `
            });
        });
        return data;
    },

    generateHTMLforChild: () => {
        
    }
};

$(document).ready(ctri.init);
