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
    });

    $('#showArchivesOnPhone').click(function() {
        $('#showArchivesOnPhone').slideUp('fast');
        $('#hidden-phone-sidebar').hide();
        $('#hidden-phone-sidebar').removeClass('hidden-phone');
        $('#hidden-phone-sidebar').slideDown('fast');
    });

    $(function () {
        $('#container').find('[rel="tooltip"], [rel^="tooltip "], [rel$=" tooltip"]').tooltip();
    });

    $('.fancybox').fancybox({
        beforeShow : function() {
            var alt = this.element.find('img').attr('alt');
            
            this.inner.find('img').attr('alt', alt);
            
            this.title = alt;
        }
    });
});

/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
var disqus_shortname = 'chrisbenard'; // required: replace example with your forum shortname

/* * * DON'T EDIT BELOW THIS LINE * * */
(function () {
    var s = document.createElement('script'); s.async = true;
    s.type = 'text/javascript';
    s.src = '//' + disqus_shortname + '.disqus.com/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
}());