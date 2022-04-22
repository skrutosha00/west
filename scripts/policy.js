import { animate } from "./animate.js";

animate('.play')

if (!localStorage.getItem('balance_west')) {
    localStorage.setItem('balance_west', 10000)
}

if (!localStorage.getItem('mery_west')) {
    localStorage.setItem('mery_west', 0)
}

if (!localStorage.getItem('buffalo_west')) {
    localStorage.setItem('buffalo_west', 0)
}

if (!localStorage.getItem('cardking_west')) {
    localStorage.setItem('cardking_west', 0)
}

if (!localStorage.getItem('snowcat_west')) {
    localStorage.setItem('snowcat_west', 0)
}