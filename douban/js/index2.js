var top250 = {
  init:function(){
    this.$element =$("#top250")
    this.isLoading = false
    this.index = 0
    this.isFinish = false

    this.bind()
    this.start()
  },
  bind:function(){
    var _this = this
    this.$element.scroll(function(){
      _this.start()
    })
  },
  start:function(){
    var _this =this
    this.getData(function(data){
      _this.render(data)
    })
  },
  getData:function(callback){
    var _this = this
    if(_this.isLoading) return;
   
    _this.isLoading = true
    _this.$element.find(".loading").show()
    $.ajax({
      url: "http://api.douban.com/v2/movie/top250",
      data: {
        start: _this.index || 0
      },
      dataType: "jsonp"
    }).done(function(ret){
      console.log(ret)
      _this.index += 20
      if(_this.index >= ret.total){
        _this.isFinish = true
      }
      callback&&callback(ret)
    }).fail(function(){
      console.log("数据异常")
    }).always(function(){
      _this.isLoading = false
      _this.$element.find(".loading").hide()
    })
  },
  render: function(data){
    var _this = this
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
      _this.$element.find(".container").append($node)
    })
    
  },
  isToBottom: function(){
    alert(1)
    return this.$element.find(".container") <= this.$element.height() + this.$element.scrollTop() +10
  }
}

var usBox = {
  init:function(){
    console.log("usBox ok")
  },
  bind:function(){

  },
  star:function(){

  }
}

var search = {
  init:function(){
    console.log("search ok")
  },
  bind:function(){

  },
  star:function(){

  }
}

var app = {
  init:function(){
    this.$tabs = $("footer>div")
    this.$panels=$("section")
    this.bind()
    top250.init()
    usBox.init()
    search.init()
  },
  bind:function(){
    var _this = this
    this.$tabs.on("click",function(){
      $(this).addClass("active").siblings().removeClass("active")
      _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
    })
  }
}


app.init()