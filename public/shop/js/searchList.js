$(function() {
  var href = decodeURI(location.href);
  var key = href.split("=")[1];
  $(".search input").val(key);

  var render = function() {
    var option = {
      proName: key,
      page: 1,
      pageSize: 100
    };

    var $now = $(".now");
    if ($now.length === 1) {
      var name = $now.data("name");
      var value = $now.children("i").hasClass("fa-angle-up") ? 1 : 2;
      option[name] = value;
    }
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: option,
      beforeSend: function() {
        $(".mask").show();
      },
      success: function(info) {
        console.log(info);
        $(".products").html(template("tpl", info));
      },
      complete: function() {
        setTimeout(function() {
          $(".mask").hide();
        }, 1000);
      }
    });
  };
  render();

  $(".sort li[data-name]").on("click", function() {
    console.log("哈哈");
    if ($(this).hasClass("now")) {
      $(this)
        .children("i")
        .toggleClass("fa-angle-up")
        .toggleClass("fa-angle-down");
    } else {
      $(this)
        .addClass("now")
        .siblings()
        .removeClass("now");
    }
    render();
  });
  $(".btn-search").on("click", function() {
    var content = $(".search input").val();
    console.log(content);
    if (content.length == 0) {
      mui.toast("输入内容不能为空！！！");
      return;
    }

    location.href = "searchList.html?key=" + content;
  });
});
