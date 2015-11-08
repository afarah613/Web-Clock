
// Load the Visualization API and the piechart package.
google.load("visualization", "1", {packages: ["corechart"]});
function convertTime(seconds)
{
  if(seconds < 60)
        return Math.floor(seconds) + " seconds";
    else if( seconds>=60 && seconds <3600)
    {
      minutes = Math.floor(seconds/60);
      seconds = seconds % 60;
      return  minutes + " minutes and " + convertTime(seconds);
    }
    else if( seconds>= 3600 && seconds <84600)
    {
       Hours = Math.floor(seconds/3600);
       seconds = seconds % 3600;
       return Hours + " hour(s) and " + convertTime(seconds);
    }
    else
    {
       day = Math.floor(seconds/84600);
       seconds = seconds % 84600;
       return day + " day(s) and " + convertTime(seconds);
    }
}
function drawChart(type) 
  {  
    
    var websites = JSON.parse(localStorage.getItem("websites")) || [];// retrieve the data from local storage
    var data=[['Website', 'Hours']]; // set the headers
    var tbody = document.getElementById("table-body" + type);
    var display = localStorage.getItem("amount_of_websites_to_display") || 7;
    var total =0;
     
  // Iterate through each website add it to the table and the chart 
    for(var i=0; i<websites.length ; i++)   
    {
  // setup the table and data for today
      if(type === "today")
      {
        var time = websites[i].today_min; 
       
      }
      else{
         var time =websites[i].alltime_min; 
        
     }

      if(time>localStorage.getItem("min_time"))// only show the website if it above the min time threshold
      {
        data.push([websites[i].url,time]);
        var row = tbody.insertRow(tbody.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = websites[i].url;
        cell2.innerHTML = time; 
        total+= time;
      } 
    } 
     sortTable(type, display);
     total = Math.round(total*100)/100;
     var row = tbody.insertRow(tbody.rows.length);
     row.id = "final";
     var cell1 = row.insertCell(0);
     var cell2 = row.insertCell(1);
     cell1.innerHTML ="Total Time";
     cell2.innerHTML = total;
     timeWords(type);
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
      chartArea:{width:'85%',height:'56%', left: 30, top: 30},
      tooltip:{trigger:'none'} 
     

    };
  
  
   // Draw the charts with the options and the data 
    var chart = new google.visualization.PieChart(document.getElementById(type +1));
   

    chart.draw(stats, options);
   
  }
  function timeWords(type)
  {
    var rowData = document.getElementById("table-body" + type).children;
    for(var i =0 ; i< rowData.length; i++)
    {
        rowData[i].children[1].innerHTML = convertTime(rowData[i].children[1].innerHTML);

    }
  }
  function sortTable(type,display){

    var tableData = document.getElementById("table-body" + type);
    var rowData = document.getElementById("table-body" + type).children;
    
    for(var i = 0; i < rowData.length - 1; i++){
      for(var j=i+1; j< rowData.length; j++)
      {
        x= parseFloat(rowData[i].children[1].innerHTML);

        y = parseFloat(rowData[j].children[1].innerHTML);
        
        if(x<y)
        {
        
           tableData.insertBefore(rowData[j], rowData[i]);
        }
      }        
    } 
    var i= rowData.length -display;
    while(i>0)
    {
      tableData.deleteRow(rowData.length-1);
      i--;
    }


  }


document.addEventListener("DOMContentLoaded", function(){
  // if the option tabs is pressed open up a new tab with 
  
	document.getElementById("options").addEventListener("click", function(){
        chrome.tabs.create({url: "options.html"});
  });

  document.getElementById("tabs").addEventListener("click", function(e){

     var curr = document.getElementsByClassName("active")[0];
     var next = document.getElementById(e.target.innerHTML.toLowerCase());
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

   




