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
				console.log(response.weather[0]);
			},
			error: function (err) {
				console.log(err);
			}
    	});
    });
});