console.log(total_trend);

// Graph scripts here
var graphData = [{
		// Watch purchases
		data: total_trend,
		color: '#5cb85c',
        points: { radius: 10, fillColor: '#5cb85c' }
	}, {
		// Clock purchases
		data: clock_trend,
		color: '#5bc0de',
		points: { radius: 10, fillColor: '#5bc0de' }
 }];

// Line graph settings
$.plot($('#graph-lines'), graphData, {
	series: {
        points: {
            show: true,
            radius: 10
        },
        lines: {
            show: true
        },
        shadowSize: 0
    },
    grid: {
        color: 'transparent',
        borderColor: 'transparent',
        borderWidth: 20,
        hoverable: true
    },
    xaxis: {
        tickColor: 'transparent',
        tickDecimals: 0
    },
    yaxis: {
        tickSize: 100
    }
});

// Bar graph settings
$.plot($('#graph-bars'), graphData, {
    series: {
        bars: {
            show: true,
            barWidth: .9,
            align: 'center'
        },
        shadowSize: 0
    },
    grid: {
        color: 'transparent',
        borderColor: 'transparent',
        borderWidth: 20,
        hoverable: true
    },
    xaxis: {
        tickColor: 'transparent'
    },
    yaxis: {
        tickSize: 100
    }
});

$('#graph-bars').hide();

$('#lines').on('click', function (e) {
    $('#bars').removeClass('active');
    $('#graph-bars').fadeOut();
    $(this).addClass('active');
    $('#graph-lines').fadeIn();
    e.preventDefault();
});
 
$('#bars').on('click', function (e) {
    $('#lines').removeClass('active');
    $('#graph-lines').fadeOut();
    $(this).addClass('active');
    $('#graph-bars').fadeIn().removeClass('hidden');
    e.preventDefault();
});

