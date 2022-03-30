// variables
// arr has elements to be sorted
var arr = []
// temp is to store the intermediate results after merging
var temp = []
// seen is for marking visited i.e. sorted half as green
var seen = []
// length of array
var len = 50

// canvas initialisations
var canvas = document.getElementById("myCanvas")
canvas.width = canvas.height = 1000
var canvaswidth = canvas.width
var canvasheight = canvas.height
var ctx = canvas.getContext("2d")

// random array
for (let i = 0; i < len; i++) {
    arr.push(parseInt(Math.random() * 500))
    temp.push(parseInt(0))
    seen.push(parseInt(0))
}

// initial contents of array to be sorted
// console.log(arr)

// draw the bars
draw = (s, e) => {
    ctx.clearRect(0, 0, 1000, 1000)

    // this loop will make unvisited bars in the upper half as black
    // and visited bars in the upper half as green
    for (let i = 0; i < len; i++) {
        ctx.fillStyle = "#000000"
        ctx.fillRect(15 * i, 500 - arr[i], 10, arr[i])
        if (seen[i]) {
            ctx.fillStyle = "#00ff00"
            ctx.fillRect(15 * i, 500 - arr[i], 10, arr[i])
        }
    }

    // the part that was merged is made blue in the lower half
    // also its equivalent in the uper half is made white
    for (let i = s; i <= e; i++) {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(15 * i, 500 - arr[i], 10, arr[i])
        ctx.fillStyle = "#0000ff"
        ctx.fillRect(15 * i, 500, 10, arr[i])
        seen[i] = 1
    }

}

// merge
merge = (s, e) => {

    let m = parseInt((s + e) / 2)
    let p1 = s
    let p2 = m + 1
    let n1 = m
    let n2 = e
    let idx = s

    while (p1 <= n1 && p2 <= n2) {
        if (arr[p1] <= arr[p2]) {
            temp[idx++] = arr[p1++]
        }
        else {
            temp[idx++] = arr[p2++]
        }
    }

    while (p1 <= n1) {
        temp[idx++] = arr[p1++]
    }

    while (p2 <= n2) {
        temp[idx++] = arr[p2++]
    }

    idx = s
    while (idx <= e) {
        arr[idx] = temp[idx++]
    }

}

// delay
function mytimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// mergesort
const mergesort = async (s, e) => {

    if (s < e) {
        let m = parseInt((s + e) / 2)
        await mergesort(s, m)
        await mergesort(m + 1, e)
        await merge(s, e)
        // await console.log(`merged ${s} to ${e} now draw...`)
        await draw(s, e)
        await mytimeout(500)
    }

}

// calls merge sort and at last
// makes all bars become green in upper half
const performer = async () => {
    await mergesort(0, len - 1)
    // await console.log(arr)
    await draw()
}



performer()
