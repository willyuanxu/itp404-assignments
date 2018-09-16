let usc = new google.maps.LatLng(34.04514, -118.266210);
let map = new google.maps.Map(document.getElementById('map'), {
	center: usc,
	zoom: 5
});

let buildMap = function(lat, lng){
	let myLocation = google.maps.LatLng(parseFloat(lat), parseFloat(lng));

	map.setCenter(myLocation);
	
	let latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};

	let geocoder = new google.maps.Geocoder;



	geocoder.geocode({'location': latlng}, function(results, status){
		if (status === 'OK'){
			if (results[0]){

				map.setZoom(12);
				map.setCenter(latlng);
				var image = 'https://www.gravatar.com/avatar/1c31a96c0a474a6795637081bde42acc.png';

				
				var marker = new google.maps.Marker({
					position: latlng,
					map: map,
					animation: google.maps.Animation.DROP,
					icon: image
				});

				let infoWindow = new google.maps.InfoWindow({
					position: latlng,
					content: results[0].formatted_address
				});



				google.maps.event.addListener(marker, 'click', function(){
					infoWindow.open(map);
				});
			} else {
				window.alert('No results found');
			}
			
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});

}

navigator.geolocation.getCurrentPosition(function(position){
	
	buildMap(position.coords.latitude, position.coords.longitude);
});
