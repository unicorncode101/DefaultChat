var goodies = null; 

DownloadGifts();


function displayChat(){

		var inputId= document.getElementById("userInputId").value;
		var inputUserName= document.getElementById("username").value;
		var chatWin = document.getElementById("chatWindow");
		var startWin = document.getElementById("startWindow");
		if(inputId >0){

		//
		chatWin.style.display = 'block'; 
		startWin.style.display='none';

		FetchEvent(inputId);
		

		window.setInterval(function() {
		var elem = document.getElementById('chat');
		elem.scrollTop = elem.scrollHeight;
		}, 5000);


		}

}
function GetuserImage(data){


return   "https://ynassets.younow.com/user/live/" + data + "/" + data +".jpg"; 



}

	function FetchEvent (userId){
			pusher = new Pusher ('42a54e2785b3c81ee7b3', {
        cluster: "mt1"
		});
	
	
		let channel = pusher.subscribe ("public-channel_" + userId);
  
		channel.bind('onEnd', function(data){

		});
	
	channel.bind ('onChat', function (data)
    {
		
        if (data.message !== "undefined")
    
			{
			
			
				var dataout = "" ; 
					for (let i = 0; i < data.message.comments.length; i++)
						{
						var username = data.message.comments[i].name;
						var	TimsStamp =  data.message.comments[i].timestamp; 
						var whatsSaid = data.message.comments[i].comment; 
						var CommentUserId = data.message.comments[i].userId; 
						var userImage = GetuserImage(CommentUserId); 
						var propslevel = (data.message.comments[i].propsLevel ) 
						var ifMod = data.message.comments[i].broadcasterMod; 
						;
						
					
						var ifsub= data.message.comments[i].subscriptionData

				


			if((ifMod != false ) ||(data.message.comments[i].subscriptionData !=null )) {
			
			
						dataout = dataout + "<table><tr class='msg'><td>"+"<img  style='width:100px;height:100px; border-radius: 20px;align:left;' src='" + userImage+"'/></td><td  style='color:red;'>" + Math.abs(propslevel) + " " +data.message.comments[i].name  +" "+ timeConverter(TimsStamp) +"<br>"  +data.message.comments[i].comment + 
						"</td></tr><table>"; 
		
						
			}
			else{
						dataout = dataout + "<table><tr class='msg'><td>"+"<img  style='width:100px;height:100px; border-radius: 20px;align:left;' src='" + userImage+"'/></td><td  style='color:white'>" + Math.abs(propslevel) + " " +data.message.comments[i].name  +" "+ timeConverter(TimsStamp) +"<br>"  +data.message.comments[i].comment + 
						"</td></tr><table>"; 
			}
		

						}
	
			}


		displayIt(dataout); 



	
	});

	     //Get BroadcastsData
        channel.bind('onBroadcastPlayData', function (data)
        {
		
		
			
			
        });
   
        channel.bind('onGift', function (data)
        {
			
			
	
		
		

		
		});
	
        //Get Stickers
        channel.bind('onSticker', function (data)
        {
		if(stickers !=false) {
		dealwithFreeStickers(data);
		}
		else{
		
		}
		  
        });

	channel.bind('onRaid', function (data)
        {
		console.log("raid : " +  data )
		
		});

        //Get Stickers
        channel.bind('onPartnerSticker', function (data)
        {
		
		//console.log("Partener sticker data " + data )
            //handleOnOldPartnerSticker(data);
        });
   
			
   
		channel.bind ('onSuperMessage', function (data)
			{        
		

			dataout = dataout + "<div class='msg' style='color:green;'>"    +data.message.superMessages[0].name +" <b> " + data.message.superMessages[0].comment + "</b><div>"; 
		
			displayIt(dataout);
		
		});
		
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  if(sec <10 ){
	sec ="0"+sec

  }
  if(hour <10) {
	hour = "0" + hour;

  }
  if(min <10){
	min = "0" + min

  }
  var time =   hour + ':' + min ;
  return time;
}
function displayIt(data){

	dataout = data;
	var el2 =   document.getElementById("chat") ;
	el2.innerHTML =   el2.innerHTML  + dataout +"<br>"; 

}
function dealwithFreeStickers(data){

	var ids = data.message.stickers[0].stickerUserId; 
	var stickername = data.message.stickers[0].assetSku; 
	var fullpath = "https://ynassets.younow.com/subscriptionsTiers/usersAssets/live/" + ids+"/" +stickername +"/web_" +stickername +".png?assetRevision=1 " ;
	var sent_user = data.message.stickers[0].profile;
	var imagedata= "<div class='msg'    style='width:200px;height:auto;font-size:15px; color:white;' >" +sent_user+"  <br><img src='" + fullpath +"' style='color:white; width:50px;height:50px'/> </div>"

	displayIt(imagedata); 
 

}

function displayGiftOnly(i,data2){
	
	index =0; 
	var index =0; 
	stuff = goodies.goodies;
	gifts = data2; 
	
	var totalLikesGiven = gifts.extraData['numOfLikes']
	
	if(totalLikesGiven> 1)
	{
	
	return totalLikesGiven
	}
	else if (gifts.extraData.value > 1){
	
	
	return gifts.extraData.value;
	
	}
	else{
	
	
	return 0
	}
} 
	async function DownloadGifts()
	{
    //console.log ("Fetching Gifts...");
    targetUrl = 'https://ynassets.younow.com/giftsData/live/en/data.json';
    var json = fetch (targetUrl)
        .then (blob => blob.json ())
        .then (data =>
        {
            json = JSON.stringify (data, null, 2);
            goodies = JSON.parse (json);
        });
	}
	
	
