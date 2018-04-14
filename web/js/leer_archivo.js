var archivo=(function(){
    var _get64="";
    var url=" https://vision.googleapis.com/v1/images:annotate?key=AIzaSyATTIUYuDBH47upxh-tEXDWWzsbMBHxx_o"
    var _get_64=function(){
        return _get64;
    }
  
    var _total_results=0;
    var panel_num=0;
    var _xhr_items;
    var _palabra_buscar;
    var respuesta={exito:[],fracaso:[]};
    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
 
            reader.onload = function (e) {
                var filePreview;
                if(document.getElementById("file-preview")!=undefined){
                         filePreview =document.getElementById("file-preview");
                }
                else{
                    filePreview=document.createElement('img')
                }
                
                filePreview.id = 'file-preview';
                filePreview.setAttribute("class","imagen_muestra")

                //e.target.result contents the base64 data from the image uploaded
                filePreview.src = e.target.result;
                //console.log(e.target.result);
            _get64=(e.target.result.split(';')[1].split(',')[1]);
             // console.log( _get64)
                var previewZone = document.getElementById('file-preview-zone');
                previewZone.appendChild(filePreview);
                 _get()
            }
 
            reader.readAsDataURL(input.files[0]);

        }
    }
    var agregar_funcion=function(){
           var fileUpload = document.getElementById('file-upload');
    fileUpload.onchange = function (e) {
        readFile(e.srcElement);

           
        }
    }

 var _get=function(){
     
        var parametros=`{
  "requests":[
    {
      "image":{
        "content":"`+_get64+`"
      },
      "features":[
        {
          "type": "LABEL_DETECTION"
        },
        {
           "type": "LOGO_DETECTION"
        },
         {
          "type": "TEXT_DETECTION"
        }
      ]
    }
  ]
}
 `
  var  xhr=new XMLHttpRequest()
      xhr.onreadystatechange=cambio(xhr)
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-Type", "application/json");
     //    xhr.setRequestHeader("Access-Control-Allow-Origin","*")
       //  xhr.setRequestHeader("Content-Length", parametros.length);
      //   xhr.setRequestHeader("Connection", "close");
      xhr.setRequestHeader("Accept","application/json")
      xhr.send(parametros);

    }

 var cambio=function(xhr){
      return function(){
        console.log('--->')
        if(xhr.readyState==4){
          if (xhr.state==200) {
            console.log(':)')
          }
          else{

            console.log(JSON.parse(xhr.response))
            var obj_respuesta=JSON.parse(xhr.response);
         //   texto(JSON.parse(xhr.response))
          if(obj_respuesta.responses[0].labelAnnotations!=undefined && obj_respuesta.responses[0].labelAnnotations.length>0){
                agregar_botones_label(obj_respuesta.responses[0].labelAnnotations)
          }
          if(obj_respuesta.responses[0].logoAnnotations!=undefined && obj_respuesta.responses[0].logoAnnotations.length>0){
             agregar_botones_logo(obj_respuesta.responses[0].logoAnnotations)
          }
          if(obj_respuesta.responses[0].fullTextAnnotation!=undefined ){
            console.log(obj_respuesta.responses[0].fullTextAnnotation.text)
             agregar_text(obj_respuesta.responses[0].fullTextAnnotation)
          }

            _agregar_input()
            _agregar_twitter()
            
          }
        }
      }
    }

  var _agregar_twitter=function(){
    var butones_text=document.getElementsByTagName('button')
    var texto_ultimo=butones_text[1]
    var padre=document.getElementById('segmento-botn')
    var text=crear_dom('p',{id:'twitter'})
    text.textContent='Busca quien esta hablando de '+ texto_ultimo.textContent+' en twitter'
    var link=crear_dom('a',{'href':'https://twitter.com/intent/tweet?text=Estoy buscando'+texto_ultimo.textContent})

    var boton=crear_dom('button',{'href':'https://twitter.com/intent/tweet?text=Estoy buscando  '+texto_ultimo.textContent,'class':'btn btn-info','type':'button'})
    boton.appendChild(crear_dom('i',{'class':'fa fa-twitter-square','style':'font-size:20px;color:white'}))
    link.appendChild(boton)
    text.appendChild(link)
    padre.appendChild(text);
  }

