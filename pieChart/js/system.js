function add_canvas(className,size,parentElement){
    let $canvas=$("<canvas></canvas>");
    $canvas.addClass(className);
    // $canvas=$canvas[0]

    let cssWidth=size;
    let cssHeight=size;

    const pixelRatio=Math.max(window.devicePixelRatio||1)

    $canvas[0].width=cssWidth*pixelRatio;
    $canvas[0].height=cssHeight*pixelRatio;

    $canvas.css({
        "width":cssWidth+"px",
        "height":cssHeight+"px",

        "border":"1px solid white",

        "position":"absolute",
        "left":"100px",
        "top":"100px",

    })

    $(parentElement).append($canvas);
    const ctx=$canvas[0].getContext("2d");
    ctx.scale(pixelRatio,pixelRatio);

    return {canvas:$canvas,ctx:ctx,size:size};
}

function make_pieChart(canvas,ctx,ratio=[0,1],trantionFunc,trantionTime){
    let canvasWidth=parseFloat(canvas.css("width"));
    let canvasHeight=parseFloat(canvas.css("height"));

    let pieChart={
        x:canvasWidth/2,
        y:canvasHeight/2,
        outRadius:canvasWidth/2,
        inRadius:0.4*canvasWidth/2,

        Pre_ratio:ratio[0],
        To_ratio:ratio[1],

        Now_progress:0,//進捗度0~1
        trantionTime:trantionTime,
    }

    let startTime=null

    const ratioStep=pieChart.To_ratio-pieChart.Pre_ratio


    //色の設定
    ctx.fillStyle="white"

    function animationLoop(currectTime){
        if(startTime===null){
            startTime=currectTime;
        }
        
        const progressTime=currectTime-startTime;

        pieChart.Now_progress=progressTime/trantionTime;

        ctx.clearRect(0,0,canvasWidth,canvasHeight);



        if(pieChart.Now_progress<1){
            const easedRatio=trantionFunc(pieChart.Now_progress)*ratioStep+pieChart.Pre_ratio
            const ratioAngle=Math.PI*2*easedRatio-Math.PI/2;

            //形状の計算
            ctx.beginPath();
                ctx.moveTo(pieChart.x,pieChart.y)
                ctx.arc(pieChart.x,pieChart.y,pieChart.outRadius,-Math.PI/2,ratioAngle)
                ctx.arc(pieChart.x,pieChart.y,pieChart.inRadius,ratioAngle,-Math.PI/2,true)
            ctx.closePath();

            ctx.fill()
            requestAnimationFrame(animationLoop)
        }else{
            pieChart.Now_progress=ratioStep+pieChart.Pre_ratio;

            const ratioAngle=Math.PI*2*pieChart.Now_progress-Math.PI/2;

            //形状の計算
            ctx.beginPath();
                ctx.moveTo(pieChart.x,pieChart.y)
                ctx.arc(pieChart.x,pieChart.y,pieChart.outRadius,-Math.PI/2,ratioAngle)
                ctx.arc(pieChart.x,pieChart.y,pieChart.inRadius,ratioAngle,-Math.PI/2,true)
            ctx.closePath();

            ctx.fill()
        }
    }

    requestAnimationFrame(animationLoop)
}