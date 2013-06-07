$(function() {
    if ($.cookie("hide-brand-hero"))
    {
    	$('#brand-hero').hide();
    }

    $('pre').not('.prettyprint').filter('[class^=brush]').addClass('prettyprint linenums');
    prettyPrint();

    $('div.note').not('.alert').addClass('alert alert-info');
    $('div.new').not('.alert').addClass('alert alert-block');
    //$('.image-caption').not('.well').addClass('well');

    $('#close-brand-hero').click(function() {
    	$('#brand-hero').slideUp('fast');
    	$.cookie("hide-brand-hero", true, { expires: 3650});
    })
});