var _agregar_input=function(){
      var padre=document.getElementById('segmento-botn')
       //<input type="number" class="form-control" 
       //id="inp_number"  placeholder=" ingrese el limite de busqueda de videos">
      var input=document.createElement('input')
      input.setAttribute('type','number')
      input.setAttribute('class','form-control')
      input.setAttribute('id','inp_number')
      //min="-999" max="9999"
      input.setAttribute('min','1');
      input.setAttribute('max','400');
      input.setAttribute('value',1);
      input.setAttribute('placeholder','ingrese el limite de busqueda de videos')
     padre.appendChild(input)


}

var agregar_botones_label=function(labelAnnotations){
    if(document.getElementById('segmento-botn').childElementCount>1){
        var padre=document.getElementById('segmento-botn')
        if(padre.hasChildNodes()){
            while(padre.childNodes.length>3){
                padre.removeChild(padre.lastChild)
            }
        }
         var contenedor=document.getElementById('segmento-botn')
        for(let i=0;i<parseInt(labelAnnotations.length/2);i++){
            var button=document.createElement('button')
            button.setAttribute('type','button')
            button.setAttribute('class','btn btn-success')
            button.setAttribute('id',"valor"+i)
            button.setAttribute('href','javascript:;')
            button.setAttribute('title','videos')
            button.setAttribute('onclick',"realizaProceso($('#valor"+i+"').text());return false;")
            button.textContent=labelAnnotations[i].description
            contenedor.appendChild(button)
            button.addEventListener('click',fun_event)
        }


    }else{
      var contenedor=document.getElementById('segmento-botn')
        for(let i=0;i<parseInt(labelAnnotations.length/2);i++){
            var button=document.createElement('button')
            button.setAttribute('type','button')
            button.setAttribute('class','btn btn-success')
              button.setAttribute('id','valor'+i)
               button.setAttribute('href','javascript:;')
               button.setAttribute('title','videos')
               button.setAttribute('onclick',"realizaProceso($('#valor"+i+"').text());return false;")
            button.textContent=labelAnnotations[i].description
            contenedor.appendChild(button)
           button.addEventListener('click',fun_event)
        }
    }
    
}



var agregar_botones_logo=function(logoAnnotations){
     var contenedor=document.getElementById('segmento-botn')
      var button=document.createElement('button')
            button.setAttribute('type','button')
            button.setAttribute('class','btn btn-danger boton_charact')
              button.setAttribute('id','valorlogo')
                button.setAttribute('href','javascript:;')
                  button.setAttribute('title','videos')
                   button.setAttribute('onclick',"realizaProceso($('#valorlogo').text());return false;")
            button.textContent=logoAnnotations[0].description
            contenedor.appendChild(button)
         button.addEventListener('click',fun_event)
    

}

var fun_event=function(eve){
    var busqueda_texto=(eve.srcElement.textContent)||(eve.originalTarget.textContent);
    _palabra_buscar= busqueda_texto;
    var numero_results=parseInt(document.getElementById('inp_number').value) 

    console.log(busqueda_texto+"       "+numero_results)
    if(numero_results!=undefined){
       var text=document.getElementById('twitter')
    text.textContent='Busca quien esta hablando de '+ busqueda_texto+' en twitter'
    var link=crear_dom('a',{'href':'https://twitter.com/intent/tweet?text=Estoy buscando  '+_palabra_buscar})

    var boton=crear_dom('button',{'href':'https://twitter.com/intent/tweet?text=Estoy buscando '+_palabra_buscar,'class':'btn btn-info','type':'button'})
    boton.appendChild(crear_dom('i',{'class':'fa fa-twitter-square','style':'font-size:20px;color:white'}))
    link.appendChild(boton)
    text.appendChild(link)
   // padre.appendChild(text);
  

    eliminar_cont();
    if(numero_results<50){
      _total_results=numero_results;
       shearch_videos(busqueda_texto,numero_results);      
    }
    else{
      _total_results=numero_results
      //obtener_items
      next_page_videos()
    }

    }
 


}

