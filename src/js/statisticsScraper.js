function scrapeStatistics() {
    let url = require('../paths.json').statisticsUrl;

    fetch(url)
        .then(function(response) {
            return response.text();
        })
        .then(function(htmlString) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(htmlString, "text/html");

            let rows = extractDataFromTableRows(doc);
            let countries = toDomain(rows);

            createTable(countries);

    }).catch(function(err) {
        console.log('Failed to fetch page: ', err);
    })
}

let extractDataFromTableRows = function(doc) {
    let table = doc.getElementById("main_table_countries_today");
    let tableRows = table.getElementsByTagName("tr");
    return Array.prototype.slice.call(tableRows, 9, tableRows.length - 8);
}

let toDomain = function(rows) {
    let countries = [];

    for(let i = 0; i < rows.length; i++) {

        let data = rows[i].innerText.split("\n");

        let country = {
            Rank: data[1],
            Country: data[2],
            Cases: data[3],
            Deaths: data[5],
            Recovered: data[7],
            Population: data[15]
        }
        countries.push(country);
    }
    return countries;
}