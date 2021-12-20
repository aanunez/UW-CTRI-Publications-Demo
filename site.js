let ctri = {

    data: [
        {
            title: "A long paper title here that just keeps going",
            journal: "Some Fake Fancy Soudning Journal with a long name",
            author: [
                ['first','middle','last'],
                ['first','middle','last'],
                ['first','middle','last'],
                "Baker TM"
            ],
            link_text: 'Full text',
            link: ""
        },
        {
            title: "A long paper title here that just keeps going",
            journal: "Some Fake Fancy Soudning Journal with a long name",
            author: [
                ['first','middle','last'],
                ['first','middle','last'],
                ['first','middle','last'],
                "Baker TM"
            ],
            link_text: 'Full text',
            link: "#"
        }
    ],

    init: () => {
        
        $('#mainDataTable').DataTable({
            columns: [{
                title: "display",
                data: "display",
                className: "dataTablesDisplayCol",
                render: (data, type, row, meta) => {
                    return type === 'filter' ? $(data).text() : data;
                }
            }],
            data: ctri.generateData(),
            createdRow: (row,data,index) => $(row).addClass('dataTablesRow'),
            sDom: 'ftpi',
            language: {
                "zeroRecords": "No matching journal entries",
                "search": ""
            }
        });
        
        $("input.form-control").prop('placeholder','Search journal entries');
        $(".dataTablesRow").append(ctri.generateExpandButton());

        $('.expandButton').on('click', (e) => {
            let $rowEl = $(e.currentTarget).parent();
            let table = $('#mainDataTable').DataTable();
            let row = table.row($rowEl);
            if (row.child.isShown()) {
                row.child.hide();
                $rowEl.removeClass('shown');
            } else {
                let cells = table.cells(row, '.expandedInfo').render('display');
                row.child( ctri.generateHTMLforChild(), 'dataTableChild').show();
                $rowEl.next().addClass($rowEl.hasClass('even') ? 'even' : 'odd');
                $rowEl.addClass('shown');
            }
        });
        
        $(window).on('resize', () => {
            $(".expandButton").css('transform',`translate(-40px,${$(".dataTablesRow").first().height()-33}px)`)
        });
        $(window).resize();
    },
    
    generateData: () => {
        let data = [];
        ctri.data.forEach( (el) => {
            let authors = [];
            el.author.forEach( (el) => {
                authors.push(typeof el == "string" ? el : (el[2]||"")+" "+(el[0][0]||"")+(el[1][0]||""));
            });
            let link = el.link ? `<a href="${el.link}">[${el.link_text}]</a>` : "";
            data.push({
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
            });
        });
        return data;
    },

    generateHTMLforChild: () => {
        return `<div class="container">Placeholder</div>`;
    },
    
    generateExpandButton: () => {
        return '<div class="expandButton">+</div>'
    }
};

$(document).ready(ctri.init);
