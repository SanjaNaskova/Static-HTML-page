
// const { event } = require("jquery");
const successfullLookup = position => {

    const { latitude, longitude } = position.coords;

    return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=61e736aaffed49ea8d3d1a6c73937fac

`)
        .then(response => {

            return response.json()
        })

        .then(response => {

            // console.log(response.results[0].components["ISO_3166-1_alpha-3"]);

            const isoUser = response.results[0].components["ISO_3166-1_alpha-3"];
            // console.log(isoUser);

            const countriesIso = {
                euros: ['AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE'],

                pounds: ["IRL", 'NIR', 'ENG', 'WLS']
            };

            const showCurrency = document.querySelectorAll('.showCurrency');

            const changeCurrency = (html) => {

                showCurrency.forEach(function (el) {
                    el.textContent = '';
                    el.insertAdjacentHTML('beforebegin', html);
                })
            };


            if (countriesIso.euros.includes(isoUser)) {
                const html = `€`;
                changeCurrency(html);
            } else if (countriesIso.pounds.includes(isoUser)) {
                const html = `£`;
                changeCurrency(html);
            } else {
                const html = `$`;
                changeCurrency(html);
            }

        });
};


navigator.geolocation.getCurrentPosition(successfullLookup);

$(function () {

    // hamburger menu 

    const hamburger = $('#hamburger');
    const navUl = $('ul');

    hamburger.on('click', () => {
        navUl.toggleClass('show');
    })


    // pricing cards toggle show

    let btnHide = $('.btnHide');

    $('.pricing-header').on('click', btnHide, function () {
        $(this).siblings('div.pricing-txt-content').toggleClass('show')
    });
})
