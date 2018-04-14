<?php 
require_once('TwitterAPIExchange.php');('TwitterAPIExchange.php');
$resultado = $_POST['valorCaja1'] ; 

	 $settings = array (
              'oauth_access_token' => "2469849156-ws5ds99kWIaUSFLATgDH40XkbQkp0oRUjNxaGi0" ,  
              'oauth_access_token_secret' => "URqMTXaO6x4l0pEMDlLdmsqXBaYWCAqSn9lQHcIrXImlX" ,  
              'consumer_key' => "xyBSS24vrMpjkOpK5q3bRR35N" ,  
              'consumer_secret' => "loHPiPcZ8VrlkCDBn0KEYoc05lp5rFoG2pI9f85pEqfC2ngbqJ"  
          );


          $url = "https://api.twitter.com/1.1/search/tweets.json";
          $requestMethod = "GET";
          //?q=culo&count=1
          $getfield = '?q='.$_POST["valorCaja1"].'&count=100';
          $twitter = new TwitterAPIExchange($settings);
           echo $twitter->setGetfield($getfield)
                       ->buildOauth($url, $requestMethod)
                       ->performRequest();







?>