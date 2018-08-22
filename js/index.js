$(document).ready(function(){
	$.ajax({
		type:"GET",
		url:"https://uvdata.arpansa.gov.au/xml/uvvalues.xml",
		dataType: "xml",
		success:xmlParser
	});
});

function xmlParser(xml){
	$(xml).find('location[id="Melbourne"]').each(function(){
		var index = $(this).find('index').text();
		var attention;
		if(index < 3){
			attention = ", don't worry about uv";
		}
		else if(index < 5){
			attention = ", be careful about the sun";
		}
		else if(index < 8){
			attention = ", uv is quite high, please put sunscreen";
		}
		else{
			attention = ",please stay in house avoiding sunburn";
		}
		$("#uv-index").append(index," now", attention);
	})
}