var quitar_space=function(str){

}

var respuesta_search={exito:[]}
var ids_search=[]

var next_page_videos=function(){
  var token=window.location.hash
  token=token.split('&')[0].split('#')[1].split("=")[1]
 var url= "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+_palabra_buscar+"&order=relevance&maxResults=50&access_token="+token
 var  xhr=new XMLHttpRequest()
      xhr.onreadystatechange=lista_videos(xhr)
      xhr.open('GET', url);
         xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send()
}


var lista_videos=function(xhr){
    return function(){
      if (xhr.readyState==4){
        if(xhr.state==200){
           // console.log(JSON.parse(xhr.response))
        }
          //console.log (JSON.parse(xhr.response))
    //    if(xhr.state!=400 ){
          respuesta_search.exito.push(JSON.parse(xhr.response))

        let limite=0;
        limite=parseInt(_total_results/50);
        if(limite<_total_results/50){
          limite+=1;
        }        


        if(respuesta_search.exito.length!=limite ){
           next_token_search(JSON.parse(xhr.response).nextPageToken)
        }
        else{
           obtener_ids(respuesta_search)
           crear_videos(ids_search)
           _peticiones(ids_search)
           //console.log(ids_search)

        }

      //  }
        

       // console.log(xhr.response.nextPageToken)
      }
    }
}

var crear_videos=function(ids_search){
   var videos_cont=document.getElementById('videos')
    var siguiente=crear_dom('button',{id:1,class:"direccion"},{textContent:"siguiente"})
      var atras=crear_dom('button',{id:1,class:"direccion"},{textContent:"atras"})
    panel_num=1;
      for(let i=0;i<10;i++){
         var video=_crear_video(ids_search[i].id.videoId,20);
          videos_cont.appendChild(video)
      }
     
      videos_cont.appendChild(siguiente)


      siguiente.onclick=event_siguiente
      

}


var event_siguiente=function(){
 
  var id_boton=parseInt(document.getElementById(panel_num).getAttribute('id'))
  var videos_cont=document.getElementById('videos')
  eliminar_cont()
 console.log(id_boton+"____"+_total_results/10)
  if(id_boton!=parseInt(_total_results/10)){
 
    var siguiente=crear_dom('button',{id:id_boton+1,class:"direccion"},{textContent:"siguiente"})
      var atras=crear_dom('button',{id:id_boton+1},{textContent:"atras"})

      for(let i=(id_boton*10);i<((id_boton*10)+10);i++){
         var video=_crear_video(ids_search[i].id.videoId,20);
          videos_cont.appendChild(video)
      }
    videos_cont.appendChild(atras)
    videos_cont.appendChild(siguiente)
    siguiente.onclick=event_siguiente
    atras.onclick=event_atras
  }
  else{
     var resto=_total_results-(id_boton*10)
     var atras=crear_dom('button',{id:id_boton+1},{textContent:"atras"})
     for(let i=(id_boton*10);i<((id_boton*10)+resto);i++){
       var video=_crear_video(ids_search[i].id.videoId,20);
          videos_cont.appendChild(video)
     }
     videos_cont.appendChild(atras)
     atras.onclick=event_atras
  }
        panel_num+=1;

}

