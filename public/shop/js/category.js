$(function() {
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function(info) {
      $(".left ul").html(template("tpl", info));
      var id = info.rows[0].id;
      renderSecond(id);
    }
  });
  function renderSecond(id) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      success: function(info) {
        $(".right ul").html(template("tpl2", info));
      }
    });
  }

  $(".left ul").on("click", "li", function() {
    $(this)
      .addClass("now")
      .siblings()
      .removeClass("now");
    var id = $(this).data("id");
    renderSecond(id);
  });
});
