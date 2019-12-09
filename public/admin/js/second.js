$(function() {
  var page = 1;
  var pageSize = 5;
  // 发送ajax请求获取二级分类数据
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info);
        $("tbody").html(template("tpl", info));

        // 分页功能
        $("#page").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function() {
            // 修改当前页
            page = arguments[3];
            // 重新渲染
            render();
          }
        });
      }
    });
  }
  render();

  // 二级分类添加功能
  $(".btn-add").on("click", function() {
    // console.log('haha ')
    //  显示模态框
    $(".addModal").modal("show");
    // 发送请求，获取到所有的一级分类
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 1000
      },
      success: function(info) {
        console.log(info);
        $(".dropdown-menu").html(template("tpl2", info));
      }
    });
  });

  // 一级分类的选择功能
  // 给所有的一级分类注册点击事件
  $(".dropdown-menu").on("click", "a", function() {
    // 获取到点击的a的内容
    var content = $(this).text();
    // 设置给按钮的内容
    $(".text").text(content);
    var id = $(this).data("id");
    $("[name=categoryId]").val(id);
    // 手动把校验改成成功
    $("form")
      .data("bootstrapValidator")
      .updateStatus("categoryId", "VALID");
  });

  // 图片异步上传功能
  $("#file").fileupload({
    // 当图片上传完成，就会执行done
    done: function(e, data) {
      // 通过data.result获取到服务器返回的数据
      var info = data.result;
      // 把图片显示出来
      $(".brandLogo").attr("src", info.picAddr);
      // 把图片地址给brandLogo
      $("[name=brandLogo]").val(info.picAddr);
      $("form")
        .data("bootstrapValidator")
        .updateStatus("brandLogo", "VALID");
    }
  });

  // $('#file').on('change', function() {
  //   var fd = new FormData()
  //   fd.append('pic1', this.files[0])
  //   $.ajax({
  //     type: 'post',
  //     url: '/category/addSecondCategoryPic',
  //     data: fd,
  //     // 使用formData不需要设置content-type
  //     contentType: false,
  //     processData: false,
  //     success: function(info) {
  //       console.log(info)
  //     }
  //   })
  //   var xhr = new XMLHttpRequest()
  //   xhr.open('post', '/category/addSecondCategoryPic'),
  //   xhr.send(fd)
  //   xhr.onload = function() {
  //     if (xhr.status === 200) {
  //       console.log(xhr.responseText)
  //     }
  //   }
  //   $('#file').fileupload({
  //     done: function() {
  //       console.log('哈哈哈')
  //     }
  //   })

  // })

  // 表单的校验功能
  $("form").bootstrapValidator({
    // 用户指定插件不校验的内容,所有的内容都要校验
    excluded: [],
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入品牌的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传品牌的LOGO"
          }
        }
      }
    }
  });

  // 当表单校验成功的时候，发送ajax请求
  $("form").on("success.form.bv", function(e) {
    e.preventDefault();

    // 发送ajax请求
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("form").serialize(),
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 隐藏模态框
          $(".addModal").modal("hide");
          // 重置表单表单
          $("form")
            .data("bootstrapValidator")
            .resetForm(true);
          // 重新渲染
          page = 1;
          render();
          // 手动恢复图片和按钮的值
          $(".brandLogo").attr("src", "images/none.png");
          $(".text").text("请选择一级分类");
        }
      }
    });
  });
});
