$(function() {
  // 发送ajax请求，获取用户的数据
  // 当前
  var page = 1;
  // 每页的条数
  var pageSize = 6;

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info);
        $("tbody").html(template("tpl", info));

        // 渲染分页
        // 需要指定参数
        $("#page").bootstrapPaginator({
          // 指定bootstrap的版本，如果是3版本必须指定
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 当分页的按钮被点击的时候，会触发的事件, 关注第四个参数： 第几页
          onPageClicked: function(a, b, c, d) {
            page = arguments[3];
            render();
          }
        });
      }
    });
  }

  render();

  // 启用和禁用功能
  // 1. 给启用或者禁用按钮注册点击（委托）
  // 2. 显示模态框
  var id, isDelete;
  $("tbody").on("click", ".btn", function() {
    $(".userModal").modal("show");
    id = $(this).data("id");
    // 如果点的是启用按钮，那么值是1  否则是0
    isDelete = $(this).hasClass("btn-success") ? 1 : 0;
  });

  $(".btn-change").on("click", function() {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 隐藏模态框
          $(".userModal").modal("hide");
          // 重新渲染
          render();
        }
      }
    });
  });
});
