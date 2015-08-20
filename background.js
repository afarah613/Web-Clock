var UPDATE_TIME = 10;
function checkBlacklist(url)
{
	var blacklist = JSON.parse(localStorage.getItem('blacklist')) || [];
	for(var i =0; i< blacklist.length; i++)
	{
		if(blacklist[i] === url)
		{
			return true;
		}
	}
	return false;
}
function checkWebsites(url,websites)
{
	if(checkBlacklist(url))
		return false;

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	today = mm+'/'+dd+'/'+yyyy;
	for(var i =0; i < websites.length; i++)
	{
		console.log(websites[i].today);
		if(websites[i].today !== today)
		{
			websites[i].today_min= 0;
			websites[i].today = today;
			console.log(websites[i].url);
		}
		if(websites[i].url === url)
		{
			websites[i].today_min+=UPDATE_TIME;
			websites[i].alltime_min += UPDATE_TIME;	
			return false;
		}
	}
	return true;
}

function saveUpdates(url,websites)
{
	 	
	if(checkWebsites(url,websites))
	{
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		today = mm+'/'+dd+'/'+yyyy;
		websites.push(	
			{
				"url": url, 
				"today_min": UPDATE_TIME , 
				"today": today, 
				"alltime_min": UPDATE_TIME
			});
	}

  	localStorage.setItem("websites", JSON.stringify(websites));

}
var update = function(){ 
	chrome.tabs.query({ lastFocusedWindow: true, active: true }, function (tabs) {
	 						if(tabs.length > 0)
	 						{
	 							
	 							var websites = JSON.parse(localStorage.getItem("websites")) || [];
	 							var parser = document.createElement('a');
								parser.href = tabs[0].url;
								hostname = parser.hostname;
	 							saveUpdates(hostname,websites);			
	 						}
    					});
	
	
 }
setInterval(update,10000);