function costumStart()
{
  //define your javascript here
  //jquery is avaiable - except index.js
  //you can load extra scripts with $.getScript http://api.jquery.com/jQuery.getScript/

chat.addMessage = function(msg, increment)
    {    
      //correct the time
      msg.time += pad.clientTimeOffset; 
      
      //create the time string
      var minutes = "" + new Date(msg.time).getMinutes();
      var hours = "" + new Date(msg.time).getHours();
      if(minutes.length == 1)
        minutes = "0" + minutes ;
      if(hours.length == 1)
        hours = "0" + hours ;
      var timeStr = hours + ":" + minutes;
        
      //create the authorclass
      var authorClass = "author-" + msg.userId.replace(/[^a-y0-9]/g, function(c)
      {
        if (c == ".") return "-";
        return 'z' + c.charCodeAt(0) + 'z';
      });

      var text = padutils.escapeHtmlWithClickableLinks(padutils.escapeHtml(msg.text), "_blank");

      /* Performs an action if your name is mentioned */
      var myName = $('#myusernameedit').val();
      myName = myName.toLowerCase();
      var chatText = text.toLowerCase();
      var wasMentioned = false;
      if (chatText.indexOf(myName) !== -1 && myName != "undefined"){
        wasMentioned = true;
      }
      /* End of new action */

      var authorName = msg.userName == null ? "unnamed" : padutils.escapeHtml(msg.userName); 
      
      var html = "<p class='" + authorClass + "'><b>" + authorName + ":</b><span class='time'>" + timeStr + "</span> " + text + "</p>";
      $("#chattext").append(html);
      
      //should we increment the counter??
      if(increment)
      {
        var count = Number($("#chatcounter").text());
        count++;
        $("#chatcounter").text(count);
        // chat throb stuff -- Just make it throw for twice as long
        if(wasMentioned)
        { // If the user was mentioned show for twice as long and flash the browser window

          $('#chatthrob').html("<b>"+authorName+"</b>" + ": " + text);
          $('#chatthrob').css('background-color','rgba(150, 0, 0, 0.7)')
          $('#chatthrob').css('box-shadow','0 0 3px 6px rgba(150, 0, 0, 0.7)');
            
          $('#chatthrob').effect("pulsate", {times:3,mode:"show"},500).delay(10000).fadeOut('fast',function(){$('#chatthrob').css('background-color','rgba(0, 0, 0, 0.7)');$('#chatthrob').css('box-shadow','0 0 3px 6px rgba(0, 0, 0, 0.7)')})
        }
        else
        {
          $('#chatthrob').html("<b>"+authorName+"</b>" + ": " + text);
          $('#chatthrob').fadeIn().delay(6000).fadeOut();
        }
      }
   }
}
