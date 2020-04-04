
var csvfile = "./data/main.csv";
var url = "https://www.discogs.com/";
var start = 1955;
var now = new Date();
var end = now.getFullYear();

$(document).ready(function() {
  var str = "";
  str = "<li><a href='#headline'>top</a></li>";
  $(".link").append(str);

  // year
  for(y = start; y <= end; y++) {
    str = "<div class='page' id='"+y+"'>"+y+"</div>";
    $(".main_page").append(str);
    if(y % 5 == 0) {
      str = "<li><a href='#"+y+"'>"+y+"</a></li>";
      $(".link").append(str);
    }
  }

  // csv
  $.get(
    csvfile,
    readCsv,
    'text'
  );

  function readCsv(data) {
    var csv = $.csv.toArrays(data);
    var last_year = "";
    var counter = 0;
    $(csv).each(function(i) {
      if(this[0] != "") {
        if(last_year == "" || last_year != this[0]) {
          last_year = this[0];
          counter = 0;
        } else {
          counter++;
        }
        // album
        var insert = '';
        var domain = (this[2] && this[2].indexOf("http") != -1) ? "" : url;
        insert += "<a href='" + domain + this[2] + "' target='_blank'>";
        insert += "<div class='target target"+counter+" in album' id='"+this[1]+"'></div></a>";
        $("#"+this[0]).append(insert);
        // image
        var path = "./images/" + this[1] + ".jpg";
        $("#"+this[1]).css({backgroundImage : "url(" + path + ")"});
      }
    });

    ScrollReveal().reveal('.in', {
      duration: 1500,
      scale: 5,
      // reset: true
    });

    for(no = 1; no <= 10; no++) {
      ScrollReveal().reveal('.target'+no, {
        delay: 500 * no
      });
    };
  }
});
