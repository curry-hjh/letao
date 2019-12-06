$(function() {
  // 登录功能
  // 1. 表单的校验,让表单进行校验
  var $form = $('form')
  $form.bootstrapValidator({
    // 字段，用于指定每个字段的校验规则， 对应的表单中每个文本框的name属性
    fields: {
      // 用户名的校验规则
      username: {
        // 用户名的校验规则可以有很多个
        validators: {
          // 非空的规则
          notEmpty: {
            // 提示消息
            message: '用户名不能为空'
          },
          // 判断长度
          stringLength: {
            min: 3,
            max: 12,
            message: '用户名长度必须是3-12位'
          },
          // 没有任何的规则
          callback: {
            message: '用户名错误'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '用户密码长度必须是6-12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    },
    // 用于指定校验的反馈图标
    feedbackIcons: {
      // 校验通过的图标
      valid: 'glyphicon glyphicon-thumbs-up',
      // 校验失败的图标
      invalid: 'glyphicon glyphicon-thumbs-down',
      // 正在校验的图标
      validating: 'glyphicon glyphicon-refresh'
    },
  })


  // 2. 表单的重置功能
  $('.btn-reset').on('click', function() {
    // 重置表单的样式
    $form.data('bootstrapValidator').resetForm(true)
  })

  $(".btn-login").on("click", function(e) {

  });
 


  $form.on('success.form.bv', function (e) {
    // 表单校验成功的时候，阻止表单的默认行为
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $form.serialize(),
      success: function (info) {
        if (info.success) {
          // 登录成功
          location.href = 'index.html'
        } else if (info.error === 1000) {
          $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
        } else {
          $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
        }
      },
     
    })
  })
})