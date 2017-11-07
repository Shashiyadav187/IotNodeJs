$(document).ready(function() {
  function fixup(wrap) {
    var $wrap = $(wrap);
    var $parent = $wrap.parent();
    
    $wrap.width($parent.width());
    $wrap.height($parent.height());

    return {width:$parent.width(),height:$parent.height()};
  }



  var spec = {
    padding: {top: 10, left: 50, bottom: 20, right: 10},
    
    
    data:[
    {name:"values"}
    ],
    
    scales:[
    {name:"x",range:"width",domain:[0,29]},
    {name:"y",range:"height",nice:true,domain:{data:"values",field:"data"}},
    ],
    
    axes:[
    {type:"x",scale:"x"},
    {type:"y",scale:"y"}
    ],
    
    marks:[{
      type:"rect",
      from:{data:"values"},
      properties:{
        enter:{
          fill:{value:"#ccc"},
          stroke:{value:"#aaa"}
        },
        update:{
          x:{scale:"x",field:"index"},
          y:{scale:"y",field:"data"},
          y2:{scale:"y",value:0},
          width:{scale:"x",value:1}
        }
      }
    }]
  };

  vg.parse.spec(spec,function(chart) {
    
    $('*[data-counter-bar4]').each(function(i,elt) {
      var dim = fixup(elt)
      var name = $(elt).attr("data-counter-bar4");
      
      var view = chart({el:elt})
      .renderer("svg")
      .width(dim.width-60)
      .height(dim.height-30)
      ;
      var values = [];
      var dataLen   = 30;
      var x      = 0;
      $(document).on('data:'+name,function(event,data) {
        values.push(data);
        if(values.length >= dataLen) values.shift();
        view.data({values:values}).update();
      });  
    });
    
    
  });

  
});

