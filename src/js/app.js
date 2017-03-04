var UI = require('ui');
var Vector2 = require('vector2');
var api = require('./api.js');

// var main = new UI.Card({
//   title: 'Reddit app!',
//   icon: 'images/menu_icon.png',
//   subtitle: 'Hello World!',
//   body: 'Press any button.',
//   subtitleColor: 'indigo', // Named colors
//   bodyColor: '#9a0036' // Hex colors
// });
//
// main.show();

var subs = [
	"all",
	"jokes",
	"todayilearned",
	"shittyaskscience"
];

var items = subs.map(function(item){
	return {
		title: "r/"+item,
		item: item
	};
});

var mainMenu = new UI.Menu({
	sections:[{
		title: "Select subreddit!",
		items: items
		}]
});

mainMenu.on('select', function(e){
	var loaded = false;
	var container = new UI.Window();
	var textField = new UI.Text({
    text: "Loading",
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
	});
	container.on('show', function(){
		if(loaded) mainMenu.show();
	});
	container.add(textField);
	container.show();
	api.clear();
	api.getSubreddit(e.item.item, 20, function(data){
		loaded = true;
		console.log(data.length);
	  for(var i = 0; i < data.length-1; i++){
			console.log(data[i].title);
		}
		var items = data;
		var redditMenu = new UI.Menu({
	    sections: [{
	      items: items
			}]
	  	});
	
	    redditMenu.on('select', function(e) { 
	        var main = new UI.Card({
	            title: e.item.title,
	            subtitle: e.item.subtitle + " - " + e.item.likes,
	            body: e.item.text,
	            // subtitleColor: 'indigo', // Named colors
	            // bodyColor: '#9a0036', // Hex colors
	            scrollable: true
	        });
	
	        main.show();
	    });
	
	  redditMenu.show();
	});
});
	
mainMenu.show();