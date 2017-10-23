

function ready(fn)
{
    if (document.addEventListener)  //标准浏览器
    {
        document.addEventListener('DOMContentLoaded', function()
        {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            fn();
        }, false);
    }
    else if (document.attachEvent)  //IE浏览器
    {
        document.attachEvent('onreadystatechange', function()
        {
            if (document.readyState == 'complete')
            {
                document.detachEvent('onreadystatechange', arguments.callee);
                fn();
            }
        })
    }
}

this.ready(function(){

    var height = window.innerHeight;    //窗口文档的高度，不包括菜单栏、工具栏、滚动条等
    var x = 0;
    var y = height/2;
    var curveX = 10;
    var curveY = 0;
    var targetX = 0;
    var xitteration = 0;
    var yitteration = 0;
    var menuExpanded = false;

    var blob = document.getElementById("blob");
    var blobPath = document.getElementById("blob-path");
    var hamburger = document.getElementsByClassName("hamburger")[0];

    this.addEventListener('mousemove', function(e){
        x = e.pageX;
        y = e.pageY;
    });    
    
    var enterEles = document.querySelectorAll(".hamburger, .menu-inner");
    for (var i = 0; i <= enterEles.length-1; i++)
    {
        enterEles[i].addEventListener('mouseenter', function(e){
            this.parentNode.classList.add('expanded');
            menuExpanded = true;
        });
    }

    var leaveEles = document.querySelectorAll(".menu-inner");
    for (var j = 0; j <= enterEles.length-1; j++)
    {
        enterEles[j].addEventListener('mouseleave', function(e){
            menuExpanded = false;
            this.parentNode.classList.remove('expanded');            
        });
    }

    function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) 
    {
		return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
    }
    
    var hoverZone = 150;
    var expandAmount = 20;
    
    function svgCurve()
    {
        if ((curveX > x-1) && (curveX < x+1))
        {
            xitteration = 0;
        }
        else
        {
            if (menuExpanded)
            {
                targetX = 0;
            }
            else
            {
                xitteration = 0;
                if (x > hoverZone)
                {
                    targetX = 0;
                }
                else
                {
                    targetX = -((60+expandAmount)/100*(x-hoverZone));
                }
            }
            xitteration++;
        }

        if ((curveY > y-1) && (curveY < y+1))
        {
            yitteration = 0;
        }
        else
        {
            yitteration = 0;
            yitteration++;
        }

        curveX = easeOutExpo(xitteration, curveX, targetX-curveX, 100);
        curveY = easeOutExpo(yitteration, curveY, y-curveY, 100);

        var anchorDistance = 200;
        var curviness = anchorDistance - 40;

        var newCurve2 = "M60,"+height+"H0V0h60v"+(curveY-anchorDistance)+"c0,"+curviness+","+curveX+","+curviness+","+curveX+","+anchorDistance+"S60,"+(curveY)+",60,"+(curveY+(anchorDistance*2))+"V"+height+"z";
        
        blobPath.setAttribute("d", newCurve2);
        blob.style.width = curveX + 60 + 'px';

        hamburger.style.transform = 'translate('+curveX+'px, '+curveY+'px)';
        window.requestAnimationFrame(svgCurve);
    }

    window.requestAnimationFrame(svgCurve);

});
  
