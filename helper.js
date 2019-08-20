function loadChapter(element, chapterName) {
    $('.tabcontent').not('#'+chapterName).hide();
    $('.tablink').not(element).removeClass('active');
    $('#'+chapterName).toggle();

    $(element).toggleClass('active');
}

function loadExercise(element, exerciseName) {
    $(".tablink.lvl2").removeClass('active');
    $(element).addClass('active');
}

$(document).ready(function() {
    $('.tabcontent').hide();
    $('.tablink').removeClass('active');
});