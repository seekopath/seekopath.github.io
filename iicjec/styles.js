$("body").append(
    '<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>'
    );
    $(window).on("load", function () {
    setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });
    function removeLoader() {
    $("#loadingDiv").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
    });
    document.getElementById("main").style.display = "block";
    }
function openSideBar(){
    document.getElementById("sidebar").style.transform = "translateX(0%)";
}

function closeSideBar(){
    document.getElementById("sidebar").style.transform = "translateX(-200%)";
    document.getElementById("main").style.display = "block";
}