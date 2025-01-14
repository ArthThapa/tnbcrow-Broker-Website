const sellWrap = document.getElementById("sell")
const buyWrap = document.getElementById("buy")

const sellMain = document.getElementById("sellWrap")
const buyMain = document.getElementById("buyWrap")

const tradesWrap = document.getElementById("trade")

const errMsgBuy = document.createElement("td")
errMsgBuy.colSpan = "3"
errMsgBuy.innerHTML = "Sorry, there are no buy offers available."

const errMsgSell = document.createElement("td")
errMsgSell.colSpan = "3"
errMsgSell.innerHTML = "Sorry, there are no sell offers available."

const apiErr = document.createElement("h1");
apiErr.innerText = "Oh no, seems like the API is not working."

const apiErr2 = document.createElement("h1");
apiErr2.innerText = "Oh no, seems like the API is not working."


// BUY OFFERS
fetch('https://tnbcrow.pythonanywhere.com/orders?ordering=-price&side=BUY&status=NEW').then(response => response.json()).then(offers => {
    if(offers.count > 0) {
        displayList(offers, buyWrap);
    } else {
        buyWrap.innerHTML = ""
        buyWrap.appendChild(errMsgBuy)
    }
}).catch(error => {
    buyMain.innerHTML = ""
    buyMain.appendChild(apiErr)
});

// SELL OFFERS
fetch("https://tnbcrow.pythonanywhere.com/orders?ordering=price&side=SELL&status=NEW").then(response => response.json().then(offers => {
    if (offers.count > 0){
        displayList(offers, sellWrap)
    } else {
        sellWrap.innerHTML = ""
        sellWrap.appendChild(errMsgSell)
    }
})).catch(err => {
    sellMain.innerHTML = ""
    sellMain.appendChild(apiErr2)

})

function displayList(offers, wrapper) {

    // let buy_offer_list = []
    for (let i=0; i < offers.count && i < 6; i++) {
        
        let offer = document.createElement('tr');
        offer.innerHTML = `<td>${offers.results[i].price}</td><td>${offers.results[i].amount}</td><td>${offers.results[i].total}</td>`
        wrapper.appendChild(offer);
    } 
    
}


// Recent Trades

fetch("https://tnbcrow.pythonanywhere.com/recent-trades").then(res => res.json()).then(trades => {
    if (trades.count > 0) {
        displayTrades(trades, tradesWrap)
    }
}).catch(err => console.log(err))

function displayTrades(trades, wrapper) {

    // let buy_offer_list = []
    for (let i=0; i < trades.count && i < 8; i++) {
        
        let trade = document.createElement('tr');
        trade.innerHTML = `<td>${trades.results[i].rate}</td><td>${trades.results[i].amount}</td><td>${trades.results[i].rate * trades.results[i].amount}</td>`
        wrapper.appendChild(trade);
    } 
    
}

// Statistics

const rate = document.getElementById("rate");
const cap = document.getElementById('cap');
const supply = document.getElementById('circ');

fetch("https://raw.githubusercontent.com/itsnikhil/tnb-analysis/master/web/js/static.json").then(res => res.json()).then(data => {
    supply.innerText = data.Total
}).catch(err => {
    supply.innerText = "There seems to be something wrong with the API";
    cap.innerText = "There seems to be something wrong with the API"
})

fetch("https://tnbcrow.pythonanywhere.com/statistics").then(res => res.json()).then(data => {
    rate.innerText = data.results[0].last_rate
    cap.innerText = supply.innerText * rate.innerText
}).catch(err => {
    rate.innerText = "There seems to be something wrong with the API"
    cap.innerText = "There seems to be something wrong with the API"
})

