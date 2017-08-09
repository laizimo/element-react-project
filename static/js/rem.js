(function(win, doc){
    const docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if(!clientWidth) return;
            docEl.style.fontSize = clientWidth / 7.5 + 'px';
        };

    if(!doc.addEventListener) return;

    doc.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(window, document);