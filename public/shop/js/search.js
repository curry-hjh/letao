$(function() {
  var render = function() {
    var history = localStorage.getItem("history");
    var arr = JSON.parse(history) || [];
    // console.log(arr)
    $(".history").html(template("tpl", { rows: arr }));
  };
  render();
  $(".btn-search").on("click", function() {
    var content = $(".search input")
      .val()
      .trim();
    if (content.length === 0) {
      mui.toast("输入内容不能为空！！！");
      return;
    }
    var history = localStorage.getItem("history");
    var arr = JSON.parse(history) || [];
    var index = arr.indexOf(content);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    arr.unshift(content);
    localStorage.setItem("history", JSON.stringify(arr));
    $(".search input").val("");
    location.href = "searchList.html?key=" + content;
  });
  $(".history").on("click", ".btn-clear", function() {
    mui.confirm("你确定要清除记录吗？", function(e) {
      if (e.index === 1) {
        localStorage.removeItem("history");
        render();
      }
    });
  });
  $(".history").on("click", ".btn-delete", function() {
    var that = this;
    mui.confirm("你确定要删除本条记录吗？", function(e) {
      if (e.index === 1) {
        var index = $(that).data("index");
        var history = localStorage.getItem("history");
        var arr = JSON.parse(history) || [];
        arr.splice(index, 1);
        localStorage.setItem("history", JSON.stringify(arr));
        render();
      }
    });
  });
});
