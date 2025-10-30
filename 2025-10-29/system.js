function clickaanim_canvas(mouseX,mouseY){
    let $canvas=$("<canvas></canvas>");

    let cssWidth=100;
    let cssHeight=100;

    let canvasSize=1.2
    if(("ontouchstart"in window)||(navigator.maxTouchPoints>0)){
        canvasSize=5
    }

    cssWidth*=canvasSize;
    cssHeight*=canvasSize;

    const pixelRatio=Math.max(window.devicePixelRatio||1,1);

    $canvas[0].width=cssWidth*pixelRatio;
    $canvas[0].height=cssHeight*pixelRatio;

    $canvas.css({
        "pointer-events":"none",
        "width":cssWidth+"px",
        "height":cssHeight+"px",

        "position":"absolute",
        "left":`${mouseX}px`,
        "top":`${mouseY}px`,

        "transform":"translate(-50%,-50%)",//このあとマウスに追従させるため
    })

    let ctx=$canvas[0].getContext("2d")
    ctx.scale(pixelRatio,pixelRatio)

    $("body").append($canvas);

    // return{ctx,cssWidth,cssHeight}

    //以下は旧startAnimation

    let donut={
        x:cssWidth/2,
        y:cssHeight/2,
        radius:15*canvasSize,
        maxRadius:Math.min(cssWidth,cssHeight)/2,
        dr:1*canvasSize,
        holeRadius:0.7,

        opacity:1.5,
        dp:0.15,
        blur:1.05*canvasSize,
        gradient_rotate:Math.random()
    }

    function animateLoop(){
        ctx.filter="none"
        ctx.clearRect(0,0,cssWidth,cssHeight);
        ctx.filter=`blur(${donut.blur.toFixed(0)}px)`;

        let gradient=ctx.createConicGradient(0,donut.x,donut.y);
        const gradient_rotate=Math.random()
        //以下は色の指定
        gradient.addColorStop(getFracPart(0+donut.gradient_rotate),`rgba(220,255,0,${donut.opacity}`)
        gradient.addColorStop(getFracPart(0.16+donut.gradient_rotate),`rgba(157,255,100,${donut.opacity}`)
        gradient.addColorStop(getFracPart(0.35+donut.gradient_rotate),`rgba(176,215,255,${donut.opacity}`)
        gradient.addColorStop(getFracPart(0.75+donut.gradient_rotate),`rgba(241,200,255,${donut.opacity}`)
        gradient.addColorStop(getFracPart(0.95+donut.gradient_rotate),`rgba(255,207,150,${donut.opacity}`)
        gradient.addColorStop(getFracPart(1+donut.gradient_rotate),`rgba(220,255,0,${donut.opacity}`)

        ctx.beginPath();
            ctx.arc(donut.x,donut.y,donut.radius,0,Math.PI*2,false);
            ctx.arc(donut.x,donut.y,donut.radius*donut.holeRadius,0,Math.PI*2,true);
            ctx.fillStyle=gradient;
            ctx.fill();
        ctx.closePath();

        if(donut.opacity>0){
            donut.radius+=donut.dr;
            donut.opacity-=donut.dp;
            donut.blur*=1.1;
            // console.log("拡大");

            requestAnimationFrame(animateLoop)
        }else{
            $canvas.remove()
        }
    }
    requestAnimationFrame(animateLoop)

    for(let i=0;i<3;i++){
        star_canvas(mouseX,mouseY,Math.random()*Math.PI*2,20)
    }
}

function getFracPart(x){
    return x-Math.floor(x);
}



function star_canvas(mouseX,mouseY,angle,R){
    let $canvas=$("<canvas></canvas>");

    let cssWidth=20;
    let cssHeight=20;

    let canvasSize=0.7*1*(Math.random()/2+0.8)
    if(("ontouchstart"in window)||(navigator.maxTouchPoints>0)){
        canvasSize=0.7*5*(Math.random()/2+0.8)
    }

    cssWidth*=canvasSize;
    cssHeight*=canvasSize;

    const pixelRatio=Math.max(window.devicePixelRatio||1,1);

    $canvas[0].width=cssWidth*pixelRatio;
    $canvas[0].height=cssHeight*pixelRatio;

    $canvas.css({
        "pointer-events":"none",
        "width":cssWidth+"px",
        "height":cssHeight+"px",

        "position":"absolute",
        "left":`${mouseX-cssWidth/2}px`,
        "top":`${mouseY-cssHeight/2}px`,
        "z-index":"100",
    })

    let ctx=$canvas[0].getContext("2d");
    ctx.scale(pixelRatio,pixelRatio)

    $("body").append($canvas);

    let star={
        // angle:Math.PI,
        angle:angle,
        Radius:R*canvasSize,
        dr:0.2*canvasSize,

        opacity:1.5,
        dp:0.10,

        blur:1.05,
    }
    function star_AnimateLoop(){
        ctx.filter="none"
        ctx.clearRect=(0,0,cssWidth,cssHeight)

        ctx.filter=`blur(${star.blur.toFixed(0)}px)`
        ctx.fillStyle="white"

        ctx.beginPath();
            ctx.moveTo(cssWidth/2,0);
            ctx.arc(cssWidth,0,cssWidth/2,Math.PI,Math.PI/2,true);
            ctx.arc(cssWidth,cssHeight,cssWidth/2,-Math.PI/2,-Math.PI,true);
            ctx.arc(0,cssHeight,cssWidth/2,0,-Math.PI/2,true);
            ctx.arc(0,0,cssWidth/2,Math.PI/2,0,true);
        ctx.closePath();


        ctx.fill()

        $canvas.css({
            "transform":`translate(${Math.cos(star.angle)*star.Radius}px,${Math.sin(star.angle)*star.Radius}px)`,
            "opacity":star.opacity,
        })

        if(star.opacity>0){
            star.Radius+=star.dr;
            star.opacity-=star.dp;
            star.blur*=1.1
            // console.log("拡大");

            requestAnimationFrame(star_AnimateLoop)
        }else{
            $canvas.remove()
        }
    }
    requestAnimationFrame(star_AnimateLoop)    
}


$("document").ready(function(){
    const isTouchDiveice=("ontouchstart"in window)||(navigator.maxTouchPoints>0);
    if(!isTouchDiveice){
        $(this).on("mousedown",function(e){
            clickaanim_canvas(e.pageX,e.pageY)

        });
    }else{
        $(this).on("touchstart",function(e){
        if (e.originalEvent.touches && e.originalEvent.touches.length > 0) {
            // 最初の指の座標を取得
            let touch = e.originalEvent.touches[0];
            clickaanim_canvas(touch.pageX, touch.pageY);
        }
        });
    }
});