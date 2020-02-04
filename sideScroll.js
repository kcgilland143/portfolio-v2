const container = document.querySelector('.toolkit');


const elCount = container.childElementCount
let scrollWidth = 27

let cStyle, elWidth, elMargin


for (let index = 0; index < elCount; index++) {

    cStyle = getComputedStyle(container.children[index])
    elWidth = cStyle.width.slice(0, -2) 
    elMargin = cStyle['margin-right'].slice(0, -2)
    
    scrollWidth += parseFloat(elWidth) + Math.ceil(parseFloat(elMargin))
    container.appendChild(container.children[index].cloneNode(true));
    
    console.log(scrollWidth, container.children[index], cStyle.width, elWidth, elMargin)
}

const anims = Array.prototype.map.call(container.children, (el) => {
    return el.animate([
        {transform: 'translateX(0)'},
        {transform: `translateX(-${scrollWidth}px`}
        ], 
        {
            duration: 20000,
            easing: "linear",
            iterations: Infinity}
    )
})

container.addEventListener('mouseenter', e => {
    anims.forEach(a => a.pause())
})

container.addEventListener('mouseleave', e => {
    anims.forEach(a => a.play())
})

console.log(scrollWidth)