var event_atras=function(){
 
  var id_boton=parseInt(document.getElementById(panel_num).getAttribute('id'))
  id_boton-=2;
  var videos_cont=document.getElementById('videos')
  eliminar_cont()
 console.log(id_boton+"____"+_total_results/10)
  if(id_boton!=0){
 
    var siguiente=crear_dom('button',{id:id_boton+1,class:"direccion"},{textContent:"siguiente"})
    var atras=crear_dom('button',{id:1},{textContent:"atras"})
      panel_num=id_boton+1;
      for(let i=(id_boton*10);i<((id_boton*10)+10);i++){
         var video=_crear_video(ids_search[i].id.videoId,20);
          videos_cont.appendChild(video)
      }
   videos_cont.appendChild(atras)
    videos_cont.appendChild(siguiente)
    siguiente.onclick=event_siguiente
    atras.onclick=event_atras
  }
  else{
    id_boton=1;
    panel_num=1;
      var siguiente=crear_dom('button',{id:id_boton,class:"direccion"},{textContent:"siguiente"})
     var resto=_total_results-(id_boton*10)
     for(let i=0;i<10;i++){
       var video=_crear_video(ids_search[i].id.videoId,20);
          videos_cont.appendChild(video)
     }
      videos_cont.appendChild(siguiente)
    siguiente.onclick=event_siguiente
  }
       

}




var agregar_text=function(fullTextAnnotation){
    var contenedor=document.getElementById('segmento-botn')
      var button=document.createElement('button')
            button.setAttribute('type','button')
            button.setAttribute('class','btn btn-warning')
              button.setAttribute('id','info_search')
               button.setAttribute('href','#videos')
               button.setAttribute('title','videos')
            button.textContent=fullTextAnnotation.text
            contenedor.appendChild(button)
  
}


var shearch_videos=function(_palabra_buscar,maxResults){
  var token=window.location.hash
  token=token.split('&')[0].split('#')[1].split("=")[1]
 var url= "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+_palabra_buscar+"&order=relevance&maxResults="+maxResults+"&access_token="+token
 var  xhr=new XMLHttpRequest()
      xhr.onreadystatechange=videos(xhr)
      xhr.open('GET', url);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send()
}

var videos=function(xhr){
  return function(){
    if(xhr.readyState==4){
      if(xhr.state==200){

      }
      respuesta_search.exito.push(JSON.parse(xhr.response))

      console.log(JSON.parse(xhr.response))

     // crear_carrusel(JSON.parse(xhr.response).items)
     ids_search=JSON.parse(xhr.response).items;
     menores_diez(JSON.parse(xhr.response).items)
     _peticiones(ids_search)
    }
  }

}


var  menores_diez=function(obj_xhr_items){
  if(_total_results>10){
      var videos_cont=document.getElementById('videos')
      var siguiente=crear_dom('button',{id:1,class:"direccion"},{textContent:"siguiente"})
      panel_num=1;
          for(let i=0;i<10;i++){
             var video=_crear_video(obj_xhr_items[i].id.videoId,20);
              videos_cont.appendChild(video)
          }

          videos_cont.appendChild(siguiente)
          siguiente.onclick=event_siguiente

  }
  else{
      var videos_cont=document.getElementById('videos')
   
    panel_num=1;
  for(let i=0;i<_total_results;i++){
     var video=_crear_video(obj_xhr_items[i].id.videoId,20);
      videos_cont.appendChild(video)
  }

 

  }


}








