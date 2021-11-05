
async function getCurrencies() {
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const data = await response.json();

    const usdRatePrev = data.Valute.USD.Previous;
    const eurRatePrev = data.Valute.EUR.Previous;
    
    const usdRate = data.Valute.USD.Value.toFixed(2);
    const eurRate = data.Valute.EUR.Value.toFixed(2);

    const usdElement = document.querySelector("#usd");
    const eurElement = document.querySelector("#eur");

    usdElement.innerText = usdRate;
    eurElement.innerText = eurRate;

    if (usdRate > usdRatePrev) {
        usdElement.classList.add('red');
        usdElement.innerText += ' ↑↑'
    } else {
        usdElement.classList.add("green");
        usdElement.innerText += " ↓↓";
    }

    if (eurRate > eurRatePrev) {
        eurElement.classList.add("red");
        eurElement.innerText += " ↑↑";
    } else {
        eurElement.classList.add("green");
        eurElement.innerText += " ↓↓";
    }
}

getCurrencies();


