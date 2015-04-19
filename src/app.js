// version 2.3

/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
Accel.init();
var rep_limit = 1;

function save(name_str, dictionary) {
  // USE IT LIJKE save('player', {id: 1, score: 5});
  Settings.data(name_str, dictionary);

  
}



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

function choose_weight_num(ex) {
  var weight_num_values = [
    {
      title: "100 lb"
    }
  ];
  var weight_num = new UI.Menu({
    sections: [{
      title: ex,
      items: weight_num_values
    }]
  });
  return weight_num;
}



function num_win(exer) {
  //var first_accel;
  var number_window = new UI.Window({
    first_accel: null
  });
  var num_win_title = new UI.Text({
    position: new Vector2(0, 5),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: exer,
    textAlign: 'center'
  });
  var num_win_set = new UI.Text({
    position: new Vector2(0, 35),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: "Set",
    textAlign: 'center'
  });
  var num_win_reps = new UI.Text({
    position: new Vector2(0, 70),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: "Reps",
    textAlign: 'center'
  });
  number_window.add(num_win_title);
  number_window.add(num_win_set);
  number_window.add(num_win_reps);
  
  return number_window;
}

function set_number(ex) {
  var set_values = [10];
  for (var i = 0; i <= 9; i++) {
    set_values[i] = i;
  }
  var set_number_menu = new UI.Menu({
    title: "Set",
    items: set_values
  });
  return set_number_menu;
}

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
        num_win(exercise).show();
        break;
      case "With Weights":
        var new_menu = choose_weight_num(exercise);
        new_menu.show();
        new_menu.on('select', function(i) {
          var num_men = num_win(exercise);
          num_men.show();
          num_men.on('select', function(j) {
            var set_men = set_number(exercise);
            set_men.show();
          });
        });
        
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
