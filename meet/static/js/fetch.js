var bounds = null;

function htmlEncode(value) {
    return $('<div/>').text(value).html();
} 

function fetchPoints(url,map) {
    $.ajax({
	    url: url,

	    contentType: 'application/json',
	    
    	beforeSend: function (xhr) {
//    	    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
    	},
	    
		success: function(data) {
			if (data.meta.offset == 0) {
				// first batch of points: clear bounds
				bounds = new google.maps.LatLngBounds();
			}
			var infowindow = new google.maps.InfoWindow();

			data.objects.forEach(function(point) {
		   		var marker = new google.maps.Marker({
		   			position: new google.maps.LatLng(point.latitude,point.longitude),
		   			map: map,
					icon: {
		  			      path: google.maps.SymbolPath.CIRCLE,
		  			      scale: 5,
		  			      fillColor: 'red',
		  			      fillOpacity: 0.8,
		  			      strokeColor: 'white',
		  			      strokeWeight: 2
		  			}
		   		});

		   		google.maps.event.addListener(marker, 'click', (function(marker) {
		   	        return function() {
						var html = '<h3>Meting '+point.id+'</h3>'+
						'<table class="table table-striped"><tr><td>Sensor</td><td>'+point.sensor+'</td></tr>'+
						'<tr><td>Tijdstip</td><td>'+point.date+'</td></tr>'+
						'<tr><td>'+point.entity+'</td><td>'+point.value+'&nbsp;'+htmlEncode(point.unit)+'</td></tr>'+
						'</table>';
						infowindow.setContent(html);
						infowindow.open(map, marker);
		   	        }
		   		})(marker));

		   		bounds.extend(marker.position);
			});
			
			if (data.meta.next) {
				// fetch next batch of points
				fetchPoints(data.meta.next, map);
			}
			else {
				// no more points: fit map bounds
				if (bounds)
					map.fitBounds(bounds);
			}
	    },

	    error: function(hdr,status,errorThrown) {
	    	//alert("Fout tijdens laden van punten: " + errorThrown);
	    },

	    complete: function(hdr, status) {
	    }
    });
}
