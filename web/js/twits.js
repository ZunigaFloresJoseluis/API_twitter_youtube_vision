var twtt=(function(){

	var siguiente=4;
	var arre=[];
	var _main=function(_json_obj){

		agregar_inicio_twit(_json_obj);
		_maps_twuits(_json_obj);

	}
	var agregar_inicio_twit=function(_json_obj){
		var padre=document.getElementById('twiuts');
		for(let i=0;i<4;i++){
			//console.log(_json_obj.statuses[i]);
			padre.appendChild(_crear_twuit(_json_obj.statuses[i].text,_json_obj.statuses[i].id_str,_json_obj.statuses[i].user.name,_json_obj.statuses[i].created_at,_json_obj.statuses[i].user.profile_image_url_https));
		
			} 	

		var atras=crear_dom('button',{'class':'button_atras'},{'textContent':'Atras'})
		var sigu=crear_dom('button',{'class':'button_siguiente'},{'textContent':'Siguiente'})
		padre.appendChild(atras)
		padre.appendChild(sigu)
		sigu.addEventListener('click',_siguiente_event)
		atras.addEventListener('click',_atras_event)

	}


	var _atras_event=function(){
		
		siguiente-=4;
		if(siguiente>0){
			eliminar_cont('twiuts',2);
			var padre=document.getElementById('twiuts');
		for(let i=siguiente-4;i<(siguiente);i++){
				padre.appendChild(_crear_twuit(json_inicial.statuses[i].text,json_inicial.statuses[i].id_str,json_inicial.statuses[i].user.name,json_inicial.statuses[i].created_at,json_inicial.statuses[i].user.profile_image_url_https));
		}
		
			var atras=crear_dom('button',{'class':'button_atras'},{'textContent':'Atras'})
		var sigu=crear_dom('button',{'class':'button_siguiente'},{'textContent':'Siguiente'})
		padre.appendChild(atras)
		padre.appendChild(sigu)
		sigu.addEventListener('click',_siguiente_event)
		atras.addEventListener('click',_atras_event)
		}
		else{
			siguiente=0;
		}

		
	}

	var _siguiente_event=function(){
		console.log('hola')
		//json_inicial
		if(siguiente+4<100){
			eliminar_cont('twiuts',2);
		var padre=document.getElementById('twiuts');
		for(let i=siguiente;i<(siguiente+4);i++){
				padre.appendChild(_crear_twuit(json_inicial.statuses[i].text,json_inicial.statuses[i].id_str,json_inicial.statuses[i].user.name,json_inicial.statuses[i].created_at,json_inicial.statuses[i].user.profile_image_url_https));
		}
		siguiente+=4;
			var atras=crear_dom('button',{'class':'button_atras'},{'textContent':'Atras'})
		var sigu=crear_dom('button',{'class':'button_siguiente'},{'textContent':'Siguiente'})
		padre.appendChild(atras)
		padre.appendChild(sigu)
		sigu.addEventListener('click',_siguiente_event)
		atras.addEventListener('click',_atras_event)
		}
		

	}




	var _maps_twuits=function(_json_obj){
		if(arre.length<3 &&  control<20){
				for(let  i=0;i<_json_obj.statuses.length;i++){
			if(_json_obj.statuses[i].coordinates!=null || _json_obj.statuses[i].geo!=null){
				arre.push(_json_obj.statuses[i]);
			}
		}

		encontrar_geo();


		}
		else{
			console.log("aureca");
		agregar_maps(arre)
		}
	


	}


	var _crear_str_t=function(_description,link,name,fecha){
		var _str=`<blockquote class="twitter-tweet" data-lang="es"><p lang="es" dir="ltr">${_description}</p>&mdash; ${name} <a href="https://twitter.com/freddier/status/${link}?ref_src=twsrc%5Etfw">${fecha}</a></blockquote>`

		return _str
	}




	var _crear_twuit=function(_description,link,name,fecha,img_url){
		var blockquote=crear_dom('blockquote',{},{})
		var p=crear_dom('p',{},{})
		p.textContent=_description
		var user_img=document.createElement('img')
		user_img.src=img_url
		user_img.setAttribute('style','float:left;')
		blockquote.textContent=name
		var a=crear_dom('a',{'href':'https://twitter.com/Veggieknight/status/'+link},{'textContent':fecha})
		blockquote.appendChild(user_img)
		blockquote.appendChild(a)
		blockquote.appendChild(p);

			
		return blockquote;



	}

	var crear_dom=function(nombre,attribute,otro){
     var nuevo=document.createElement(nombre);
     for(let i in attribute){
          nuevo.setAttribute(i,attribute[i])

      }
      for(let i in otro){
        nuevo[i]=otro[i];
      }

      return nuevo
	}



	///********************MAPS ------------------------------>

var  agregar_maps=function(obj_respuesta_geolocalizacion){

 if(obj_respuesta_geolocalizacion.length>0){
    for(let i=0;i<obj_respuesta_geolocalizacion.length;i++){
   
      var latitud=obj_respuesta_geolocalizacion[i].coordinates.coordinates[1];
      var longitud=obj_respuesta_geolocalizacion[i].coordinates.coordinates[0];

      console.log(obj_respuesta_geolocalizacion[i].coordinates)
      //(_description,link,name,fecha)
      //_crear_twuit(obj_respuesta_geolocalizacion[i].text,obj_respuesta_geolocalizacion[i].id_str,obj_respuesta_geolocalizacion[i].user.name,obj_respuesta_geolocalizacion[i].created_at)
      Geocodificacion_inversa(map,_crear_str_t(obj_respuesta_geolocalizacion[i].text,obj_respuesta_geolocalizacion[i].id_str,obj_respuesta_geolocalizacion[i].user.name,obj_respuesta_geolocalizacion[i].created_at),{coords:{lat:latitud,lng:longitud}})
    // _agregaMarcador(map,obj_respuesta_geolocalizacion[i].items[0].player.embedHtml,{coords:{lat:latitud,lng:longitud}})
      }
 }


 

}

var Geocodificacion_inversa=function(map,video,props){
  var url_maps="https://maps.googleapis.com/maps/api/geocode/json?latlng="+props.coords.lat+","+props.coords.lng+"&key=AIzaSyATTIUYuDBH47upxh-tEXDWWzsbMBHxx_o"
 var xhr=new XMLHttpRequest()
  xhr.open('GET',url_maps)
  xhr.send();
  xhr.onreadystatechange=datos_vivienda(xhr,map,video,props)


}

var datos_vivienda=function(xhr,map,video,props){
  return function(){
       if(xhr.readyState==4){
      if(xhr.state==200){

           // _agregaMarcador(map,video,props,xhr.results[0].formatted_address)
      }
      console.log(JSON.parse(xhr.response))
       _agregaMarcador(map,video,props,JSON.parse(xhr.response).results[0].formatted_address)
    }


  }
}

 var _agregaMarcador = function(map,video,props,direccion){
        var marker=new google.maps.Marker({
            position: props.coords,
            icon:'http://maps.google.com/mapfiles/kml/paddle/blu-circle.png',
            map: map
        })
        var infowindow = new google.maps.InfoWindow({
            content: video+'<p>direccion: '+direccion+'</p>'
          })
        
          marker.addListener('click',function(){
          infowindow.open(map, marker);
          })
        
        

    };


    var eliminar_cont=function(_id,num){
  var padre=document.getElementById(_id)
        if(padre.hasChildNodes()){
            while(padre.childNodes.length>num){
                padre.removeChild(padre.lastChild)
            }
        }
	}


	//---------------fin


var replace_all=function(_str){
	var string=_str;
	let co=count_space(_str);
	for(let i=0;i<=co;i++){
		string=string.replace(' ','')
	}
return string

}

var count_space=function(_str){
	let count=0;
	let arr=_str
	for(let a in arr){
		if(arr[a]==' '){
			count+=1;
		}
	}
	return count;
}

var replace_string=function(_str){
	return replace_all(_str,0,count_space(_str))
}

return{
	main:_main,
	busqueda:_maps_twuits,
	eliminar:eliminar_cont,
	replace_all:replace_string

}

}())