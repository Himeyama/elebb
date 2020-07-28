class EleBB{
    canvas
    green = ""
    red = ""
    orange = ""

    // フォントを取得
    static load_font(){
        let req = new XMLHttpRequest
        req.open("GET", "fonts.json")
        req.send()
        req.onload = function(e){
            EleBB.fonts = JSON.parse(req.response)
        }
    }

    // 要素指定
    set element(id){
        this.canvas = document.getElementById(id)
    }

    // 1フォントを取得
    getfont(obj, moji){
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

    // 文字の書き出し
    color_elebb(n, mat, color){
        let circle_d = this.canvas.height * 0.026875;
        let circle_m = circle_d / 6;
        for(let i = 0; i < 16; i++){
            for(let j = 16 * n; j < 16 * (n + 1); j++){
                let ctx = this.canvas.getContext('2d')
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

    // 文字のリセット
    reset_elebb(){
        let circle_d = this.canvas.height * 0.026875
        let circle_m = circle_d / 6
        let max = this.canvas.width / circle_d * 0.43
        let ctx = this.canvas.getContext('2d')
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.fillStyle = "#1a1a1a"
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        for(let i = 0; i < 16; i++){
            for(let j = 0; j < parseInt(max); j++){
                let ctx = this.canvas.getContext('2d')
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

    // 一つの色を書き出し
    run_color(str, color){
        let p = 0
        for(let i = 0; i < str.length; i++){
            if(str[i] != " ")
                this.color_elebb(p, this.getfont(EleBB.fonts, str[i]), color)
            if(str[i].charCodeAt() < 128 || "ｰ".charCodeAt() <= str[i].charCodeAt() && "ﾟ".charCodeAt() >= str[i].charCodeAt())
                p += 0.5
            else
                p += 1
        }
    }

    display(){
        this.run_color(this.green, "#0f0")
        this.run_color(this.red, "#f00")
        this.run_color(this.orange, "#f80")
    }

    // 複数の文字の書き出し
    run(){
        this.green = document.getElementById("str_g").value
        this.red = document.getElementById("str_r").value
        this.orange = document.getElementById("str_o").value
        this.display()
    }
}

