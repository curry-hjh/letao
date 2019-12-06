$(document).ajaxStart(function(){
  NProgress.start()
})
$(document).ajaxError(function(){
  alert('服务器繁忙！！！')
})
$(document).ajaxStop(function() {
setTimeout(function(){
  NProgress.done()
},500)
})