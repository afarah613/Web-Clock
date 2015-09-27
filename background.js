// Interval time(in seconds)
var UPDATE_TIME = 10;
/**
	Will take the current active url as a parameter.
	If the url is in the blacklist it will return true, else it will will return false.
*/
function checkBlacklist(url)
{
	var blacklist = JSON.parse(localStorage.getItem('blacklist')) || []; // get the black list form local strorage
	for(var i =0; i< blacklist.length; i++)
	{
		if(blacklist[i] === url)
		{
			return true;
		}
	}
	return false;
}
/**
	Will take the current active url as a parameter.
    If the url is in the blacklist or already been saved in local storage it will return true, else it will will return false 
*/
function checkWebsites(url,websites)
{
	if(checkBlacklist(url))
		return false;

	var date = new Date();
	date = date.getMonth()+1+'/'+ date.getDate()+'/'+date.getFullYear(); 
	for(var i =0; i < websites.length; i++)
	{
		// If dates are different reset the today_min to 0 and set the date to today
		if(websites[i].today !== today)
		{
			websites[i].today_min= 0;
			websites[i].today = today;
			
		}
		// if the url has been saved add the update time to both the today_min and alltime_min 
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
	 // if the url has not yet been saved and is not in the blacklist add it to websites array	
	if(checkWebsites(url,websites))
	{
		var date = new Date();
		date = date.getMonth()+1+'/'+ date.getDate()+'/'+date.getFullYear();
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
	// Update if the browser has been active in the last 30 seconds
	chrome.idle.queryState(30, function (state) {
		if (state === "active") {
		// get the active tab
			chrome.tabs.query({ lastFocusedWindow: true, active: true }, function (tabs) {
									if(tabs.length > 0)
									{	
										var websites = JSON.parse(localStorage.getItem("websites")) || [];
										var parser = document.createElement('a');
										parser.href = tabs[0].url; // get the url
										hostname = parser.hostname;
										saveUpdates(hostname,websites);			
									}
								});
		}
	});
	
 }
 // will run every 10 seconds
setInterval(update,10000);