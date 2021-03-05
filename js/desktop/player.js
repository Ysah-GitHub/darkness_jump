app.player = {
  width: null,
  height: null,
  x: null,
  y: null,
  x_min: null,
  x_max: null,
  y_min: null,
  y_max: null,
  blur: null,
  color: "rgb(50, 170, 255)",
  speed: {value: null, base: null, move: null, gravity: null},
  move: {key: [], action: [], interval: null},
  dash: {active: false, velocity: null, interval: null},
  jump: {active: false, double: false, interval: null}
};

function player_load(){
  player_size_default();
  player_position_default();
  player_position_limit_default();
  player_speed_default();
  player_control_default();
}

function player_size_default(){
  app.player.width = Math.round(app.engine.height / 30);
  app.player.height = Math.round(app.engine.height / 30);
  app.player.blur = app.player.width * 0.2;
}

function player_position_default(){
  app.player.x = app.engine.width * 0.1;
  app.player.y = app.engine.ground_height - app.player.height;
}

function player_position_limit_default(){
  app.player.x_min = 0;
  app.player.x_max = app.engine.width - app.player.width;
  app.player.y_min = 0;
  app.player.y_max = app.engine.ground_height - app.player.height;
}

function player_speed_default(){
  app.player.speed.value = 1;
  app.player.speed.base = (app.player.width + app.player.height) / 60;
  app.player.speed.move = (app.player.speed.base * (1000 / app.config.video.interval)) * app.player.speed.value;
  app.player.speed.jump = app.player.speed.move / 2;
  app.player.speed.gravity = app.player.speed.jump;
}

function player_control_default(){
  control_keydown_action_add("left", "player_move_add", player_move_add, ["left", player_move_left], true);
  control_keydown_action_add("left", "player_move", player_move, ["left"], true);
  control_keydown_action_add("right", "player_move_add", player_move_add, ["right", player_move_right], true);
  control_keydown_action_add("right", "player_move", player_move, ["right"], true);
  control_keydown_action_add("dash", "player_move_dash", player_move_dash, [], false);
  control_keydown_action_add("jump", "player_move_jump", player_move_jump, [], true);
}

function player_control_remove(){
  control_keydown_action_remove("left", "player_move_add");
  control_keydown_action_remove("left", "player_move");
  control_keydown_action_remove("right", "player_move_add");
  control_keydown_action_remove("right", "player_move");
  control_keydown_action_remove("dash", "player_move_dash");
  control_keydown_action_remove("jump", "player_move_jump");
  control_keydown_action_remove("jump", "player_move_jump_active");
  control_keydown_action_remove("jump", "player_move_jump_double");

  control_keyup_action_remove("left", "player_move_remove");
  control_keyup_action_remove("right", "player_move_remove");
  control_keyup_action_remove("jump", "player_move_jump_clear");
  control_keyup_action_remove("jump", "player_move_jump_down");
  control_keyup_action_remove("jump", "player_move_jump_active");
  control_keyup_action_remove("jump", "player_move_jump_double");
}

function player_move(key){
  if (app.player.move.key.length > 1) {
    player_move_clear();
  }
  let tmp_index = (app.player.move.action.length - 1);
  app.player.move.interval = setInterval(app.player.move.action[tmp_index], 1000 / app.config.video.interval);
}

function player_move_add(key, action){
  app.player.move.key.push(key);
  app.player.move.action.push(action);
  control_keyup_action_add(key, "player_move_remove", player_move_remove, [key, action], true);
}

function player_move_remove(key, action){
  for (let i = 0; i < app.player.move.key.length; i++) {
    if (app.player.move.key[i] == key) {
      app.player.move.key.splice(i, 1);
      app.player.move.action.splice(i, 1);
      control_keydown_action_add(key, "player_move_add", player_move_add, [key, action], true);
      control_keydown_action_add(key, "player_move", player_move, [key], true);
      player_move_clear();
      if (app.player.move.key.length > 0) {
        let tmp_index = (app.player.move.key.length - 1);
        player_move(app.player.move.key[tmp_index]);
      }
      break;
    }
  }
}

