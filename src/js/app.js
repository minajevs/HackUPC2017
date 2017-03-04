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

var container = new UI.Window();
var textField = new UI.Text({
    text: "Loading",
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
});

// var image = new UI.Image({
//     position: new Vector2(0, 0),
//     size: new Vector2(144, 168),
//     image: 'LOADER'
// });

container.add(textField);
container.show();
api.getSubreddit("all", 20,function(data){
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
        // var w = new UI.Window({
	     //    scrollable: true
        // });
        // var textField = new UI.Text({
	     //    position: new Vector2(0, 0),
        //     size: new Vector2(144, 168),
	     //    text: e.item.title + '\n'
        //             + 'new line text' + '\n'
        //             + 'another new line'
        //             + 'new line text' + '\n'
        //             + 'new line text' + '\n'
        //             + 'new line text' + '\n'
        //             + 'new line text' + '\n'
        // });

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
// main.on('click', 'up', function(e) {
//   var menu = new UI.Menu({
//     sections: [{
//       items: [{
//         title: 'Pebble.js',
//         icon: 'images/menu_icon.png',
//         subtitle: 'Can do Menus'
//       }, {
//         title: 'Second Item',
//         subtitle: 'Subtitle Text'
//       }, {
//         title: 'Third Item'
//       }, {
//         title: 'Fourth Item'
//       }]
//     }]
//   });
//   menu.on('select', function(e) {
//     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
//     console.log('The item is titled "' + e.item.title + '"');
//   });
//   menu.show();
// });
//
// main.on('click', 'select', function(e) {
//   var wind = new UI.Window({
//     backgroundColor: 'black'
//   });
//   var radial = new UI.Radial({
//     size: new Vector2(140, 140),
//     angle: 0,
//     angle2: 300,
//     radius: 20,
//     backgroundColor: 'cyan',
//     borderColor: 'celeste',
//     borderWidth: 1,
//   });
//   var textfield = new UI.Text({
//     size: new Vector2(140, 60),
//     font: 'gothic-24-bold',
//     text: 'Dynamic\nWindow',
//     textAlign: 'center'
//   });
//   var windSize = wind.size();
//   // Center the radial in the window
//   var radialPos = radial.position()
//       .addSelf(windSize)
//       .subSelf(radial.size())
//       .multiplyScalar(0.5);
//   radial.position(radialPos);
//   // Center the textfield in the window
//   var textfieldPos = textfield.position()
//       .addSelf(windSize)
//       .subSelf(textfield.size())
//       .multiplyScalar(0.5);
//   textfield.position(textfieldPos);
//   wind.add(radial);
//   wind.add(textfield);
//   wind.show();
// });
//
// main.on('click', 'down', function(e) {
//   var card = new UI.Card();
//   card.title('A Card');
//   card.subtitle('Is a Window');
//   card.body('The simplest window type in Pebble.js.');
//   card.show();
// });
