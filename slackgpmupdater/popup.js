document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('saveButton');
  // tie to click event of button to save
  link.addEventListener('click', function() {
    saveKey();
  });

  //populate textboxes with data
  var key1 = document.getElementById('key1');
  var key2 = document.getElementById('key2');
  var key3 = document.getElementById('key3');
  var key4 = document.getElementById('key4');
  var key5 = document.getElementById('key5');
  var enabled1 = document.getElementById('enabled1');
  var enabled2 = document.getElementById('enabled2');
  var enabled3 = document.getElementById('enabled3');
  var enabled4 = document.getElementById('enabled4');
  var enabled5 = document.getElementById('enabled5');
  chrome.storage.sync.get("keys",function (obj) {
    key1.value = obj.keys[0].key;
    enabled1.checked = obj.keys[0].enabled;
    key2.value = obj.keys[1].key;
    enabled2.checked = obj.keys[1].enabled;
    key3.value = obj.keys[2].key;
    enabled3.checked = obj.keys[2].enabled;
    key4.value = obj.keys[3].key;
    enabled4.checked = obj.keys[3].enabled;
    key5.value = obj.keys[4].key;
    enabled5.checked = obj.keys[4].enabled;
  });
});

function saveKey()
{
  var key1 = {key:document.getElementById('key1').value,enabled:document.getElementById('enabled1').checked};
  var key2 = {key:document.getElementById('key2').value,enabled:document.getElementById('enabled2').checked};
  var key3 = {key:document.getElementById('key3').value,enabled:document.getElementById('enabled3').checked};
  var key4 = {key:document.getElementById('key4').value,enabled:document.getElementById('enabled4').checked};
  var key5 = {key:document.getElementById('key5').value,enabled:document.getElementById('enabled5').checked};
  var keys = [key1,key2,key3,key4,key5];
  chrome.storage.sync.set({"keys":keys});
  console.log("Keys saved");
  window.close();
};