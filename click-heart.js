!function (win, doc) {
    var heartObjs = [];

    function requestAnimate() {
        for (var i = 0; i < heartObjs.length; i++){
            heartObjs[i].alpha <= 0 
                ? (
                    doc.body.removeChild(heartObjs[i].el),
                    heartObjs.splice(i, 1)
                ) 
                : (
                    heartObjs[i].y--, 
                    heartObjs[i].scale += .004,
                    heartObjs[i].alpha -= .013,

                    heartObjs[i].el.style.cssText = 
                        'left:' + heartObjs[i].x + 'px;'+
                        'top:' + heartObjs[i].y + 'px;'+
                        'opacity:' + heartObjs[i].alpha + ';'+
                        'transform:scale(' + heartObjs[i].scale + ',' + heartObjs[i].scale + ') rotate(45deg);'+
                        'background:' + heartObjs[i].color + ';'+
                        'z-index:99999;'+
                    ''
                );
        }
        requestAnimationFrame(requestAnimate)
    }

    function bindClickEvent() {
        var oldEventHandler = typeof win.onclick == "function" && win.onclick;
        win.onclick = function (e) {
            oldEventHandler && oldEventHandler();
            newEventHandler(e);
        }
    }

    function newEventHandler(e) {
        var div = doc.createElement("div");

        div.className = "heart";
        heartObjs.push({
            el: div,
            x: e.clientX - 5,
            y: e.clientY - 5,
            scale: 1,
            alpha: 1,
            color: getColor()
        });
        doc.body.appendChild(div);
    }

    function appendStyleTag(e) {
        var styleTag = doc.createElement("style");
        styleTag.type = "text/css";
        try {
            styleTag.appendChild(doc.createTextNode(e))
        } catch (t) {
            styleTag.styleSheet.cssText = e
        }
        doc.getElementsByTagName("head")[0].appendChild(styleTag)
    }

    function getColor() {
        return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")";
    }



    win.requestAnimationFrame = win.requestAnimationFrame 
        || win.webkitRequestAnimationFrame 
        || win.mozRequestAnimationFrame 
        || win.oRequestAnimationFrame 
        || win.msRequestAnimationFrame 
        || function (callback) {
            setTimeout(callback, 1e3 / 60)
        }

    appendStyleTag(
        '.heart{'+
            'pointer-events: none;'+
            'width: 10px;'+
            'height: 10px;'+
            'position: fixed;'+
            'background: #f00;'+
            'transform: rotate(45deg);'+
            '-webkit-transform: rotate(45deg);'+
            '-moz-transform: rotate(45deg);'+
        '}'+

        '.heart:after,'+
        '.heart:before{'+
            'content: "";'+
            'width: inherit;'+
            'height: inherit;'+
            'background: inherit;'+
            'border-radius: 50%;'+
            '-webkit-border-radius: 50%;'+
            '-moz-border-radius: 50%;'+
            'position: fixed;'+
        '}'+

        '.heart:after{'+
            'top: -5px;'+
        '}'+
        
        '.heart:before{'+
            'left: -5px;'+
        '}'+
        ''
    );

    bindClickEvent();

    requestAnimate();
}(window, document);
