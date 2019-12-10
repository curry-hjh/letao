$(function() {
  mui('.mui-scroll-wrapper').scroll({
    // 不显示滚动条
    indicators: false
  });

  // 初始化轮播图
  mui('.mui-slider').slider({
    interval: 5000
  })
})