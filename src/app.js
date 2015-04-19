// version 2.3

/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Settings = require('settings');
function save(name_str, dictionary) {
  // USE IT LIKE save('player', {id: 1, score: 5});
  Settings.data(name_str, dictionary);
}

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd;
} 

if(mm<10) {
    mm='0'+mm;
} 

today = mm+'/'+dd+'/'+yyyy;


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
      title: "90 lb"
    }, {
      title: "95 lb"
    }, {
      title: "100 lb"
    }, {
      title: "105 lb"
    }, {
      title: "110 lb"
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

function set_number(ex) {
  var set_values = [
    {
      title: "1"
    }, {
      title: "2"
    }, {
      title: "3"
    }, {
      title: "4"
    }, {
      title: "5"
    }
  ];
  var set_number_menu = new UI.Menu({
    sections: [{
      title: "Set number",
      items: set_values
    }] 
    
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
   return squats_weight;
}

function reps(ex) {
  var rep_values = [
    {
      title: "1"
    }, {
      title: "2"
    }, {
      title: "3"
    }, {
      title: "4"
    }, {
      title: "5"
    }, {
      title: "6"
    }, {
      title: "7"
    }, {
      title: "8"
    }, {
      title: "9"
    }, {
      title: "10"
    }
  ];
  var rep_number_menu = new UI.Menu({
    sections: [{
      title: "Reps completed",
      items: rep_values
    }] 
    
  });
  return rep_number_menu;
}

function print_time() {
  var time_now = new Date();
  var secs = ((time_now.getTime())/1000)%60;
  var min = ((time_now.getTime())/(1000*60)%60);
  var hour = ((time_now.getTime())/(1000*60*60)%60) - 40;
  var time = hour.toFixed(0) + ":" + min.toFixed(0) + ":" + secs.toFixed(0);
  return time;
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
              var squats_menu = LB_chosen("Squats");
              var exer = f.item.title;
              squats_menu.show();
              squats_menu.on('select', function(g) {
                switch(g.item.title) {
                  case "Weightless":
                    var weight_choice = g.item.title;
                    var set_nums = set_number("Squats");
                    set_nums.show();
                    set_nums.on('select', function (i) {
                      var sets = i.item.title;
                      var rep_nums = reps("Squats");
                      rep_nums.show();
                      rep_nums.on('select', function(j) {
                        var reps = j.item.title;
                        var time = print_time();
                        var date_and_time = today + " " + time;
                        var date_time = date_and_time;
                        //var sets_and_reps = sets + "-" + reps;
                        save(date_time, {exercise: exer, weight: weight_choice, sets: sets, reps: reps, time: time, date: today});
                        console.log("This is where save should execute");
                        //var workout_record = Settings.data('workout_record');
                        //console.log(workout_record.time);
                        var data = Settings.data();
                        console.log(JSON.stringify(data));
                        // date_and_time: date_and_time, , , sets_reps: sets_and_reps
                      });
                    });
                    break;
                  case "With Weights":
                    var weights_num_menu = choose_weight_num("Squats");
                    weights_num_menu.show();
                    weights_num_menu.on('select', function(h) {
                      var set_nums = set_number("Squats");
                      set_nums.show();
                      set_nums.on('select', function (i) {
                      var rep_nums = reps("Squats");
                      rep_nums.show();
                    });
                    });
                    break;
                }
              });
              break;
            case "Deadlifts":
              var deadlifts_menu = LB_chosen("Deadlifts");
              deadlifts_menu.show();
              deadlifts_menu.on('select', function(g) {
                switch(g.item.title) {
                  case "Weightless":
                    var set_nums = set_number("Deadlifts");
                    set_nums.show();
                    set_nums.on('select', function (i) {
                      var rep_nums = reps("Squats");
                      rep_nums.show();
                    });
                    break;
                  case "With Weights":
                    var weights_num_menu = choose_weight_num("Deadlifts");
                    weights_num_menu.show();
                    weights_num_menu.on('select', function(h) {
                      var set_nums = set_number("Deadlifts");
                      set_nums.show();
                      set_nums.on('select', function (i) {
                      var rep_nums = reps("Squats");
                      rep_nums.show();
                    });
                    });
                    break;
                }
              });
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
