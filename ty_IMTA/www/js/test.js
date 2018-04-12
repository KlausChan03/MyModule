var mySwiper = new Swiper("#bannerSwiper", {
  mode: "horizontal",
  loop: true,
  autoplay: 5000,
  pagination: "#bannerpagination",
  paginationClickable: true,
  grabCursor: true
});

$(".arrow-left").on("click", function(e) {
  e.preventDefault();
  mySwiper.swipePrev();
});
$(".arrow-right").on("click", function(e) {
  e.preventDefault();
  mySwiper.swipeNext();
});
function lazyLoadDemos() {
  $(".phone-box").each(function() {
    var frameHolder = $(this);
    if (frameHolder.hasClass("loaded")) return;
    var frame = frameHolder.find("iframe");
    var src = frame.attr("data-src");
    if (
      frameHolder.offset().top <
      $(window).scrollTop() + $(window).height() + 50
    ) {
      frameHolder.addClass("loaded");
      frame.attr("src", src);
    }
  });
}
if ($(".phone-box").length > 0) {
  $(".phone-box").each(function() {
    var t = $(this);
    var demoFile = t.find("iframe").attr("data-src");
  });
  $(window).on("scroll resize", function() {
    lazyLoadDemos();
  });
  lazyLoadDemos();
}
