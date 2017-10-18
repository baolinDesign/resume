var top250 = {
  init:function(){
    this.$element =$("#top250")
    this.bind()
    this.start()
  },
  bind:function(){
    var _this = this
    this.$element.scroll(function(){
      _this.render(data)
    })
  },
  start:function(){
    var _this =this
    this.getData(function(data){
      _this.render(data)
    })
  },
  getData:function(callback){

  },
  render: function(){

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