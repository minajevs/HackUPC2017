var Api = {
  version: 0.1,
  URL: "https://www.reddit.com/r/",
  callback: ''
};

Api.getSubreddit = function(sub, callback){
  var url = this.URL + sub + '/.json?limit=1';
  this.callback = callback;
  var request = new XMLHttpRequest();
	request.withCredentials = true;


  request.onerror = function (err) {
    console.log(err);
  };

  request.onreadystatechange = function() {
		var status;
		var data;
    console.log(request.readyState);
		if (request.readyState == 4) { // `DONE`
			status = request.status;
			if (status == 200) {
				data = JSON.parse(request.responseText);
        Api.callback(data);
			} else {
				console.log(request.responseText);
        Api.callback(status);
			}
		}
  };
  console.log(url);
  request.open("GET", url, true);
  request.send();
};

Pebble.addEventListener('ready', function() {
  console.log('Api is ready!!');  
});



module.exports = Api;