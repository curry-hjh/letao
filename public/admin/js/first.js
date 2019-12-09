$(function() {
  var page = 1;
  var pageSize = 5;
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info)
        $('tbody').html(template('tpl', info))

        // 分页
        $('#page').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: page,
          // 总页数
          totalPages: Math.ceil(info.total/info.size),
          // 当按钮被点击的时候触发
          onPageClicked: function(a,b,c,d) {
            page = d
            // 重新渲染
            render()
          }
        });
      }
    })
  }
  render()


  // 添加一级分类
  // 1. 给添加按钮注册点击事件
  // 2. 显示模态框
  $('.btn-add').on('click', function() {
    $('.addModal').modal('show')
  })


  // 表单校验功能
  $('form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 校验分类名字
      categoryName: {
        validators: {
          notEmpty: {
            message: '分类名称不能为空'
          }
        }
      }
    }
  })

  // 给表单注册校验成功事件，发送ajax请求
  $('form').on('success.form.bv', function(e) {
    e.preventDefault()
    // 发送ajax请求，添加一级分类
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: {
        categoryName: $('[name=categoryName]').val()
      },
      success: function(info) {
        // console.log(info)
        if (info.success) {
          // 隐藏模态框
          $('.addModal').modal('hide')
          // 重置表单的校验
          $('form').data('bootstrapValidator').resetForm(true)
          // 重新渲染 第一页，保证能够看到新增加的数据
          page = 1
          render()
        }
      }
    })
  })
})