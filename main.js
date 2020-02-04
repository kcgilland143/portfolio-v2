
function cycle() {

    const cycleElements = document.querySelector(".cycle-text")
    let index = 0;
    let clear = true;
    const children = cycleElements.children
    const numChildren = children.length

    function updateElems() {
        Array.prototype.forEach.call(cycleElements.children, (node, key) => {
            if (index !== key) {
                if (node.classList.contains('active')) {
                    node.classList.remove('active');
                    clear = false
                    node.addEventListener('animationend', (event) => {
                        if (event.animationName === 'slideOut') {
                            clear = true
                            node.style.display = 'none'
                            cycleElems()
                        }
                    }, { once: true })
                }
                node.classList.add('inactive');
            } else if (clear) {
                node.classList.remove('inactive')
                node.classList.add('active')
                node.style.display = 'block'
                clear = false
                node.addEventListener('animationend', (event) => {
                    if (event.animationName == 'slideIn')
                        cycleElems()
                }, { once: true })
            }
        })
    }

    function cycleElems() {
        index = ++index % numChildren
        updateElems();
    }

    updateElems()

    setTimeout(() => {
        cycleElems();
    }, 2000)

}

window.onload = cycle