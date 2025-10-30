$contentBox=$("#content_box");
maxLeft=parseFloat($contentBox.css("width"))
maxTop=parseFloat($contentBox.css("height"))

function addDiv(){
    let $element=$("<div class='star'></div>")

    elementSize=(Math.random()+0.1)*5+"px"
    elementDepth=Math.round(Math.random()*100)
    // console.log(elementDepth)
    elementLeft=(Math.random()*maxLeft)-parseFloat(elementSize)+"px"
    elementTop=(Math.random()*maxTop)-parseFloat(elementSize)+"px"

    $element.css({
        "background-color":"white",
        "width":elementSize,
        "height":elementSize,

        "z-index":elementDepth,
        "position":"absolute",
        "left":elementLeft,
        "top":elementTop,
        "transition":"transform 1s",
    })
    $contentBox.append($element);
}

let $allStarDiv=null
let rafId=null
let currectMouseX=0
let currectMouseY=0

function updateStars(){
    $allStarDiv.each(function(){
        let zIndexVal=parseFloat($(this).css("z-index"))

        $(this).css({
            "transform":`translate(${-currectMouseX/zIndexVal}px,${-currectMouseY/zIndexVal}px)`
        })
    })
    rafId=window.requestAnimationFrame(updateStars)
}

$(document).ready(function(){
    
    for(let i=0;i<3000;i++){
        addDiv()
    }
    $allStarDiv=$(".star")

    $contentBox.on("mousemove",function(e){
        let $outerdDiv=$(this);

        currectMouseX=e.pageX-$outerdDiv.offset().left-$outerdDiv.width()/2
        currectMouseY=e.pageY-$outerdDiv.offset().top-$outerdDiv.height()/2


        if(rafId===null){
            rafId=window.requestAnimationFrame(updateStars)
        }
    });

    $contentBox.on("mouseleave",function(){
        if(rafId!==null){
            window.cancelAnimationFrame(rafId);
            rafId=null;
        }
    })

})