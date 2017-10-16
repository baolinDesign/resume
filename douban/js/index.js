$("footer>div").click(function(){
  var index = $(this).index();
  $("section").eq(index).fadeIn().siblings().hide();
  $(this).addClass("active").siblings().removeClass("active");
})

$.ajax({
  url:"http://api.douban.com/v2/movie/top250",
  type: "GET",
  data:{
    start:0,
    count: 20
  },
  dataType:"jsonp"
}).done(function(ret){
  console.log(ret)
  setData(ret)
}).fail(function(){
  console.log("error ...")
})

function setData(data){
  data.subjects.forEach(function(movie) {
    var tpl ='<div class="item">\
    <a href="#">\
      <div class="cover">\
        <img src="http://img7.doubanio.com/view/movie_poster_cover/spst/public/p480747492.jpg" alt="">\
      </div>\
      <div class="detail">\
        <h2>霸王别姬</h2>\
        <div class="extra">\
          <span class="score">9.3分</span>\
          /<span class="collect"></span>收藏\
        </div>\
        <div class="extra"><span class="year"></span> / 剧情、爱情</div>\
        <div class="extra">导演：张艺谋</div>\
        <div class="extra">主演：副科级</div>\
      </div>\
    </a>\
  </div>'
  var $node = $(tpl)
  $node.find(".cover img").attr("src",movie.images.small)

  $node.find(".detail h2").text(movie.title)
  $node.find(".score").text(movie.rating.average)
  $node.find(".collect").text(movie.collect_count)
  $node.find(".year").text(movie.year)

  $("section").eq(0).append($node)
  })
}