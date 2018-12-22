'use strict';

var savedTabID = -1;

chrome.runtime.onInstalled.addListener(function() {
  
  chrome.storage.sync.get("keys",function (obj) {
    if(obj === undefined)
    {
      var keys = {};
      keys["key1"] = "";
      keys["key2"] = "";
      keys["key3"] = "";
      keys["key4"] = "";
      keys["key5"] = "";
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
  if(tab.url.startsWith("https://play.google.com/music/listen#"))
  {
    //Here is where we can parse and update slack!
    savedTabID = tab.id;
    console.log("Tab Title: " + tab.title);
    console.log("Is music playing? " +tab.audible);

    if(tab.audible)
    {
      var res = tab.title.split(" - ");
            
      if(res.length == 3)
      {
        chrome.storage.sync.get("keys",function (obj) {
          if(obj.keys.key1 != "")
          {
            updateStatus(obj.keys.key1,res);
          }
          if(obj.keys.key2 != "")
          {
            updateStatus(obj.keys.key2,res);
          }
          if(obj.keys.key3 != "")
          {
            updateStatus(obj.keys.key3,res);
          }
          if(obj.keys.key4 != "")
          {
            updateStatus(obj.keys.key4,res);
          }
          if(obj.keys.key5 != "")
          {
            updateStatus(obj.keys.key5,res);
          }
        });
      }
      else
      {
        chrome.storage.sync.get("keys",function (obj) {
          if(obj.keys.key1 != "")
          {
            wipeStatus(obj.keys.key1);
          }
          if(obj.keys.key2 != "")
          {
            wipeStatus(obj.keys.key2);
          }
          if(obj.keys.key3 != "")
          {
            wipeStatus(obj.keys.key4);
          }
          if(obj.keys.key4 != "")
          {
            wipeStatus(obj.keys.key4);
          }
          if(obj.keys.key5 != "")
          {
            wipeStatus(obj.keys.key5);
          }
        });
      }
    }
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  if(tabId == savedTabID)
  {
    console.log("Tab closing!");
    chrome.storage.sync.get("keys",function (obj) {
      if(obj.keys.key1 != "")
      {
        wipeStatus(obj.keys.key1);
      }
      if(obj.keys.key2 != "")
      {
        wipeStatus(obj.keys.key2);
      }
      if(obj.keys.key3 != "")
      {
        wipeStatus(obj.keys.key4);
      }
      if(obj.keys.key4 != "")
      {
        wipeStatus(obj.keys.key4);
      }
      if(obj.keys.key5 != "")
      {
        wipeStatus(obj.keys.key5);
      }
    });
    savedTabID = -1;
  }
});

function wipeStatus(token) {
  var json = "{\"status_text\": \"" + "" + "\",\"status_emoji\": \"" + "" + "\"}";
  var Url = "https://slack.com/api/users.profile.set?profile=" + escape(json) + "&token=" + token;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", Url, true );
  xmlHttp.send( null );
  console.log("Wiped status");
  return;
}

function updateStatus(token, res)
{
  var json = "{\"status_text\": \"" + res[1] + " - " + res[0] + "\",\"status_emoji\": \"" + ":musical_note:" + "\"}";
  var Url = "https://slack.com/api/users.profile.set?profile=" + escape(json) + "&token=" + token;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", Url, true );
  xmlHttp.send( null );
  console.log("Updated status");
};
