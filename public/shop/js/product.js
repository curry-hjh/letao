$(function() {
  // 1. 获取到地址栏中的id值
  // 2. 发送ajax请求
  // 3. 结合模版引擎进行渲染
  var id = location.search.split('=')[1]
  console.log(id)
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    success: function(info) {
      var sizeArr = []
      var temp = info.size.split('-')
      for(var i = +temp[0]; i <= temp[1]; i++) {
        sizeArr.push(i)
      }
      info.sizeArr = sizeArr
      // console.log(info)
      $('.mui-scroll').html(template('tpl', info))
      // 需要手动初始化轮播图，因为这个轮播图是动态渲染
      mui('.mui-slider').slider({
        interval: 5000
      })
      // 手动初始化numbox
      mui('.mui-numbox').numbox()
      
    }
  })
  $('.mui-scroll').on('click', '.size span', function() {
    $(this).addClass('now').siblings().removeClass('now')
  })


  // 加入购物车功能
  $('.btn-add').on('click', function() {
    var num = $('.mui-numbox-input').val()
    var size = $('.now').text()
    if (!size) {
      mui.toast('请选择尺码')
      return
    }

    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: id,
        num: num,
        size: size
      },
      success: function (info) {
        // 有可能添加失败，因为没有登录
        if (info.error) {
          // 跳转到登录页面
          location.href = 'login.html?from=' + location.href
        }
        if (info.success) {
          mui.confirm('恭喜你，加入购物车成功', '温馨提示', ['去购物车', '继续逛逛'], function(e) {
            if (e.index === 0) {
              location.href = 'cart.html'
            }
          })
        }
      }
    })
  })



  
})