// Load the Visualization API and the piechart package.
google.load("visualization", "1", {packages: ["corechart"]});
$(document).ready(function() {
  
  $('#tabs').tab();
  // if the option tabs is pressed open up a new tab with 
  $("#options").on("click", function(){
      chrome.tabs.create({url: "options.html"});
  });
   // Set a callback to run when the Google Visualization API is loaded.
  google.setOnLoadCallback(drawChart());
  // The Callback function will retrieve the data from local storage
  // draws the piecharts from the data and the tables
  function drawChart() 
  {  
    
    var websites = JSON.parse(localStorage.getItem("websites")) || [];// retrieve the data from local storage
    var data=[['Website', 'Hours']]; // set the headers
    var data2=[['Website', 'Hours']];
    var rows= [];
    var rows2=[]
	// Iterate through each website add it to the table and the chart 
    for(var i=0; i<websites.length; i++)   
    {
	// setup the table and data for today
      var time =Math.round( websites[i].today_min/60 * 100) / 100; // convert the time to minutes with two decimal places
      if(time>localStorage.getItem("min_time"))// only show the website if it above the min time threshold
      {
       data.push([websites[i].url,time]);
        var tbody = document.getElementById("table-body");
        var row = tbody.insertRow(tbody.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = websites[i].url;
        cell2.innerHTML = time;
        rows.push(row);
      }
	  // setup the table and data for the alltime chart
      time =Math.round(websites[i].alltime_min/60 * 100) / 100; // only show the website if it above the min time threshold
      if(time>localStorage.getItem("min_time")){

        data2.push([websites[i].url,time ]);
        var tbody = document.getElementById("table-body2");
        var row = tbody.insertRow(tbody.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML =websites[i].url;
        cell2.innerHTML = time;
        rows2.push(row);
      }
      
    }   
	// sort the table rows from most time to least time 
    sortRows(rows);
    sortRows(rows2); 
	
    var stats = google.visualization.arrayToDataTable(data);
    var stats2 = google.visualization.arrayToDataTable(data2);
	// set the chart options
    var options = 
    {
      title: "Websites visted Today",
      sliceVisibilityThreshold: 0.05,
      legend:
      {     
          textStyle: {color: 'black', fontSize: 14}
      },
      chartArea:{width:'85%',height:'55%'}
    

    };
	
    var options2 = 
    {
      title: "Websites visted Alltime",
      sliceVisibilityThreshold: 0.05,
      legend:
      {     
          textStyle: {color: 'black', fontSize: 14}
      },
      chartArea:{width:'85%',height:'55%'}
    

    };
	 // Draw the charts with the options and the data 
    var chart = new google.visualization.PieChart(document.getElementById('chart'));
    var chart2 = new google.visualization.PieChart(document.getElementById('chart2'));
    chart.draw(stats, options);
    chart2.draw(stats2,options2);
  }
 // sort the table rows from most time to least time 
  function sortRows(rows)
  {
    var $parent = $(rows[0]).parent();
    for (var i = 0; i < rows.length; i++) 
    {
            for (var j = 1; j < rows.length - i; j++) {
                if (parseFloat($(rows[j - 1]).children().eq(1).text()) < parseFloat($(rows[j]).children().eq(1).text())) {
                    var temp = rows[j - 1];
                    rows[j- 1] = rows[j];
                    rows[j] = temp;
                }
            }
      
 
    } 
    $parent.children().remove();
	var amount_of_websites_to_display = localStorage.getItem("amount_of_websites_to_display") || 7;
    $parent.append(rows.slice(0,amount_of_websites_to_display));
  }
});

   




