

function getpagelist(totalpages, page, mlength) {
  function range(start, end) {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  }

  var sidewidth = mlength < 9 ? 1 : 2;
  var leftwidth = (mlength - sidewidth * 2 - 3) >> 1;
  var rightwidth = (mlength - sidewidth * 2 - 3) >> 1;

  if (totalpages <= mlength) {
    return range(1, totalpages);
  }
    if(page<= mlength - sidewidth - 1 - rightwidth){
      return range(1, mlength-sidewidth-1).concat(0, range(totalpages-sidewidth+1, totalpages));
    }

  if (page >= totalpages - sidewidth - 1 - rightwidth) {
    return range(1, sidewidth).concat(0, range(totalpages - sidewidth - 1 - rightwidth - leftwidth, totalpages));
  }

  return range(1, sidewidth).concat(0, range(page - leftwidth, page + rightwidth), 0, range(totalpages - sidewidth + 1, totalpages));

};

$(function () {
  var n = $(".card-content .card").length;
  var perpage = 10;
  var totalpages = Math.ceil(n / perpage);
  var paginationsize = 7;
  var current;

  function showpage(curpage) {
    if (curpage < 1 || curpage > totalpages) return false;

    current = curpage;

    $(".card-content .card").hide().slice((current - 1) * perpage, current * perpage).show();

    $(".pagination li").slice(1, -1).remove();

    getpagelist(totalpages, current, paginationsize).forEach(item => {
      $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots").toggleClass("active", item === current).append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
    });

    $(".previous-page").toggleClass("disable", current === 1);
    $(".next-page").toggleClass("disable", current === totalpages);
    return true;
  }

  $(".pagination").append(
    $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("<")),
    $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text(">"))
  );

  $(".card-content").show();
  showpage(1);

  $(document).on("click", ".pagination li.current-page:not(.active)", function () {
    return showpage(+$(this).text());
  });

  $(".next-page").on("click", function () {
    return showpage(current + 1);
  });

  $(".previous-page").on("click", function () {
    return showpage(current - 1);
  });

});


filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}

function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

 

$(document).ready(function() {
  $("Select").on('change', function() {
      $(this).find("option:selected").each(function() {
        var d = $(this).attr("value"); 
        if(d){
          $(".box").not("." + d).hide();
          $("." + d).show();
        } else{
          $(".box").hide();
        }
      });
  }).change();
});