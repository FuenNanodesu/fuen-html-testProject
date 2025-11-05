$(document).ready(function () {
    const $canvasFrame=$("#chartFrame")

    let canvasList=[]

    $("#startButton").on("click",function(){
        const canvasSize=100
        const input_sV=parseFloat($("#startV").val())/100
        const input_fV=parseFloat($("#finishV").val())/100
        const input_pV=parseFloat($("#progressV").val())

        //関数引数用sV,fVを最大値1,かつ最低値0に
        const sV=Math.min(Math.max(input_sV,0),1)
        const fV=Math.min(Math.max(input_fV,0),1)
        const pV=input_pV

        const {canvas,ctx}=add_canvas("pieChart",canvasSize,$canvasFrame)

        canvas.css({
            "position":"static",
            "margin":"0px",
        })

        const pieChartData=make_pieChart(canvas,ctx,[sV,fV],Easing.expo.inOut,pV)

        const currentId=canvasList.length
        canvas.attr("data-list-id",currentId);
        canvasList.push({
            id:currentId,
            element:canvas,
            context:ctx,
            startValue:sV,
            finishValue:fV,

            easingTime:pV,
        })
        console.log("canvasが追加された")
    })

    let $infoList=null;

    $canvasFrame.on("mouseenter","canvas",function(e){
        if($infoList){
            $infoList.remove()
        }
        const hoverElementId=parseInt($(this).attr("data-list-id"))
        const $targetElement=canvasList.find(item=>item.id===hoverElementId)

        if(!$targetElement) return;

        $infoList=$(`
            <ul>
                <li>ID:${$targetElement.id}</li>
                <li>Start%:${parseFloat($targetElement.startValue)*100}%</li>
                <li>Finish%:${$targetElement.finishValue*100}%</li>
                <li>trantisonTime:${$targetElement.easingTime}ms</li>
            </ul>
        `)

        $infoList.css({
            "width":"fit",
            "padding":"0px",
            
            "color":"black",
            "background-color":"white",

            "list-style":"none",

            "position":"absolute",
            "left":`${e.clientX}px`,
            "top":`${e.clientY}px`,

            "point-events":"none"
        })

        $infoList.find("li").css({
            "display":"block",
            "border":"1px solid black",
            "padding":"3px"
        })

        $("body").append($infoList);
    })

    $canvasFrame.on("mousemove","canvas",function(e){
        if($infoList){
            $infoList.css({
            "left":`${e.clientX}px`,
            "top":`${e.clientY}px`,
        })
        }
    })

    $canvasFrame.on("click","canvas",function(){
        console.log("a")

        const clickElementId=parseFloat($(this).attr("data-list-id"));
        const $targetElement=canvasList.find(item=>item.id===clickElementId)


        make_pieChart(
            $targetElement.element,
            $targetElement.context,
            [$targetElement.startValue,$targetElement.finishValue],
            Easing.expo.inOut,
            $targetElement.easingTime
        )
    })

    $canvasFrame.on("mouseleave","canvas",function(){
        if($infoList!==null){
            $infoList.remove()
        }
    })
});