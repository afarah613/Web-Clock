google.load("visualization", "1", {packages: ["corechart"]});
$(document).ready(function() {
  
  $('#tabs').tab();
  

  google.setOnLoadCallback(drawChart());
  function drawChart() 
  {  
    
    var websites = JSON.parse(localStorage.getItem("websites"));
    var data=[['Website', 'Hours']];
    var data2=[['Website', 'Hours']];
    var rows= [];
    var rows2=[]
    for(var i=0; i<websites.length; i++)   
    {
      var time =Math.round( websites[i].today_min/60 * 10) / 10;
      if(time>0.5)
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
      time =Math.round(websites[i].alltime_min/60 * 10) / 10;
      if(time>0.5){

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
    sortRows(rows);  
    sortRows(rows2); 
    var stats = google.visualization.arrayToDataTable(data);
    var stats2 = google.visualization.arrayToDataTable(data2);
    var options = 
    {
      title: "Websites visted Today",
      sliceVisibilityThreshold: 0.05,
      legend:
      {     
          textStyle: {color: 'black', fontSize: 10}
      },
      chartArea:{width:'80px',height:'40px'}

    };
    var options2 = 
    {
      title: "Websites visted Alltime",
      sliceVisibilityThreshold: 0.05,
      legend:
      {     
          textStyle: {color: 'black', fontSize: 10}
      },
      chartArea:{width:'80px',height:'40px'}

    };
    var chart = new google.visualization.PieChart(document.getElementById('chart'));
    var chart2 = new google.visualization.PieChart(document.getElementById('chart2'));
    chart.draw(stats, options);
    chart2.draw(stats2,options2);
  }
 
  function sortRows(rows)
  {
    var $parent = $(rows[0]).parent();
    for (var i = 0; i < rows.length; i++) 
    {
            for (var j = 1; j < rows.length - i; j++) {
                if (parseInt($(rows[j - 1]).children().eq(1).text()) < parseInt($(rows[j]).children().eq(1).text())) {
                    var temp = rows[j - 1];
                    rows[j- 1] = rows[j];
                    rows[j] = temp;
                }
            }
      
 
    }
        
    $parent.children().remove();
   
    $parent.append(rows);
  }
});

   




