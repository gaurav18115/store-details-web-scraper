const axios = require("axios")

let indiamart_baseurl = "https://dir.indiamart.com/search-ajax.mp"; // ss=aquarium+delhi&cq=delhi

async function getIndiaMartResults(searchString, city) {
    if (!searchString) {
        return [];
    }
    let url = indiamart_baseurl + "?ss=" + searchString.split(" ").join("+");
    
    if (city) {
        url = url + "&cq=" + city.split(" ").join("+");
    }

    console.log("IndiaMart URL", url);

    var results = await axios
                    .get(url)
                    .then(resp => {
                        return resp.data.results;
                    })
                    .catch(error => {
                        console.error(error);
                        return null;
                    })
    // console.log(results[0]);

    let company_details = [];
    // let cities = [];
    results.forEach(element => {
        let company = element.proddata && element.proddata.company;
        company_details.push({
            name: company.comp,
            address: company.address,
            city: company.city,
            phone: company.phone
        });
        // cities.push(company.city);
    });

    console.log(`Fetch ${company_details.length} results`);
    // console.log(cities);

    return company_details;
}

module.exports = getIndiaMartResults;