function player_move_clear(){
  clearInterval(app.player.move.interval);
}

function player_move_reset(){
  app.player.move = {key: [], action: [], interval: null, base: null};
}

function player_move_left(){
  app.player.x -= app.player.speed.move;
  if (app.player.x < app.player.x_min) {
    app.player.x = app.player.x_min;
  }
}

function player_move_right(){
  app.player.x += app.player.speed.move;
  if (app.player.x > app.player.x_max) {
    app.player.x = app.player.x_max;
  }
}

function player_move_dash(){
  if (!app.player.dash.active) {
    let tmp_move = app.player.move.key[app.player.move.key.length - 1]
    if (tmp_move == "right" || tmp_move == "left") {
      app.player.dash.active = true;
      app.player.dash.velocity = 2;
      control_keydown_action_remove("jump", "player_move_jump");
      control_keydown_action_remove("jump", "player_move_jump_double");
      control_keyup_action_remove("jump", "player_move_jump_clear");
      control_keyup_action_remove("jump", "player_move_jump_down");
      control_keyup_action_remove("jump", "player_move_jump_double");
      player_move_jump_clear();
      if (tmp_move == "right") {
        app.player.dash.interval = setInterval(player_move_dash_right, 1000 / app.config.video.interval, (1000 / app.config.video.interval) / 80);
      }
      else if (tmp_move == "left") {
        app.player.dash.interval = setInterval(player_move_dash_left, 1000 / app.config.video.interval, (1000 / app.config.video.interval) / 80);
      }
    }
  }
}

function player_move_dash_left(velocity_decrement){
  app.player.dash.velocity -= velocity_decrement;
  app.player.x -= app.player.speed.move * app.player.dash.velocity;
  if (app.player.dash.velocity < 0 || app.player.x < app.player.x_min) {
    clearInterval(app.player.dash.interval);
    if (app.player.x < app.player.x_min) {
      app.player.x = app.player.x_min;
    }
    if (app.player.y == app.player.y_max) {
      player_move_jump_down(1, velocity_decrement);
    }
    else {
      player_move_jump_down(1, velocity_decrement);
    }
  }
}

function player_move_dash_right(velocity_decrement){
  app.player.dash.velocity -= velocity_decrement;
  app.player.x += app.player.speed.move * app.player.dash.velocity;
  if (app.player.dash.velocity < 0 || app.player.x > app.player.x_max) {
    clearInterval(app.player.dash.interval);
    if (app.player.x > app.player.x_max) {
      app.player.x = app.player.x_max;
    }
    if (app.player.y == app.player.y_max) {
      player_move_jump_down(1, velocity_decrement);
    }
    else {
      player_move_jump_down(1, velocity_decrement);
    }
  }
}

function player_move_jump(){
  control_keyup_action_add("jump", "player_move_jump_clear", player_move_jump_clear, [], true);
  control_keyup_action_add("jump", "player_move_jump_down", player_move_jump_down, [1, (1000 / app.config.video.interval) / 80], true);
  control_keyup_action_add("jump", "player_move_jump_active", player_move_jump_active, [], true);
  control_keyup_action_add("jump", "player_move_jump_double", function(){
    control_keydown_action_add("jump", "player_move_jump_double", player_move_jump_double, [], true);
  }, [], true);

  app.player.jump.double = true;
  app.player.jump.active = true;
  player_move_jump_up(4, (1000 / app.config.video.interval) / 80);
}

function player_move_jump_active(){
  if (app.player.jump.active) {
    app.player.jump.active = false;
    control_keydown_action_add("jump", "player_move_jump_active", player_move_jump_active, [], true);
  }
  else {
    app.player.jump.active = true;
    control_keyup_action_add("jump", "player_move_jump_active", player_move_jump_active, [], true);
  }
}

function player_move_jump_clear(){
  clearInterval(app.player.jump.interval);
}

