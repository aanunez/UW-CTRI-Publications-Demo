let ctri = {

    disabledTextColor: '#6c757d',
    order: 'asc',
	defaultLinkText: "Full Text",
    
    //data: [  ], Loaded in pubList.js
    
    dataCols: [
        {
            title: "display",
            data: "display",
            className: "dataTablesDisplayCol",
            render: (data, type, row, meta) => {
                return type === 'filter' ? $(data).text() : data;
            },
            visible: true
        },
        {
            title: "Article Title",
            data: "title",
            visible: false
        },
        {
            title: "Journal",
            data: "journal",
            visible: false
        },
        {
            title: "Topic",
            data: "topic",
            visible: false
        },
        {
            title: "Primary Author",
            data: "author",
            render: (data, type, row, meta) => {
                return typeof data[0] == "string" ? data[0] : data[0][2];
            },
            visible: false
        },
        {
            title: "Year",
            data: "date",
            render: (data, type, row, meta) => {
                return data.split('-')[0];
            },
            visible: false
        }
    ],

    init: () => {
        
        // Setup Talbe
        $('#mainDataTable').DataTable({
            columns: ctri.dataCols,
            data: ctri.generateData(),
            createdRow: (row,data,index) => $(row).addClass('dataTablesRow'),
            sDom: 'ftpi',
            language: {
                "zeroRecords": "No matching journal entries",
                "search": ""
            }
        });
        
        // Set place holder on search 
        $("input.form-control").prop('placeholder','Search journal entries');
        
        // Setup expand buttons
        $(".dataTablesRow").append(ctri.generateExpandButton());
        $('#mainDataTable tbody').on('click', '.expandButton', (e) => {
            let $tr = $(e.currentTarget).parent();
            let table = $('#mainDataTable').DataTable();
            let row = table.row($tr);
            if (row.child.isShown()) {
                $('div.slider', row.child()).slideUp( () => {
                    row.child.hide();
                    $tr.removeClass('shown');
                });
            } else {
                row.child( ctri.generateHTMLforChild(), 'dataTableChild').show();
                $tr.addClass('shown');
                $('div.slider', row.child()).slideDown();
            }
        });
		$('#mainDataTable tbody').on('click', '.pagination .page-link', (e) => {
            $(".dataTablesRow").append(ctri.generateExpandButton());
        });
		
        
        // On resize we need to be sure the expand buttons don't drift
        $(window).on('resize', () => {
            $(".dataTablesRow").each( function() {
                $(this).find(".expandButton").css('transform',`translate(-40px,${$(this).height()-33}px)`)
            });
        }).resize();
        
        // Insert sort drop down
        $("#mainDataTable_filter").after(ctri.generateSortDropDown);
        $(".dataTablesCustom_sort").on('change', ctri.sort).change();
        $(".dataTablesCustom_order").on('click', ctri.orderToggle);
    },
    
    sort: (e) => {
        let selection = $(".dataTablesCustom_sort").val();
        $(".dataTablesCustom_sort").css('color', selection ? 'black' : ctri.disabledTextColor );
        let index = ctri.dataCols.map(x => x.data).indexOf( $(e.currentTarget).val() );
        let table = $('#mainDataTable').DataTable();
        table.order( [ index > -1 ? index : 0, 'asc' ] ).draw();
    },
    
    orderToggle: () => {
        ctri.order = ctri.order == "asc" ? "desc" : "asc";
        let table = $('#mainDataTable').DataTable();
        table.order( [ table.order()[0][0], ctri.order ] ).draw();
        $(".dataTablesCustom_order i").removeClass('fa-sort-amount-down fa-sort-amount-up')
        $(".dataTablesCustom_order i").addClass('fa-sort-amount-' + (ctri.order == "asc" ? 'down' : 'up'))
    },
    
    generateData: () => {
        let data = [];
        ctri.data.forEach( (el) => {
            let authors = [];
            el.author.forEach( (el) => {
                authors.push(typeof el == "string" ? el : (el[2]||"")+" "+(el[0][0]||"")+(el[1][0]||""));
            });
            let link = el.link ? `<a href="${el.link}">[${el.link_text||ctri.defaultLinkText}]</a>` : "";
            data.push($.extend({
                'display': `
                    <div class="container">
                      <div class="row">
                        <div class="col-9">
                          <div class="container">
                            <div class="row row-title">
                              <div class="col-12">
                                  ${el.title}
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                  ${el.journal}
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                  ${authors.join(', ')}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-3 text-end mt-1">
                            ${link}
                        </div>
                      </div>
                    </div>
                `
            }, el));
        });
        return data;
    },

    generateHTMLforChild: () => {
        return `<div class="container slider">
        Cofresí RU, Hajcak G, Piasecki TM, Bartholow BD. Internal Consistency and Test-Retest Reliability of the P3 Event-Related Potential (ERP) Elicited by Alcoholic and Non-Alcoholic Beverage Pictures. Psychophysiology. Online November 15, 2021.
        Cofresí RU, Hajcak G, Piasecki TM, Bartholow BD. Internal Consistency and Test-Retest Reliability of the P3 Event-Related Potential (ERP) Elicited by Alcoholic and Non-Alcoholic Beverage Pictures. Psychophysiology. Online November 15, 2021.
        Cofresí RU, Hajcak G, Piasecki TM, Bartholow BD. Internal Consistency and Test-Retest Reliability of the P3 Event-Related Potential (ERP) Elicited by Alcoholic and Non-Alcoholic Beverage Pictures. Psychophysiology. Online November 15, 2021.
        </div>`;
    },
    
    generateExpandButton: () => {
        return '<div class="expandButton">+</div>'
    },
    
    generateSortDropDown: () => {
        let html = "<option value=''>Sort by...</option>";
        ctri.dataCols.forEach( (el) => {
            if ( !el.visible ) {
                html = `${html}<option value="${el.data}">${el.title}</option>`;
            }
        });
        return `
            <a class="dataTablesCustom_order">
                <i class="fas fa-sort-amount-down fa-fw"></i>
            </a>
            <select class="dataTablesCustom_sort">${html}</select>`;
    }
};

$(document).ready(ctri.init);