 var blacklist = [];

$(document).ready(function () { 
	// save value in local storage when it changes
    $("#num-display").on("input", function(){
        localStorage.setItem("amount_of_websites_to_display", $(this).val());
    });
	// save value in local storage when it changes
    $("#min-time").on("input", function(){
        localStorage.setItem("min_time", $(this).val());
    });
    // if the clear history button is pressed set websites to an empty array and fadeOut the table's body
    $("#clear-history").on("click", function(){
      localStorage.websites= JSON.stringify([]);
      $("#table-body").fadeOut(600, function() { $(this).remove(); });
	})
	 // add the url entered to the blacklist
    $("#add").on("click", function () {
        var text = $("input").val();
        if (text.length > 0) 
		{
            var list = document.getElementById("blacklist");
            var a = document.createElement("a");
            a.className = "list-group-item";
            var txtnode = document.createTextNode(text);
            a.appendChild(txtnode);
            list.appendChild(a);
            blacklist.push(text);
            localStorage.setItem("blacklist", JSON.stringify(blacklist));
        }
    });
  // The setup function will create table showing the history of all the visted websites and list showing the blacklist.
    function setup(){
		
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
          cell1.innerHTML = websites[i].url;
          cell2.innerHTML = time;
        }
	// iterate through the black list and add it to the list
        for(var i=0; i< blacklist.length; i++)
        {
            var list = document.getElementById("blacklist");
            var a = document.createElement("a");
            a.className = "list-group-item";
            var txtnode = document.createTextNode(blacklist[i]);
            a.appendChild(txtnode);
            list.appendChild(a);
        }
		// set the value to the saved values or if they are undefined the default values 
        $("#min-time").val( localStorage.getItem("min_time") || DEFAULT_MIN_TIME);
        $("#num-display").val(localStorage.getItem("amount_of_websites_to_display")|| DEFAULT_AMOUNT);
    }   
    setup();
});