window.onload = function(){
	initMap()
	initHospital()
}

function initMap(){
	var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var labelIndex = 0;
	var hospitals = initHospital();
	var icon = {
		url: "img/hospital_icon.svg",
		anchor: new google.maps.Point(35,50),
		scaledsize: new google.maps.Size(70,70)
	}
	var availableHospitals = [];
	var infoWindow;
	var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 12
        });
	infoWindow = new google.maps.InfoWindow;

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			hospitals.forEach(function(v,i){
				if (distanceCalculator(lat, lng, v.lat, v.lng) < 5){
					availableHospitals.push(v);
				}
			});

			var marker;
			availableHospitals.forEach(function(v,i){
				console.log(v)
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(v.lat,v.lng),
					label: labels[labelIndex++ % labels.length],
					map: map,
					// icon: icon,
					title: v.name
				});

				google.maps.event.addListener(marker, 'click', (function(marker,i){
					return function(){
						var content = '<div>' + v.name + '</div>' + '<div><b>Address</b>: ' + v.address + '</div>'
						infoWindow.setContent(content);
						infoWindow.open(map, marker);
					}
				})(marker,i))
			})

			marker = new google.maps.Marker({
				position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
				map: map
			});
			infoWindow.setPosition(pos);
			// infoWindow.open(map);
			map.setCenter(pos);
			updateUI(availableHospitals, map);
		},function(){
			handleLocationError(false, infoWindow, map.getCenter());
		});
	} else{
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function updateUI(availableHospitals, map){
	availableHospitals.forEach(function(v,i){
		var link = document.createElement("a");
		var node = document.createTextNode(v.name);
		link.appendChild(node);
		link.setAttribute("class","list-group-item list-group-item-action");
		link.setAttribute("id", i);
		link.setAttribute("role","tab");
		link.setAttribute("data-toggle", "list");
		link.setAttribute("href","#");
		var element = document.getElementById("list-tab");
		element.appendChild(link)
	});
	$('#list-tab a').on('click', function(e){
		e.preventDefault()
		var id = e.target.id;
		var pos = {
			lat: availableHospitals[id].lat,
			lng: availableHospitals[id].lng
		};
		map.setCenter(pos);
	})
}

function handleLocationError(browserHasGeolocation, infoWindow, pos){
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}



function initHospital(){
	var hospitals = [];
	var ref = firebase.database().ref('hospital_detail');
	ref.once('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			var hospital = {};
			childSnapshot.forEach(function(grandSnapshot){
				if(grandSnapshot.key == 'Latitude')
					hospital.lat = grandSnapshot.val()
				if(grandSnapshot.key == 'Longitude')
					hospital.lng = grandSnapshot.val()
				if(grandSnapshot.key == 'Hospital name')
					hospital.name = grandSnapshot.val()		
				if(grandSnapshot.key == 'Street address')
					hospital.address = grandSnapshot.val()
			});
			if(!isEmptyObject(hospital))
				hospitals.push(hospital)
		});
	});
	return hospitals;
}


function isEmptyObject(obj){
	for(var key in obj){
		return false;
	}
	return true
}

function distanceCalculator(lat1, lon1, lat2, lon2){
	var R = 6371; // Radius of the earth in km
  	var dLat = deg2rad(lat2-lat1);  // deg2rad below
  	var dLon = deg2rad(lon2-lon1); 
  	var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  	var d = R * c; // Distance in km
  	return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}