function load_font(){
    let req = new XMLHttpRequest
    req.open("GET", "fonts.json")
    req.send()
    req.onload = function(e){
        fonts = JSON.parse(req.response)
    }
}

function getfont(obj, moji){
    let d = obj[moji]
    let mat = []
    for(let i = 0; i < 16; i++){
        let m = []
        let d_row = d[i]
        for(let j = 0; j < 16; j++){
            m[15 - j] = d_row & 1
            d_row >>= 1
        }
        mat[i] = m
    }
    return mat
}

function color_elebb(n, mat, color){
    let canvas = document.getElementById('canvas')
    height = canvas.height
    let circle_d = height * 0.026875;
    let circle_m = circle_d / 6;
    let max = canvas.width / circle_d * 0.43
    for(let i = 0; i < 16; i++){
        for(let j = 16 * n; j < 16 * (n + 1); j++){
            let ctx = canvas.getContext('2d')
            let circle = new Path2D
            if(mat[i][j - 16 * n]){
                circle.arc(
                    circle_d + j * 2 * (circle_m + circle_d),
                    circle_d + i * 2 * (circle_m + circle_d),
                    circle_d, 0, 2 * Math.PI
                )
            }
            ctx.fillStyle = color
            ctx.fill(circle)
        }
    }
}

function reset_elebb(){
    let canvas = document.getElementById('canvas')
    height = canvas.height
    let circle_d = height * 0.026875;
    let circle_m = circle_d / 6;
    let max = canvas.width / circle_d * 0.43
    let ctx = canvas.getContext('2d')
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    )
    for(let i = 0; i < 16; i++){
        for(let j = 0; j < parseInt(max); j++){
            let ctx = canvas.getContext('2d')
            let circle = new Path2D
            circle.arc(
                circle_d + j * 2 * (circle_m + circle_d),
                circle_d + i * 2 * (circle_m + circle_d),
                circle_d, 0, 2 * Math.PI
            )
            ctx.fillStyle = "#424242"
            ctx.fill(circle)
        }
    }
}

function run(){
    let str_g = document.getElementById("str_g").value
    let str_r = document.getElementById("str_r").value
    let str_o = document.getElementById("str_o").value
    run_color(str_g, "#0f0")
    run_color(str_r, "#f00")
    run_color(str_o, "#f80")
}

function run_color(str, color){
    p = 0
    for(let i = 0; i < str.length; i++){
        console.log(str[i])
        if(str[i] != " ")
            color_elebb(p, getfont(fonts, str[i]), color)
        if(str[i].charCodeAt() < 128)
            p += 0.5
        else
            p += 1
    }
}

load_font()
reset_elebb()