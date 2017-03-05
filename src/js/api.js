var Api = {
  version: 0.1,
  URL: "https://www.reddit.com/r/",
	data: []
};

Api.clear = function(){
	this.data = [];
};

Api.getSubreddit = function(sub, count, callback, after){
  var url = this.URL + sub + '/.json?limit=' + count;
	if(after) url = url+"&after="+after;
  var request = new XMLHttpRequest();
	var self = this;
	request.withCredentials = true;

  request.onerror = function (err) {
    console.log(err);
  };
 
  request.onreadystatechange = function() {
		var status;
		if (request.readyState == 4) { // `DONE`
			status = request.status;
			if (status == 200) {
				var data = JSON.parse(request.responseText).data;
				self.data = self.data.concat(parseResponse(data));
				if(self.data.length < 20){
					Api.getSubreddit(sub, count, callback, data.children[data.children.length-1].data.name);
				}
				else
					callback(self.data);
			} else {
				console.log(request.responseText);
        callback(status);
			}
		}
  };
  console.log(url);
  request.open("GET", url, true);
  request.send();
};

function parseResponse(data){
	var ret = [];
	for(var i = 0; i < data.children.length-1; i++){
		var item = data.children[i];
		if(item.data.selftext && item.data.selftext.length > 0){
			ret.push({
				title: item.data.title,
				subtitle: item.data.subreddit_name_prefixed,
				likes: item.data.score,
				text: item.data.selftext,
				id: item.data.name
			});
		}
	}
	return ret;
}

Pebble.addEventListener('ready', function() {
  console.log('Api is ready!!');  
});



module.exports = Api;