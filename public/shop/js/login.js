$(function() {
  // 1. 给登录按钮注册点击事件
  // 2. 获取到用户名和密码
  // 3. 表单校验
  // 4. 发送ajax请求，进行登录
  $('.btn-login').on('click', function() {
    var username = $('[name=username]').val()
    if (!username) {
      mui.toast('用户名不能为空')
      return
    }
    var password = $('[name=password]').val()
    if (!password) {
      mui.toast('密码不能为空')
      return
    }

    $.ajax({
      type: 'post',
      url: '/user/login',
      data: $('form').serialize(),
      success: function(info) {
        console.log(info)
        if (info.success) {
          // 登录成功，怎么办？？？？？？
          // history.go(-1)
          // 判断是否有from，如果有，跳回到from的页面，如果没有from,跳转到首页
          if (location.search.indexOf('?from') !== -1) {
            // 需要往回跳
            location.href = location.search.replace('?from=', '')
          } else {
            location.href = 'index.html'
          }
        } else {
          mui.toast('用户名或者密码错误')
        }
      }
    })
  })
  
})

// 支付宝支付 from