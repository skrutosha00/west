import { animateOnce } from '../scripts/animate.js'

let balance = document.querySelector('.balance')
let slotCont = document.querySelector('.slot_cont')

let slotPicLinks = []
for (let i = 0; i < 8; i++) {
    slotPicLinks.push('../png/slot_' + (i + 1) + '.png')
}

let active = true
let autoMode = false

for (let i = 0; i < 3; i++) {

    let slot = document.createElement('div')
    slot.classList.add('slot')

    let slotPics = document.createElement('div')
    slotPics.classList.add('slot_pics')

    generatePics(slotPics, 3)

    slot.appendChild(slotPics)

    slotCont.appendChild(slot)
}

let betButton = document.querySelector('.bet_button')
let slotPicsNodes = document.querySelectorAll('.slot_pics')

let bet = document.querySelector('.bet')
let plus = document.querySelector('.plus')
let minus = document.querySelector('.minus')
let auto = document.querySelector('.spin')

let warning = document.querySelector('.warning')
let playAgainButton = document.querySelector('.warning .button')

plus.onclick = () => {
    if (Number(bet.innerHTML) + 50 > Number(balance.innerHTML) || !active || autoMode) { return }
    bet.innerHTML = Number(bet.innerHTML) + 50
}

minus.onclick = () => {
    if (!active || autoMode) { return }
    bet.innerHTML = 0
}

playAgainButton.onclick = () => {
    if (autoMode) { return }
    playAgain()
}

betButton.onclick = () => {
    if (autoMode) { return }
    betSingle()
}

auto.onclick = () => {
    if (bet.innerHTML == 0 || !active || autoMode) { return }

    let count = 1
    autoMode = true
    auto.classList.add('active')

    betSingle()
    setTimeout(() => {
        playAgain()
    }, 5500);

    let autoInterval = setInterval(() => {
        if (count < 10) {
            betSingle()
            setTimeout(() => {
                playAgain()
            }, 5500);
            count += 1
        } else {
            clearInterval(autoInterval)
            autoMode = false
            auto.classList.remove('active')
        }
    }, 7500);
}

function betSingle() {
    if (bet.innerHTML == 0 || !active) { return }
    active = false

    changeBalance(-Number(bet.innerHTML))

    let r = randInt(1, 3)
    let winSlot = slotPicLinks[randInt(1, 4) - 1]
    let ind = 0
    let order = shuffle(slotPicLinks)

    for (let slotPics of slotPicsNodes) {
        slotPics.style.transition = 'top ease 4s'
        generatePics(slotPics, 24, r, winSlot, ind, order)
        ind++
        slotPics.style.top = Number(slotPics.style.top.replace('px', '')) - 1920 + 'px'
    }

    let prize = Number(bet.innerHTML) * 5

    setTimeout(() => {
        if (r == 1) {
            changeBalance(prize)
            animateOnce('.balance')
        }
    }, 4100);

    setTimeout(() => {
        warning.firstElementChild.innerHTML = r == 1 ? 'Congrats!<br/>You have won ' + prize : 'No way!<br/>Try again right now'
        warning.style.left = '200px'
    }, 4500);
}

function playAgain() {
    for (let slotPics of slotPicsNodes) {
        slotPics.style.transition = 'none'
        slotPics.innerHTML = ''
        slotPics.style.top = 0
        generatePics(slotPics, 3)
    }

    warning.style.left = '-50%'
    active = true
}

function generatePics(slotPics, count, r, winSlot, ind, order) {
    let shuffledLinks = shuffle(slotPicLinks)

    for (let j = 0; j < count; j++) {
        let slotPicCont = document.createElement('div')
        slotPicCont.classList.add('center')

        let slotPic = document.createElement('img')

        if (j == 22) {
            slotPic.src = r == 1 ? winSlot : shuffledLinks[randInt(1, 4) - 1]
            if (r == 1) {
                slotPic.src = winSlot
            } else {
                slotPic.src = order[ind]
            }
        } else {
            slotPic.src = j < 4 ? shuffledLinks[j] : shuffledLinks[randInt(1, 4) - 1]
        }

        slotPicCont.appendChild(slotPic)
        slotPics.appendChild(slotPicCont)
    }
}

function changeBalance(amount) {
    localStorage.setItem('balance_west', Number(localStorage.getItem('balance_west')) + amount)
    balance.innerHTML = localStorage.getItem('balance_west')
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    let array = [...arr]
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}