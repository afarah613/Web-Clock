
// Load the Visualization API and the piechart package.
google.load("visualization", "1", {packages: ["corechart"]});
function drawChart(type) 
  {  
    
    var websites = JSON.parse(localStorage.getItem("websites")) || [];// retrieve the data from local storage
    var data=[['Website', 'Hours']]; // set the headers
    var display = localStorage.getItem("amount_of_websites_to_display") || 7;
    var total=0;
  // Iterate through each website add it to the table and the chart 
    for(var i=0; i<websites.length ; i++)   
    {
  // setup the table and data for today
      if(type === "today")
        var time =Math.round( websites[i].today_min/60 * 100) / 100; // convert the time to minutes with two decimal places
      else
         var time =Math.round( websites[i].alltime_min/60 * 100) / 100; // convert the time to minutes with two decimal places

      if(time>localStorage.getItem("min_time"))// only show the website if it above the min time threshold
      {
        data.push([websites[i].url,time]);
        var tbody = document.getElementById("table-body" + type);
        var row = tbody.insertRow(tbody.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = websites[i].url;
        cell2.innerHTML = time;
        total+= time;
      }
     
      
    } 
     total =Math.round(total * 100) / 100;
     var row = tbody.insertRow(tbody.rows.length);
     row.id = "final";
     var cell1 = row.insertCell(0);
     var cell2 = row.insertCell(1);
     cell1.innerHTML ="Total Time";
     cell2.innerHTML = total;
  
    var stats = google.visualization.arrayToDataTable(data);
    
  // set the chart options
    var options = 
    {
      title: "Websites visted " + type.toUpperCase(),
      sliceVisibilityThreshold: 0.05,
      legend:
      {     
          textStyle: {color: 'black', fontSize: 14}
      },
      chartArea:{width:'85%',height:'55%', left: 30, top: 30}
    

    };
  
  
   // Draw the charts with the options and the data 
    var chart = new google.visualization.PieChart(document.getElementById(type +1));
   

    chart.draw(stats, options);
   
  }

$(document).ready(function() {
  
  
  // if the option tabs is pressed open up a new tab with 
  
	document.getElementById("options").addEventListener("click", function(){
        chrome.tabs.create({url: "options.html"});
  });

  document.getElementById("tabs").addEventListener("click", function(e){

     var curr = document.getElementsByClassName("active")[0];
     var next = document.getElementById(e.target.innerHTML.toLowerCase());
     console.log(curr);
     console.log(next);
     if(next)
     {   
        curr.className = "tab unactive";
        next.className = "tab active";
     }

  })
 
   // Set a callback to run when the Google Visualization API is loaded.
  google.setOnLoadCallback(drawChart("today"));
  drawChart("alltime");
  document.getElementById("alltime").className= "tab unactive";
  // The Callback function will retrieve the data from local storage
  // draws the piecharts from the data 


});

   




