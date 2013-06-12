$(function () {
	$('#searchBox').watermark('Search my site here').focus();
})

$('#siteSearchForm').submit(function(e) {
	e.preventDefault();

	$('#lastSearch').val($('#searchBox').val());
	$('#pageNumber').val('1');

	doSearch();
});

$('.search-results-footer li.next a').click(function(e) {
	e.preventDefault();

	if (!$(e.target).parent().hasClass('disabled')) {
		$('#pageNumber').val(parseInt($('#pageNumber').val()) + 1);
		doSearch();
	}
})

$('.search-results-footer li.previous a').click(function(e) {
	e.preventDefault();

	if (!$(e.target).parent().hasClass('disabled')) {
		$('#pageNumber').val(parseInt($('#pageNumber').val()) - 1);
		doSearch();
	}
})

function beginLoadResults()
{
	$('.search-results-repeater').children().not('.template').remove();
	$('.search-results-footer').hide();
	window.scrollTo(0, 0);

	if ($('.search-results').is(':hidden')) {
		$('.search-results').hide();
		$('.search-results').removeClass('hidden');
		$('.search-results').slideDown('fast');
	}

	$('.search-results .search-error').addClass('displaynone');
	$('.search-results .search-loading').removeClass('displaynone');

	var historyUrl = '?query=' + encodeURIComponent($('#lastSearch').val());
	if (parseInt($('#pageNumber').val(), 10) > 1) {
		historyUrl += '&page=' + encodeURIComponent($('#pageNumber').val());
	}

	Hash.go(historyUrl);
}

function doSearch() {
	if (!$('#lastSearch').val() || !$('#lastSearch').val().trim()) {
		$('#searchBox').focus();
		$('#searchBox').val('');
		$('#searchBox').effect('highlight', { speed: 'slow', color: '#FFC9C9' });
		return;
	}

	beginLoadResults();

	$.bingSearch({
		urlBase: '../searchproxy.php',
		pageNumber: parseInt($('#pageNumber').val()),
		limitToSite: 'chrisbenard.net',
		query: $('#lastSearch').val(),
		debug: false,
		beforeSearchResults: function(data) {
			$('.search-results .search-loading').addClass('displaynone');
			
			if (data.hasMore || $('#pageNumber').val() > 1) {
				$('.search-results-footer .pagination').show();
				$('.search-results-footer .end').hide();
			}
			else {
				$('.search-results-footer .end').show();
				$('.search-results-footer .pagination').hide();
			}

			$('.search-results-footer').show();
		},
		searchResultIterator: function(data) {
			var instance = $('.search-results-repeater .template').clone();
			$(instance).removeClass('template');

			var link = $(instance).find('.search-result-title a');
			var displayLink = $(instance).find('.search-result-displayurl a');
			var description = $(instance).find('.search-result-description');
			var displayurl = $(instance).find('.search-result-displayurl');

			$(link).attr('href', data.Url);
			$(link).text(data.Title);

			$(displayLink).attr('href', data.Url);
			$(displayLink).text(data.DisplayUrl);

			$(description).text(data.Description);

			$('.search-results-repeater').append(instance);
		},
		afterSearchResults: function(data) {
			var prev = $('.search-results-footer li.previous');
			var next = $('.search-results-footer li.next');
			var page = parseInt($('#pageNumber').val());

			if (prev.hasClass('disabled') && page > 1)
				prev.removeClass('disabled');
			else if (page == 1)
				prev.addClass('disabled');

			if (next.hasClass('disabled') && data.hasMore)
				next.removeClass('disabled');
			else if (!data.hasMore)
				next.addClass('disabled');

			$('.search-results .search-loading').addClass('displaynone');
		},
		fail: function(data) {
			$('.search-results .search-loading').addClass('displaynone');
			$('.search-results .error-message').text(data);
			$('.search-results .search-error').removeClass('displaynone');
		}
	});
}

Hash.on('\\?query\\=([^&]+)(&page\\=([0-9]+))?$', function(path, parts) {
	if (parts && parts instanceof Array && 1 < parts.length && parts[1]
		&& decodeURIComponent(parts[1]) != $('#lastSearch').val())
	{
		$('#lastSearch').val(decodeURIComponent(parts[1]));
		var pageNumber = 1;
		if (3 < parts.length && !isNaN(parts[3]))
		{
			pageNumber = decodeURIComponent(parts[3]);
		}

		doSearch();
	}
});