$(function() {
  // 列表渲染功能+分页功能
  var page = 1;
  var pageSize = 5;
  // 存放上传的图片的结果
  var arr = [];

  var render = function() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info);
        $("tbody").html(template("tpl", info));

        $("#page").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function() {
            page = arguments[3];
            render();
          }
        });
      }
    });
  };
  render();

  // 添加功能
  $(".btn-add").on("click", function() {
    console.log("哈哈");
    $(".addModal").modal("show");
    // 发送ajax请求，加载二级分类数据
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
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

  // 二级分类的选择功能
  $(".dropdown-menu").on("click", "a", function() {
    console.log("hah");
    $(".text").text($(this).text());
    $("[name=brandId]").val($(this).data("id"));

    // 手动让表单校验成功
    $("form")
      .data("bootstrapValidator")
      .updateStatus("brandId", "VALID");
  });

  // 图片的上传功能
  $("#file").fileupload({
    done: function(e, data) {
      // 上传图片成功
      var result = data.result;
      console.log(result);
      // 把图片先显示出来
      // $('.brandLogo').attr('src', result.picAddr)
      // $('.img_box').append
      $(
        '<img src="' +
          result.picAddr +
          '" class="brandLogo" width="100"  height="100" alt="">'
      ).appendTo(".img_box");

      // 表单序列化的时候，还需要获取到图片的地址
      arr.push(data.result);
      // 把arr数组转成json字符串，给picArr当成值

      // 不能直接手动改成通过，必须图片有3张才通过
      if (arr.length >= 3) {
        // 只有当上传了3张以上的图片了，才把值给picArr
        $("[name=picArr]").val(JSON.stringify(arr));
        $("form")
          .data("bootstrapValidator")
          .updateStatus("picArr", "VALID");
      }
    }
  });

  // 表单校验
  $("form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          // 要求库存范围： 1-99999的数字
          regexp: {
            regexp: /^[1-9]\d{0,4}$/,
            message: "库存范围是1-99999之间"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          // 要求库存范围： xx-xx
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入正确的尺码格式：比如32-42"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picArr: {
        validators: {
          notEmpty: {
            message: "请至少上传3张图片"
          }
        }
      }
    }
  });

  // 给表单注册校验成功事件
  $("form").on("success.form.bv", function(e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: $("form").serialize(),
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 隐藏模态框
          $(".addModal").modal("hide");
          // 重置表单
          $("form")
            .data("bootstrapValidator")
            .resetForm(true);
          // 重新渲染第一页n
          page = 1;
          render();

          // 手动重置
          $(".text").text("请选择二级分类");
          $(".img_box img").remove();
          arr = [];
        }
      }
    });
  });
});
