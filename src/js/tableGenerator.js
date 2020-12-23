let createTable = function(data) {
    let tableArea = document.getElementById('tableArea'),
        table = document.createElement('table');

    createTableHeaders(table);
    createTableData(table, data);

    tableArea.appendChild(table);
}

let createTableHeaders = function(table) {
    let headers = [ "Country", "Deaths", "Cases", "Recovered", "Population" ]
    let thead = document.createElement('thead');
    table.appendChild(thead);

    for (let i = 0; i < headers.length; i++) {
        thead.appendChild(document.createElement('th'))
            .appendChild(document.createTextNode(headers[i]));
    }
}

let createTableData = function(table, data) {
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');

        addSingleTableDataElement(tr, 0, data[i].Country)
        addSingleTableDataElement(tr, 1, data[i].Deaths)
        addSingleTableDataElement(tr, 2, data[i].Cases)
        addSingleTableDataElement(tr, 3, data[i].Recovered)
        addSingleTableDataElement(tr, 4, data[i].Population)

        table.appendChild(tr);
    }
}

let addSingleTableDataElement = function(tr, index, data) {
    tr.appendChild(document.createElement('td'));
    tr.cells[index].appendChild(document.createTextNode(data));
}