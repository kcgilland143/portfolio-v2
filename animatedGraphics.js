var colors = ["#091b5c", "#000000", "#4592af"]
var twoPi = 2 * Math.PI

var circles = Array.from({ length: 20 },
    (n, i) => new Circle(circleTest.cx, circleTest.cy, circleTest.radius - (5 * i)))
  
var pipes = []
for (var i = 1; i < 10; i++) {
var startI = Math.floor(Math.random() * (circles.length - 1))
var start = Math.random() * (2 * Math.PI)
pipes.push(new Pipe(circles[startI],
    circles[startI + Math.floor(Math.random() * (circles.length - startI - 1) + 1)],
    start, start + 0.1 + (Math.random() * Math.PI)
))
}

pipes.forEach((pipe, i) => {
pipe.speed = pipe.speed ? pipe.speed : (Math.random() * 0.01) + 0.005
pipe.rotation = 0
pipe.getElement = function () {
    var el = this.toSvg({'fill-opacity': 0.5})
    el.setAttributeNS(null, 'fill', colors[Math.floor(Math.random() * colors.length)])
    return el
}
var sA, eA
pipe.update = function (el, timestamp) {
    sA = this.rotation + this.speed
    this.rotation = sA >= twoPi ? sA - twoPi : sA
    // sA = this.startAngle + this.speed
    // eA = this.endAngle + this.speed
    // this.setStartAngle(sA > twoPi ? sA - twoPi : sA)
    // this.setEndAngle(sA > twoPi ? eA - twoPi : eA)
    return this.render.bind(this, el)
}
pipe.render = function (el) {
    el.setAttributeNS(null, 'transform', getRotationString(this.rotation))
}
})

var svgElement = document.getElementById('main-svg')
var spinningPipes = new Animation(svgElement, pipes)

spinningPipes.enter()
spinningPipes.paused = false
spinningPipes.tick = function () {
  spinningPipes.update()
  spinningPipes.render()
  window.requestAnimationFrame(spinningPipes.tick)
}
window.requestAnimationFrame(spinningPipes.tick)