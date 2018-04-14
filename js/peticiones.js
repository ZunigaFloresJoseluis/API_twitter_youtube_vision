var imagen1=(function (get64){
    var url=" https://vision.googleapis.com/v1/images:annotate?key=AIzaSyATTIUYuDBH47upxh-tEXDWWzsbMBHxx_o"
    var _get=function(){
     
    	var parametros=`{
  "requests":[
    {
      "image":{
        "content":"`+get64+`"
      },
      "features":[
        {
          "type": "LABEL_DETECTION"
        },
        {
           "type": "LOGO_DETECTION"
        },
        {
          "type": "LANDMARK_DETECTION"
        },
         {
          "type": "WEB_DETECTION"
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
         //   texto(JSON.parse(xhr.response))
            
          }
        }
      }
    }

 
 
	return {
		get:_get
	}
}())