var eliminar_cont=function(){
  var padre=document.getElementById('videos')
        if(padre.hasChildNodes()){
            while(padre.childNodes.length>1){
                padre.removeChild(padre.lastChild)
            }
        }
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



var _crear_video=function(id_video,tamano){
  var video_return=document.createElement('iframe')
      video_return.setAttribute('id','player')
      video_return.setAttribute('type','text/html')
      video_return.setAttribute('width',"20%")
      video_return.setAttribute('height','25%')
      video_return.setAttribute('src','https://www.youtube.com/embed/'+id_video+'?enablejsapi=1')
      video_return.setAttribute('frameborder','0')
    return video_return;

}


var obtener_ids=function(respuesta_search){
  for(let i=0;i<respuesta_search.exito.length;i++){
        for(let j=0;j<respuesta_search.exito[i].items.length;j++){
          if(respuesta_search.exito[i].items[j].id.videoId!=undefined||respuesta_search.exito[i].items[j].id!=undefined){
            ids_search.push(respuesta_search.exito[i].items[j])
          }
          
        }
  }

}


var next_token_search=function(obj_next_token_page){
  var token=window.location.hash
  token=token.split('&')[0].split('#')[1].split("=")[1]
 var url= "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+_palabra_buscar+"&pageToken="+obj_next_token_page+"&order=relevance&&maxResults=50&access_token="+token
 var  xhr=new XMLHttpRequest()
      xhr.onreadystatechange=lista_videos(xhr)
      xhr.open('GET', url);
         xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send()
}




/*------------> agregar marcadores*/

var _peticiones=function(respuesta_search){

  var token=window.location.hash
  token=token.split('&')[0].split('#')[1].split("=")[1]
  for(let i=0;i<respuesta_search.length;i++){
      var id=respuesta_search[i].id.videoId
      //console.log(id)
      var url="https://www.googleapis.com/youtube/v3/videos?part=id,snippet,recordingDetails,player&id="+id+"&access_token="+token
      var xhr=new XMLHttpRequest()
      xhr.open("GET",url);
      xhr.onreadystatechange=respuestas_con_geolocalizacion(xhr,i,respuesta_search.length,respuesta)
      xhr.send();

  }


}
  
var respuestas_con_geolocalizacion=function(xhr,i,length,respuesta){
  return function(){
    if(xhr.readyState==4){
      if(xhr.state==200){
          if(JSON.parse(xhr.response).items[0].recordingDetails!=undefined){
            respuesta.exito.push(JSON.parse(xhr.response))   
          }
        
      }
   
      //console.log(JSON.parse(xhr.response))
      if(JSON.parse(xhr.response).items.length>0){
       if(JSON.parse(xhr.response).items[0].recordingDetails!=undefined){
        if(JSON.parse(xhr.response).items[0].recordingDetails.location!=undefined){
            var latitud=JSON.parse(xhr.response).items[0].recordingDetails.location.latitude;
            var longitud=JSON.parse(xhr.response).items[0].recordingDetails.location.longitude;
            if(latitud!=undefined&& longitud!=undefined){
              respuesta.exito.push(JSON.parse(xhr.response))  
            }
        }
        
       }
       else{
        respuesta.fracaso.push(JSON.parse(xhr.response))
       } 
      }
      //console.log(total_peticiones_echas+"--->"+(respuesta.exito.length+respuesta.fracaso.length))
       
       //if(total_peticiones_echas==(respuesta.exito.length+respuesta.fracaso.length)){

//         console.log(respuesta)
          agregar_maps(respuesta.exito)
      // }
        
           
      
       
      
    }
  }
}


var  agregar_maps=function(obj_respuesta_geolocalizacion){

 if(obj_respuesta_geolocalizacion.length>0){
    for(let i=0;i<obj_respuesta_geolocalizacion.length;i++){
   
      var latitud=obj_respuesta_geolocalizacion[i].items[0].recordingDetails.location.latitude
      var longitud=obj_respuesta_geolocalizacion[i].items[0].recordingDetails.location.longitude

      console.log('cuantas')

      Geocodificacion_inversa(map,obj_respuesta_geolocalizacion[i].items[0].player.embedHtml,{coords:{lat:latitud,lng:longitud}})
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
            icon:'https://maps.google.com/mapfiles/kml/paddle/go.png',
            map: map
        })
        var infowindow = new google.maps.InfoWindow({
            content: video+'<p>direccion: '+direccion+'</p>'
          })
        
          marker.addListener('click',function(){
          infowindow.open(map, marker);
          })
        
        

    };



    return{
        agregar:agregar_funcion,
        get64:_get_64,
        crear_dom:crear_dom

    }
 
  
}())