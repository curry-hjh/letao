$(function() {
  // 1. 发送ajax请求，获取购物车的数据
  function render() {
    $.ajax({
      type: 'get',
      url: '/cart/queryCart',
      success: function(info) {
        console.log(info)
        if (info.error) {
          location.href = 'login.html?from='+location.href
        }

        // 说明已经登录
        $('#OA_task_1').html(template('tpl', {rows: info}))
      }
    }) 
  }
  render()

  // 删除的思路：
  // 1. 给删除按钮注册点击事件（委托）
  // 2. 给一个警告框
  // 3. 获取到id值
  // 4. 发送ajax请求，进行删除
  // 5. 重新渲染
  $('#OA_task_1').on('click', '.btn-delete', function() {
    var id = $(this).data('id')
    mui.confirm('你确定要删除这件商品吗?', '提示' ,['确定', '取消'], function(e) {
      if (e.index === 0) {
        // 发送ajax请求
        $.ajax({
          type: 'get',
          url: '/cart/deleteCart',
          data: {
            id: [id]
          },
          success: function(info) {
            render()
          }
        })
      }
    })
  })
})