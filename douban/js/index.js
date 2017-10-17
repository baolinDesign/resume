$("footer>div").click(function(){
  var index = $(this).index();
  $("section").eq(index).fadeIn().siblings().hide();
  $(this).addClass("active").siblings().removeClass("active");
})

var index = 0
var isLoading = false;


start()
function start(){
  if(isLoading) return
  isLoading = true
  $(".loading").show();
  $.ajax({
    url:"http://api.douban.com/v2/movie/top250",
    type: "GET",
    data:{
      start:index,
      count: 20
    },
    dataType:"jsonp"
  }).done(function(ret){
    console.log(ret)
    setData(ret)
    index += 20
  }).fail(function(){
    console.log("error ...")
  }).always(function(){
    isLoading = false
    $(".loading").hide()
  })
  
}

var clock
$("main").scroll(function(){
  if(clock){
    clearTimeout(clock)
  }
  clock = setTimeout(function(){
    if($("section").eq(0).height()-10  <= $("main").scrollTop() + $("main").height()){
       start()
     }
  },300)
  
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
        <div class="extra"><span class="year"></span> /<span class="type"></span></div>\
        <div class="extra">导演：<span class="director"></span></div>\
        <div class="extra">主演：<span class="actor"></span></div>\
      </div>\
    </a>\
  </div>'
  var $node = $(tpl)
  $node.find(".cover img").attr("src",movie.images.small)

  $node.find(".detail h2").text(movie.title)
  $node.find(".score").text(movie.rating.average)
  $node.find(".collect").text(movie.collect_count)
  $node.find(".year").text(movie.year)
  $node.find(".type").text(movie.genres.join("、"))
  $node.find(".director").text(function(){
    var dirArr = []
    movie.directors.forEach(function(e){
      dirArr.push(e.name)
    })
    return dirArr.join("、")
  })
  $node.find(".actor").text(function(){
    var actArr = []
    movie.casts.forEach(function(e){
      actArr.push(e.name)
    })
    return actArr.join("、")
  })

  $("#top250").append($node)
  })
}