 var blacklist = [];
 var Next = 7;
 var Prev = 0;
 // The setup function will create table showing the history of all the visted websites and list showing the blacklist.
function setup(){
    var rowData = document.getElementById("table-body").children;
    var DEFAULT_MIN_TIME =0;
    var DEFAULT_AMOUNT =7;
    // retrieve the daata from local storage
    var websites = JSON.parse(localStorage.getItem("websites")) || [];
    blacklist = JSON.parse(localStorage.getItem("blacklist")) || [];
    // iterate through each viseted website and add it to the table
    for(var i=0; i<websites.length; i++)   
    {
      var time =Math.round( websites[i].alltime_min/60 * 100) / 100; //convert the time to min with only two decimal places
      var tbody = document.getElementById("table-body");
      var row = tbody.insertRow(tbody.rows.length);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var button = document.createElement("button");
      button.className = "btn btn-xs close";
      button.innerHTML = "X";

      cell2.parentNode.appendChild(button)

      cell1.innerHTML = websites[i].url;
      cell2.innerHTML = time;
    }
// iterate through the black list and add it to the list
    for(var i=0; i< blacklist.length; i++)
    {
        var list = document.getElementById("blacklist");
        var a = document.createElement("a");
        var button = document.createElement("button");
        button.className = "btn btn-xs close";
        button.innerHTML = "X";
        a.appendChild(button);
        a.className = "list-group-item";
        var txtnode = document.createTextNode(blacklist[i]);
        a.appendChild(txtnode);
        list.appendChild(a);
    }
    // set the value to the saved values or if they are undefined the default values 
    document.getElementById("clear-history").value = localStorage.getItem("min_time") || DEFAULT_MIN_TIME;
    document.getElementById("num-display").value =localStorage.getItem("amount_of_websites_to_display")|| DEFAULT_AMOUNT;
    // sort the table
     sortTable();
     // 
     
     if(rowData.length-1< Next && rowData.length-1 >= Prev)
    {
    
     document.getElementById("Next").style.display = "none";
    }
}  
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
} 
 function sortTable(){

    var tableData = document.getElementById("table-body");
    var rowData = document.getElementById("table-body").children;
    
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
    var i= rowData.length -1;
    
    while(i>6)
    {
      rowData[i].style.display= "none";
      i--;
    }
    document.getElementById("Prev").style.display = "none";

  }
function next(){
  var rowData = document.getElementById("table-body").children;

  for(var i = Prev; i<Next+7; i++)
  {
    if(i < Next && rowData[i])
      rowData[i].style.display = "none";
    else if(rowData[i])
    {
      rowData[i].style.display = "table-row";
    }
  }

  Prev+=7;
  Next +=7;
  document.getElementById("Prev").style.display = "inline-block";
  if(Next>rowData.length-1 && rowData.length-1 >= Prev)
  {
    
     document.getElementById("Next").style.display = "none";
  }
}

function prev(){
  var rowData = document.getElementById("table-body").children;
  for(var i = Next; i>= Prev-7; i--)
  {

    if(i >= Prev && rowData[i])
    {
      rowData[i].style.display = "none";
      
    }
    else if(rowData[i])
    {
      rowData[i].style.display = "table-row";
    }

  }
  Prev-=7;
  Next-=7;
  document.getElementById("Next").style.display = "inline-block";
  if(Prev==0)
     document.getElementById("Prev").style.display = "none";
}
function deleteWebsite(url)
{
  websites= JSON.parse(localStorage.getItem("websites"));
  for(var i =0; i< websites.length; i++)
  {
    if(websites[i].url === url)
    {
      websites.splice(i,1);
      localStorage.setItem("websites", JSON.stringify(websites));
    }
  }
}
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("Next").addEventListener("click", next);
  document.getElementById("Prev").addEventListener("click", prev);
	// save value in local storage when it changes
    document.getElementById("num-display").addEventListener("input", function(e){
      
        localStorage.setItem("amount_of_websites_to_display", e.target.value);
    });
	// save value in local storage when it changes
     document.getElementById("min-time").addEventListener("input", function(e){
        localStorage.setItem("min_time", e.target.value);
    });
    // if the clear history button is pressed set websites to an empty array and fadeOut the table's body
     document.getElementById("clear-history").addEventListener("click", function(){
      localStorage.websites= JSON.stringify([]);
      var table = document.getElementById("hist");
      fade(table);
     // document.getElementById("hist").remove(); 
	})
	 // add the url entered to the blacklist
     document.getElementById("add").addEventListener("click", function(){
        var text = document.getElementById("url").value;

        if (text.length > 0) 
		{
            var list = document.getElementById("blacklist");
            var a = document.createElement("a");
            var button = document.createElement("button");
            button.className = "btn btn-xs close";
            button.innerHTML = "X";
            a.appendChild(button);
            a.className = "list-group-item";
            var txtnode = document.createTextNode(text);
            a.appendChild(txtnode);
            list.appendChild(a);
            blacklist.push(text);
            localStorage.setItem("blacklist", JSON.stringify(blacklist));
        }
    });
     document.getElementById("blacklist").addEventListener("click", function(e){

          if(e.target.className === "btn btn-xs close")
          {
            fade(e.target.parentNode);
            var i = blacklist.indexOf(e.target.parentNode.value);
            blacklist.splice(i,1);
            localStorage.setItem("blacklist", JSON.stringify(blacklist));
          }

     });
     document.getElementById("table-body").addEventListener("click", function(e){
          if(e.target.className === "btn btn-xs close")
          {
            deleteWebsite(e.target.parentNode.children[0].innerHTML);
            fade(e.target.parentNode);
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
          }
     })
 
    setup();
});