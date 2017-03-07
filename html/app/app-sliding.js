var
    titleShowing = false;

    refreshTimer = null;                    // Refresh Timer, used to refresh/reload the HTML pages to keep them up-to-date
    refreshTime = 10 * 60000;               // Refresh timer time out xx * 1 minute



function loadHtmlPages() {
    viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', $('#aspect').val());

}

function showTitle(flag) {

    if ((flag == true) && (titleShowing == false))
    {
        $("#title_info").show();

        $("#pages_data").show();

        titleShowing = true;
    }
    else if (flag == false)
    {
        $("#title_info").hide();

        $("#pages_data").hide();
        titleShowing = false;
    }
}


// Specify a function to execute when the DOM is fully loaded
// Also known as the jQuery .ready() handler
$(function () {

    var refreshMsg = "InfoDisplay started at: " + new Date().toLocaleString();
    console.log(refreshMsg);
	
	var host = location.hostname;
	var origin = location.origin;
	var href = location.href;

	var logMsg = "Origin=" + origin + " href= " + href;
  	console.log(logMsg);
	
    // First page title
    var title_info1 = "<h1 class='text-center'>" + origin + "</h1>";
    $(title_info1).appendTo("#title_info");
    var title_info2 = "<h2 class='text-center'>is under construction...</h2>";
    $(title_info2).appendTo("#title_info");
	
	showTitle(true);
});



// Assure full screen.
$(window).resize(function () {
    $('.tabs, .tabs .tab').height($(window).height()).width($(window).width());
    $('.tabs').height($(window).height()).width($(window).width());
});


$(window).keyup(function (e) {

    // Esc-pressed ?
    if (e.keyCode == 27) {
        clearTimeout(timer);
        clearTimeout(refreshTimer);
        if( $('body').hasClass('active') ){
            if (timer) clearInterval(timer);
            if (refreshTimer) clearInterval(refreshTimer);
            $('body').removeClass('active');
            $('.tabs').empty();
        }

        showTitle(true);
    }
    // '+' pressed ?
    else if ((e.keyCode == 43) || (e.keyCode == 187) )
    {
        clearTimeout(timer);
        nextTabpage();

    }
});
