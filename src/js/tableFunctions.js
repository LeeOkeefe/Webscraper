let createSortedTable = function(field, reversed) {
    let scraper = new worldometerScraper();

    getCountryStatistics(scraper.url).then(function(data) {
        let sortedValues = sort(data, field, reversed);
        createTable(sortedValues);
    });
}

let sort = function(data, field, reverse = false) {

    let sorted;

    if (field === 'Country') {
        sorted = sortCountries(data);
    } else {
        sorted = sortOther(data, field);
    }

    return reverse ? sorted.reverse() : sorted;
}

let sortCountries = function(data) {
    return data.sort((a, b) => a.Country.trim().localeCompare(b.Country.trim()));
}

let sortOther = function(data, field) {
    return data.sort((a, b) => processElement(a, field) < processElement(b, field) ? 1 : -1);
}

let processElement = function(e, field) {
    return parseInt(e[field].replaceAll(',', '')
                               .replaceAll('N/A', '')
                               .trim() || 0);
}