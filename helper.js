function loadChapter(element, chapterName) {
    $('.tabcontent').not('#'+chapterName).hide();
    $('#'+chapterName).toggle();

    $(element).toggleClass('active');
}

$(document).ready(function() {
    $('.tabcontent').hide();
});