import { animate, animateOnce } from "./animate.js"

let players = [
    { name: "mery", cf: 70, cfStart: 2, angle: 130 },
    { name: "buffalo", cf: 10, cfStart: 3, angle: 20 },
    { name: "cardking", cf: 15, cfStart: 4, angle: 170 },
    { name: "snowcat", cf: 25, cfStart: 4, angle: 0 },
    { name: "aboba", cf: 25, cfStart: 4, angle: 50 }
]

let active = true

let bet = document.querySelector('.bet')
let plus = document.querySelector('.plus')
let minus = document.querySelector('.minus')
let betButton = document.querySelector('.bet_button')

let bottle = document.querySelector('.bottle')
bottle.style.transition = 'transform 2s ease'

let warning = document.querySelector('.warning')
let playAgain = document.querySelector('.warning .button')

for (let player of players) {
    let cf = document.querySelector('.cf.' + player.name)
    if (localStorage.getItem(player.name + '_west') == 1) {
        cf.innerHTML = 'X' + player.cf
        player.cfTotal = player.cf
    } else {
        cf.innerHTML = 'X' + player.cfStart
        player.cfTotal = player.cfStart
    }
}

animate('.cf')

setInterval(() => {
    if (active) {
        animateOnce('.pers')
    }
}, 2500);

plus.onclick = () => {
    if (Number(bet.innerHTML) + 50 > Number(balance.innerHTML) || !active) { return }
    bet.innerHTML = Number(bet.innerHTML) + 50
}

minus.onclick = () => {
    if (!active) { return }
    bet.innerHTML = 0
}

betButton.onclick = () => {
    if (bet.innerHTML == 0 || !active) { return }
    active = false

    changeBalance(-Number(bet.innerHTML))

    let player = players[randInt(1, 5) - 1]
    bottle.style.transform = 'rotate(' + (player.angle + 640) + 'deg)'

    let prize = Number(bet.innerHTML) * player.cfTotal

    setTimeout(() => {
        changeBalance(prize)
        animateOnce('.balance')
    }, 2100);

    setTimeout(() => {
        bottle.style.transform = 'rotate(90deg)'

        warning.firstElementChild.innerHTML = 'Congrats!<br/>You have won ' + prize
        warning.style.left = '200px'
    }, 2500);
}

playAgain.onclick = () => {
    bottle.style.transform = 'rotate(90)'

    warning.style.left = '-50%'
    active = true
}

function changeBalance(amount) {
    localStorage.setItem('balance_west', Number(localStorage.getItem('balance_west')) + amount)
    balance.innerHTML = localStorage.getItem('balance_west')
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}