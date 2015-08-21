 var blacklist = [];

$(document).ready(function () {

   
    
    $("#add").on("click", function () {
        var text = $("input").val();
        if (text.length > 0) {

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
    $("#num-display").on("input", function(){
        localStorage.setItem("amount-to-display", $(this).val());
    });
    $("#min-time").on("input", function(){
        localStorage.setItem("min-time", $(this).val());
    });
    $("#blacklist").on("click", 'a', function () {

        var text = $(this).text();
        var index = blacklist.indexOf(text);
        blacklist.splice(index,1);
        localStorage.blacklist = JSON.stringify(blacklist)
        $(this).remove();
    });

    $("#clear-history").on("click", function(){
      localStorage.websites= JSON.stringify([]);
      $("#table-body").fadeOut(600, function() { $(this).remove(); });


  })
    function setup(){

        var websites = JSON.parse(localStorage.getItem("websites")) || [];
        blacklist = JSON.parse(localStorage.getItem("blacklist")) || [];
        for(var i=0; i<websites.length; i++)   
        {
          var time =Math.round( websites[i].alltime_min/60 * 100) / 100;
          var tbody = document.getElementById("table-body");
          var row = tbody.insertRow(tbody.rows.length);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          cell1.innerHTML = websites[i].url;
          cell2.innerHTML = time;
        }

        for(var i=0; i< blacklist.length; i++)
        {
            var list = document.getElementById("blacklist");
            var a = document.createElement("a");
            a.className = "list-group-item";
            var txtnode = document.createTextNode(blacklist[i]);
            a.appendChild(txtnode);
            list.appendChild(a);
        }
                $("#min-time").val( localStorage.getItem("min-time") || 0) ;
                $("#num-display").val(localStorage.getItem("amount-to-display")|| 7)
    }   
    setup();
});