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
  chrome.storage.sync.get("keys",function (obj) {
    key1.value = obj.keys[0];
    key2.value = obj.keys[1];
    key3.value = obj.keys[2];
    key4.value = obj.keys[3];
    key5.value = obj.keys[4];
  });
});

function saveKey()
{
  var key1 = document.getElementById('key1').value;
  var key2 = document.getElementById('key2').value;
  var key3 = document.getElementById('key3').value;
  var key4 = document.getElementById('key4').value;
  var key5 = document.getElementById('key5').value;
  var keys = [key1,key2,key3,key4,key5];
  chrome.storage.sync.set({"keys":keys});
  console.log("Keys saved");
};