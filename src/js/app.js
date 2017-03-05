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

var loaded = false;
var pages = [];
var selectedSub = "";
var lastElement = "";

var container = new UI.Window();
var textField = new UI.Text({
    text: "Loading",
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
	});
container.on('show', function(){
	console.log(pages.length);
	if(loaded) {
		if(pages.length > 0)
			pages.pop();
		if(pages.length > 0){
			pages[pages.length-1].show();
		}else
			mainMenu.show();
	}
});

mainMenu.on('select', function(e){
	selectedSub = e.item.item;
	loaded = false;
	container.add(textField);
	container.show();
	api.clear();
	api.getSubreddit(selectedSub, 20, onSubLoad);
});

function onSubLoad(data){
		loaded = true;
		lastElement = data[data.length-1].id;
		var items = addNavigation(data);
		var redditMenu = new UI.Menu({
	    sections: [{
	      items: items
			}]
	 	});
		pages.push(redditMenu);
		
	  redditMenu.on('select', function(e) { 
			if(e.item.type === "navigation"){	
				console.log("LAST:"+lastElement);
				loaded = false;
				container.show();
				api.clear();
				api.getSubreddit(selectedSub, 20, onSubLoad, lastElement);
			} else {
				var main = new UI.Card({
					title: e.item.title,
	    		subtitle: e.item.subtitle + " - " + e.item.likes,
	     		body: e.item.text,
	     		scrollable: true
	    	});
				main.show();
			}
	  });
	
	  redditMenu.show();
}


function addNavigation(data){
	data.push({
		title: ">Load more",
		type: "navigation"
	});
	return data;
};
	
mainMenu.show();