class Explode
{
    static getClips(dom, clips=5)
    {
        let domWidth = dom.offsetWidth;
        let domHeight = dom.offsetHeight;
        let clipWidth = domWidth/clips;
        let clipHeight = domHeight/clips;
        // let totalClips = Math.pow(clips, 2);

        let contentDiv = dom.getElementsByClassName('content')[0];
        let html = contentDiv.innerHTML;

        for (let y = 0; y <= (clips*clipHeight); y = y+clipHeight)
        {
            for (let x = 0; x <= (clips*clipWidth); x = x+clipWidth)
            {
                let clipItem = Explode.createDomElement('<div class="clipped" style="clip: rect(' + y + 'px, ' + (x + clipWidth) + 'px, ' + (y + clipHeight) + 'px, ' + x + 'px)">' + html + '</div>');
                dom.appendChild(clipItem);
            }
        }
        
        let clipItemArray = Array.from(dom.getElementsByTagName('div'));

        // let first = false;
        let clicked = false;
        clipItemArray.forEach(function(item)
        {
            item.onclick = function()
            {
                if(clicked === false)
                {
                    clicked = true;

                    contentDiv.style.display = 'none';
                    clipItemArray.forEach(function(thisitem)
                    {
                        let v = Explode.rand(90, 120),
                            angle = Explode.rand(80, 89),
                            theta = (angle * Math.PI)/180,
                            g = -9.8;
    
                        let t = 0,
                            z,nx,ny,
                            totalt = 15;
    
                        let negate = [1, -1, 0],
                            direction = negate[Math.floor(Math.random() * negate.length)];
    
                        let randDeg = Explode.rand(-5, 10),
                            randScale = Explode.rand(0.9, 1.1),
                            randDeg2 = Explode.rand(30, 5);
                        
                        thisitem.style.transform = 'scale(' + randScale + ') skew(' + randDeg + 'deg) rotateZ(' + randDeg2 + 'deg)';    

                        function step()
                        {
                            let ux = (Math.cos(theta) * v) * direction;
                            let uy = (Math.sin(theta) * v) - ((-g) * t);
                            nx = (ux * t);
                            ny = (uy * t) + (0.5 * (g) * Math.pow(t, 2));
    
                            thisitem.style.bottom = ny + 'px';
                            thisitem.style.left =  nx + 'px';
    
                            t = t + 0.10;
                            if (t > totalt) 
                            {
                                clicked = false;
    
                                dom.style.top = '-1000px';
                                dom.style.transition = 'none';
    
                                thisitem.style.left = '0';
                                thisitem.style.bottom = '0';
                                thisitem.style.opacity = '1';
                                thisitem.style.transition = 'none';
                                thisitem.style.transform = 'none';
    
                                window.cancelAnimationFrame(z);
                            }

                            z = window.requestAnimationFrame(step);
                        }

                        step();
    
                    });
                }
                
            };
        });
    }

    static createDomElement(htmlstr)
    {
        let div = document.createElement('div');
        div.innerHTML = htmlstr;
        return div.childNodes[0];
    }

    static rand(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// export default Explode;