function loadChapter(element, chapterName) {
    $('.tabcontent').hide();
    $('.tablink').removeClass('active');
    $('#'+chapterName).show();

    $(element).addClass('active');
}



$(document).ready(function() {
    $('.tabcontent').hide();
    $('.tablink').removeClass('active');
});