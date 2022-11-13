

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
