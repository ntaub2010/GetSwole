/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
//var LBUI = require('lbui');

//var exercise;

var main = new UI.Menu({
  sections: [{
    items: [{
      title: 'Upper Body',
    }, {
      title: 'Back'
    }, {
      title: 'Lower Body'
    }
        ]
  }] 
  
});

main.show();
/*main.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });*/



/*var lower_body_menu = new UI.menu({
        sections: [{
          items: [{
            title: 'Squats'
          }, {
            title: 'Deadlifts'
          }, {
            title: 'Leg Press'
          }]
        }]
      });*/

var lower_body_exercises = [ 
  {
  title: "Squats"
}, {
  title: "Deadlifts"
}, {
  title: "Leg Press"
}
  ];

var lower_body_menu = new UI.Menu({
        sections: [{
          title: "Lower Body Exercises",
          items: lower_body_exercises
        }]
      });

var number_window = new UI.Window();
var num_win_textfield = new UI.Text({
  position: new Vector2(0, 50),
  size: new Vector2(144, 30),
  font: 'gothic-24-bold',
  text: "Test",
  textAlign: 'center'
});
number_window.add(num_win_textfield);

function LB_chosen(exercise) {
      var squats_weight_options = [
      {
        title: "Weightless"
      }, {
        title: "With Weights"
      }
    ];
    
    var squats_weight = new UI.Menu({
      sections: [{
        title: exercise,
        items: squats_weight_options
      }]
    });
  squats_weight.on('select', function(g) {
    switch(g.item.title) {
      case "Weightless":
        number_window.show();
        break;
      case "With Weights":
        break;
    }
  });
   return squats_weight;
}

main.on('select', function(e) {
  console.log("hello");
  
  switch(e.item.title) {
    case "Upper Body":
      console.log("Upper Body");
      break;
    case "Back":
      console.log("Back");
      break;
    case "Lower Body":
      console.log("Lower Body");
      lower_body_menu.show();
        lower_body_menu.on('select', function(f) {
          console.log("weights");
          switch(f.item.title) {
            case "Squats":
              LB_chosen("Squats").show();
              break;
            case "Deadlifts":
              LB_chosen("Deadlifts").show();
              break;
            case "Leg Press":
              break;
          }
        });
      break;
  }
  });



/*main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    if(e.item.title == 'Upper Body') {
      console.log('Upper Body');
    }
    if(e.item.title == 'Back') {
      console.log('Lower Body');
    }
    if(e.item.title == 'Lower Body') {
      
      lower_body_menu.show();
      console.log('Lower Body');
    }
    /*console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});*/


/*main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});*/

/*main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});*/