function player_move_jump_up(velocity, velocity_decrement){
  app.player.jump.interval = setInterval(function(){
    velocity -= velocity_decrement;
    if (velocity > 1 && app.player.y > app.player.y_min) {
      app.player.y -= app.player.speed.jump * velocity - app.player.speed.gravity;
    }
    else {
      control_keyup_action_remove("jump", "player_move_jump_clear");
      control_keyup_action_remove("jump", "player_move_jump_down");
      player_move_jump_clear();
      player_move_jump_down(1, velocity_decrement);
    }
  }, 1000 / app.config.video.interval);
}

function player_move_jump_down(velocity, velocity_decrement){
  app.player.jump.interval = setInterval(function(){
    velocity += velocity_decrement;
    if (app.player.y < app.player.y_max) {
      app.player.y += app.player.speed.jump * velocity - app.player.speed.gravity;
    }
    else {
      control_keydown_action_remove("jump", "player_move_jump_double");
      control_keyup_action_remove("jump", "player_move_jump_double");
      player_move_jump_clear();
      app.player.jump.double = false;
      app.player.dash.active = false;
      app.player.y = app.player.y_max;

      if (app.player.jump.active) {
        control_keyup_action_remove("jump", "player_move_jump_active");
        player_move_jump();
      }
      else {
        control_keydown_action_remove("jump", "player_move_jump_active");
        control_keydown_action_add("jump", "player_move_jump", player_move_jump, [], true);
      }
    }
  }, 1000 / app.config.video.interval);
}

function player_move_jump_double(){
  app.player.jump.double = false;
  player_move_jump_clear();
  player_move_jump_up(4, (1000 / app.config.video.interval) / 80);
}

function player_explosion(number, velocity, width, height){
  app.player.explosion = {
    width: app.player.width / width,
    height: app.player.height / height,
    blur: (app.player.width / width) * 0.5,
    y_max: app.player.y_max + app.player.height - (app.player.height / height),
    list: [],
    interval: null
  };

  let tmp_x = app.player.x + app.player.width / 2;
  let tmp_y = (app.player.y + app.player.height / 2) - app.player.explosion.height / 2;

  for (let i = 0; i < number; i++) {
    app.player.explosion.list.push({
      x: tmp_x,
      y: tmp_y,
      velocity: (Math.floor(Math.random() * 100) / 50) * velocity,
      vertical: app.player.speed.jump,
      horizontal: ((Math.floor(Math.random() * 100) / 50) - (Math.floor(Math.random() * 100) / 50)) * (app.player.speed.jump / 4)
    });
  }

  player_move_clear();
  player_move_jump_clear();
  engine_element_remove("engine_draw_player");
  engine_element_add("engine_draw_player_explosion", engine_draw_player_explosion);

  app.player.explosion.interval = setInterval(player_explosion_move, 1000 / app.config.video.interval, (1000 / app.config.video.interval) / 160);
}

function player_explosion_move(velocity_decrement){
  let tmp_length = 0;
  for (let i = 0; i < app.player.explosion.list.length; i++) {
    app.player.explosion.list[i].velocity -= velocity_decrement;
    if (app.player.explosion.list[i].y < app.player.explosion.y_max) {
      app.player.explosion.list[i].y -= app.player.explosion.list[i].vertical * app.player.explosion.list[i].velocity - app.player.speed.gravity;
      if (app.player.explosion.list[i].velocity > 1) {
        app.player.explosion.list[i].x += app.player.explosion.list[i].horizontal * app.player.explosion.list[i].velocity;
      }
      else {
        app.player.explosion.list[i].x += app.player.explosion.list[i].horizontal;
      }
    }
    else {
      tmp_length++;
      app.player.explosion.list[i].y = app.player.explosion.y_max;
    }
  }
  if (tmp_length == app.player.explosion.list.length) {
    clearInterval(app.player.explosion.interval);
  }
}

function player_explosion_stop(){
  engine_element_remove("engine_draw_player_explosion");
  clearInterval(app.player.explosion.interval);
  delete app.player.explosion;
}
