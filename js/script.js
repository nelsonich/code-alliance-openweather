$(function() {
	const KEY = "db5a3f6e3eaa2cc531f86939252c1576";
	const autocomplete = new google.maps.places.Autocomplete($("#address")[0], {});

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        console.log(place.address_components);
    });


    $('button#search').on('click', () => {
    	let value = $("#address").val();
    	
    	if (value === '') return;

    	$.ajax({
			url: `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${KEY}`,
			method: "GET",
			dataType: "json",
			success: function (response) {
				var data = response;
				
				$.ajax({
					url: `https://api.codealliance.loc/api/set`,
					method: "POST",
					data: {name: value},
					dataType: "json",
					success: function (response) {
						if (data) {
		                    $('.name').empty();
		                    $('.name').text(data.name);

		                    $('.temp').empty();
		                    $('.temp').text(data.main.temp);

		                    $('.main').empty();
		                    $('.main').text(data.weather[0].main);

		                    $('.desc').empty();
		                    $('.desc').text(data.weather[0].description);

		                    $('.icon').empty();
		                    let icon = $(`<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">`)
		                    $('.icon').append(icon);
		                }
					},
					error: function (err) {
						try {
		                    throw(err);
		                } catch (e) {
		                    console.log(e);
		                }
		                let dataEmpty = $('.data').children();
		                for (var i = 0; i < dataEmpty.length; i++) {
		                    $('td').eq(i).empty();
		                    $('td').eq(i).text('Empty Data!');
		                }
					}
		    	});
			},
			error: function (err) {
				console.log(err);
			}
    	});
    });
});