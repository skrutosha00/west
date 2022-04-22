import { animate } from "./animate.js"

let players = [
    { name: "Mery", img: "../png/mery.png", cf: 70, price: 1860550 },
    { name: "Buffalo", img: "../png/buffalo.png", cf: 10, price: 320000 },
    { name: "Cardking", img: "../png/cardking.png", cf: 15, price: 420000 },
    { name: "Snowcat", img: "../png/snowcat.png", cf: 25, price: 720000 }
]

let balance = document.querySelector('.balance')
let cardCont = document.querySelector('.card_cont')

for (let player of players) {
    let card = document.createElement('div')
    card.classList.add('card')

    let cf = document.createElement('div')
    cf.classList.add('cf', 'center')
    cf.innerHTML = 'X' + player.cf
    card.appendChild(cf)

    let name = document.createElement('div')
    name.classList.add('name', 'center')
    name.innerHTML = player.name
    card.appendChild(name)

    let pic = document.createElement('img')
    pic.classList.add('pic')
    pic.src = player.img
    card.appendChild(pic)

    let priceCont = document.createElement('div')
    priceCont.classList.add('price_cont', 'center')
    priceCont.dataset.player = player.name

    if (localStorage.getItem(player.name.toLowerCase() + '_west') == 1) {
        priceCont.innerHTML = 'GOT IT'
    } else {
        let currency = document.createElement('img')
        currency.src = '../png/currency.png'

        let price = document.createElement('div')
        price.innerHTML = player.price

        priceCont.appendChild(currency)
        priceCont.appendChild(price)
    }
    card.appendChild(priceCont)

    priceCont.onclick = () => {
        let price = priceCont.querySelector('div')

        if (priceCont.innerHTML != 'GOT IT') {
            if (Number(balance.innerHTML) <= Number(price.innerHTML)) { return }
            changeBalance(-Number(price.innerHTML))

            priceCont.innerHTML = 'GOT IT'

            localStorage.setItem(priceCont.dataset.player.toLowerCase() + '_west', 1)
        }
    }

    cardCont.appendChild(card)
}

animate('.cf')
animate('.pic')

document.querySelector('body').classList.remove('hidden')

function changeBalance(amount) {
    localStorage.setItem('balance_west', Number(localStorage.getItem('balance_west')) + amount)
    balance.innerHTML = localStorage.getItem('balance_west')
}