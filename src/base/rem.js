!(function (n) {
  var e = n.document,
    t = e.documentElement,
    i = 750,
    d = i / 100,
    o = 'orientationchange' in n ? 'orientationchange' : 'resize',
	isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)?true:false
    a = function () {
      var n = t.clientWidth || 375
      n > 375 && (n = 375)
	  !isMobile&&n<375&&(n=375)
      t.style.fontSize = n / d + 'px'
    }
  e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener('DOMContentLoaded', a, !1))
}(window))
