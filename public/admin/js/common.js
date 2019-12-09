$(document).ajaxStart(function() {
  NProgress.start();
});
$(document).ajaxError(function() {
  alert("服务器繁忙！！！");
});
$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done();
  }, 500);
});
$(".category").on("click", function() {
  $(".second").slideToggle();
});
$(".btn-aside").on("click", function() {
  $(".aside, .content, .topBar").toggleClass("now");
});
$(".btn-logout").on("click", function() {
  $(".logoutModal").modal("show");
});
$(".btn-sure").on("click", function() {
  $.ajax({
    type: "get",
    url: "/employee/employeeLogout",
    success: function(info) {
      if (info.success) {
        location.href = "login.html";
      }
    }
  });
});
