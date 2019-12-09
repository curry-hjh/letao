$(function() {
  var myChart = echarts.init(document.querySelector(".charts01"));
  // 后台返回的数据
  var info = {
    title: "2019年注册人数",
    list: [
      { month: "1月", count: 300 },
      { month: "2月", count: 400 },
      { month: "3月", count: 330 },
      { month: "4月", count: 500 },
      { month: "5月", count: 770 },
      { month: "6月", count: 900 },
      { month: "7月", count: 100 },
      { month: "8月", count: 200 },
      { month: "9月", count: 400 },
      { month: "10月", count: 300 },
      { month: "11月", count: 330 },
      { month: "12月", count: 46 }
    ]
  };
  var months = [];
  var counts = [];
  for (var i = 0; i < info.list.length; i++) {
    months.push(info.list[i].month);
    counts.push(info.list[i].count);
  }
  var option = {
    title: {
      text: info.title
    },
    tooltip: {},
    legend: {
      data: ["人数"]
    },
    xAxis: {
      data: months
    },
    yAxis: {},
    series: [
      {
        name: "人数",
        type: "bar",
        data: counts
      }
    ]
  };
  myChart.setOption(option);

  // 给销售数据
  var myChart2 = echarts.init(document.querySelector(".charts02"));

  var info2 = {
    title: "热门品牌销售",
    date: "2019年11月",
    list: [
      { brand: "阿迪达斯", count: 222 },
      { brand: "耐克", count: 333 },
      { brand: "新百伦", count: 444 },
      { brand: "特步", count: 543 },
      { brand: "李宁", count: 521 },
      { brand: "乔丹", count: 765 }
    ]
  };

  var arr1 = [];
  var arr2 = [];
  for (var i = 0; i < info2.list.length; i++) {
    arr1.push(info2.list[i].brand);
    arr2.push({
      name: info2.list[i].brand,
      value: info2.list[i].count
    });
  }

  var option2 = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      x: "right",
      data: arr1
    },
    series: [
      {
        name: "销售情况",
        type: "pie",
        radius: ["40%", "80%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: arr2
      }
    ]
  };
  myChart2.setOption(option2);
});
