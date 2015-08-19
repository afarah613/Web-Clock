 var blacklist = [];

$(document).ready(function () {

   
    
    $("#add").on("click", function () {
        var text = $("input").val();
        if (text.length > 0) {

            var tableRef = document.getElementById('blacklist').getElementsByTagName('tbody')[0];
            var newRow = tableRef.insertRow(tableRef.rows.length);
            var newCell = newRow.insertCell(0);
            var newText = document.createTextNode(text)
            newCell.appendChild(newText);
            blacklist.push(text);
            localStorage.setItem("blacklist", JSON.stringify(blacklist));
        }
    });
    $("#body").on("click", 'tr', function () {

        var text = $(this).text();
        var index = blacklist.indexOf(text);
        blacklist.splice(index,1);
        localStorage.blacklist = JSON.stringify(blacklist)
        $(this).remove();
    });

    $("#clear-history").on("click", function(){
      localStorage.websites= JSON.stringify([]);
  })
    function setupTables(){

        var websites = JSON.parse(localStorage.getItem("websites")) || [];
        blacklist = JSON.parse(localStorage.getItem("blacklist")) || [];
        console.log(blacklist);
        for(var i=0; i<websites.length; i++)   
        {
          var time =Math.round( websites[i].today_min/60 * 100) / 100;
          var tbody = document.getElementById("table-body");
          var row = tbody.insertRow(tbody.rows.length);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          cell1.innerHTML = websites[i].url;
          cell2.innerHTML = time;
        }

        for(var i=0; i< blacklist.length; i++)
        {
            var tbody = document.getElementById('blacklist').getElementsByTagName('tbody')[0];
            var row = tbody.insertRow(tbody.rows.length);
            var cell= row.insertCell(0);
            cell.innerHTML= blacklist[i];
        }
    }   
    setupTables();
});