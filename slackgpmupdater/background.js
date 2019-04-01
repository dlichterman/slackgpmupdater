'use strict';

var savedTabID = -1;
var isWiped = false;
var currentTitle = "";

chrome.runtime.onInstalled.addListener(function() {
  
  chrome.storage.sync.get("keys",function (obj) {
	if(obj[0] == null) //this needs work still
    {
      var keys = [];
      keys[0] = "";
      keys[1] = "";
      keys[2] = "";
      keys[3] = "";
      keys[4] = "";
      chrome.storage.sync.set({"keys":keys}, function() {
      console.log("The keys are set up.");
      });
    }
    else
    {
      console.log("The keys are already set up, no need to set them.");
    }
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(tab.url.startsWith("https://play.google.com/music/listen"))
  {
    //Here is where we can parse and update slack!
    savedTabID = tab.id;
    console.log("Tab Title: " + tab.title);
    console.log("Is music playing? " +tab.audible);
	
    if(tab.audible)
    {
      if(currentTitle != tab.title)
      {
        var res = tab.title.split(" - ");
              
        if(res.length == 3)
        {
          chrome.storage.sync.get("keys",function (obj) {
            for(var i = 0;i<obj.keys.length;i++)
            {
              if(obj.keys[i] != "")
              {
                updateStatus(obj.keys[i],res);
                isWiped = false;
                currentTitle = tab.title;
              }
            }
          });
        }
      }
    }
    else
    {
      wipeStatus();
    }
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  if(tabId == savedTabID)
  {
    console.log("Tab closing!");
    isWiped = false;
    wipeStatus();
    savedTabID = -1;
  }
});

function wipeStatus()
{
  if(!isWiped)
  {
    chrome.storage.sync.get("keys",function (obj) {
      for(var i = 0;i<obj.keys.length;i++)
          {
            if(obj.keys[i] != "")
            {
              wipeStatusToken(obj.keys[i]);
            }
          }
    });
    isWiped = true;
  }
}

function wipeStatusToken(token) {
  var json = "{\"status_text\": \"" + "" + "\",\"status_emoji\": \"" + "" + "\"}";
  var Url = "https://slack.com/api/users.profile.set?profile=" + escape(json) + "&token=" + token;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", Url, true );
  xmlHttp.send( null );
  console.log("Wiped status - " + token.substr(token.length - 5));
  return;
}

function updateStatus(token, res)
{
  var json = "{\"status_text\": \"" + res[1] + " - " + res[0] + "\",\"status_emoji\": \"" + ":musical_note:" + "\"}";
  var Url = "https://slack.com/api/users.profile.set?profile=" + escape(json) + "&token=" + token;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", Url, true );
  xmlHttp.send( null );
  console.log("Updated status - " + token.substr(token.length - 5));
  return;
}; 