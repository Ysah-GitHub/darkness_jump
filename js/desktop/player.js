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
  speed: null,
  move: {key: [], func: []},
  jump: {active: null, double: null, speed: null, velocity: null},
  dash: {active: false, velocity: null},
};

function player_load(){
  player_size_default();
  player_position_default();
  player_position_limit_default();
  app.player.speed = (app.player.width + app.player.height) / 60;
  app.player.move = {key: [], func: []};
  app.player.jump = {active: false, double: false, speed: app.player.speed / 2, velocity: null};
  app.player.dash = {active: false, velocity: null};
  player_control_default();
}

function player_reset(){
  player_control_remove();
  player_move_clear();
  player_move_jump_clear();
  player_move_dash_clear();
  player_load();
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

function player_control_default(){
  control_keydown_action_add("left", "player_move_add", player_move_add, ["left", player_move_left], true);
  control_keydown_action_add("right", "player_move_add", player_move_add, ["right", player_move_right], true);
  control_keydown_action_add("jump", "player_move_jump", player_move_jump, [], true);
  control_keydown_action_add("dash", "player_move_dash", player_move_dash, [], false);
}

function player_control_remove(){
  control_keydown_action_remove("left", "player_move_add");
  control_keydown_action_remove("right", "player_move_add");
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

function player_move_add(key, func){
  if (app.player.move.func.length > 0) {
    engine_refresh_remove(app.player.move.func[app.player.move.func.length - 1]);
  }
  app.player.move.key.push(key);
  app.player.move.func.push(func);
  engine_refresh_add(func);
  control_keyup_action_add(key, "player_move_remove", player_move_remove, [key, func], true);
}

function player_move_remove(key, func){
  if (app.player.move.func.indexOf(func) >= 0) {
    engine_refresh_remove(func);
    app.player.move.key.splice(app.player.move.key.indexOf(key), 1);
    app.player.move.func.splice(app.player.move.func.indexOf(func), 1);

    if (app.player.move.func.length > 0) {
      if (app.player.move.func.indexOf(app.player.move.func[app.player.move.func.length - 1]) >= 0) {
        engine_refresh_remove(app.player.move.func[app.player.move.func.length - 1]);
      }
      engine_refresh_add(app.player.move.func[app.player.move.func.length - 1]);
    }

    control_keydown_action_add(key, "player_move_add", player_move_add, [key, func], true);
  }
}

function player_move_clear(){
  engine_refresh_remove(player_move_left);
  engine_refresh_remove(player_move_right);
}

function player_move_left(){
  app.player.x -= app.player.speed * app.engine.refresh.frame;
  if (app.player.x < app.player.x_min) {
    app.player.x = app.player.x_min;
  }
}

function player_move_right(){
  app.player.x += app.player.speed * app.engine.refresh.frame;
  if (app.player.x > app.player.x_max) {
    app.player.x = app.player.x_max;
  }
}

function player_move_jump(){
  control_keyup_action_add("jump", "player_move_jump_clear", player_move_jump_clear, [], true);
  control_keyup_action_add("jump", "player_move_jump_down", function(){
    app.player.jump.velocity = 0;
    engine_refresh_add(player_move_jump_down);
  }, [], true);
  control_keyup_action_add("jump", "player_move_jump_active", player_move_jump_active, [], true);
  control_keyup_action_add("jump", "player_move_jump_double", function(){
    control_keydown_action_add("jump", "player_move_jump_double", player_move_jump_double, [], true);
  }, [], true);

  app.player.jump.active = true;
  app.player.jump.double = true;
  app.player.jump.velocity = app.player.jump.speed * 3;
  engine_refresh_add(player_move_jump_up);
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
  engine_refresh_remove(player_move_jump_up);
  engine_refresh_remove(player_move_jump_down);
}

function player_move_jump_up(){
  let tmp_frame = app.engine.refresh.frame;
  app.player.jump.velocity -= (app.player.jump.speed / 75) * tmp_frame;
  let tmp_move = ((app.player.jump.speed + app.player.jump.velocity) * tmp_frame) - (app.player.jump.speed * tmp_frame);

  if (app.player.jump.velocity > 0) {
    app.player.y -= tmp_move;
  }
  else {
    control_keyup_action_remove("jump", "player_move_jump_clear");
    control_keyup_action_remove("jump", "player_move_jump_down");
    player_move_jump_clear();
    app.player.jump.velocity = 0;
    engine_refresh_add(player_move_jump_down);
  }
}

function player_move_jump_down(){
  let tmp_frame = app.engine.refresh.frame;
  app.player.jump.velocity += (app.player.jump.speed / 75) * tmp_frame;
  let tmp_move = ((app.player.jump.speed + app.player.jump.velocity) * tmp_frame) - (app.player.jump.speed * tmp_frame);
  let tmp_player_y = app.player.y += tmp_move;


  if (tmp_player_y < app.player.y_max) {
    app.player.y = tmp_player_y;
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
}

function player_move_jump_double(){
  app.player.jump.double = false;
  player_move_jump_clear();
  app.player.jump.velocity = app.player.jump.speed * 3;
  engine_refresh_add(player_move_jump_up);
}

function player_move_dash(){
  if (!app.player.dash.active) {
    let tmp_move = app.player.move.key[app.player.move.key.length - 1]
    if (tmp_move == "right" || tmp_move == "left") {
      app.player.dash.active = true;
      app.player.dash.velocity = app.player.jump.speed * 2.5;
      control_keydown_action_remove("jump", "player_move_jump");
      control_keydown_action_remove("jump", "player_move_jump_double");
      control_keyup_action_remove("jump", "player_move_jump_clear");
      control_keyup_action_remove("jump", "player_move_jump_down");
      control_keyup_action_remove("jump", "player_move_jump_double");
      player_move_jump_clear();
      if (tmp_move == "right") {
        engine_refresh_add(player_move_dash_right);
      }
      else if (tmp_move == "left") {
        engine_refresh_add(player_move_dash_left);
      }
    }
  }
}

function player_move_dash_left(){
  let tmp_frame = app.engine.refresh.frame;
  app.player.dash.velocity -= (app.player.speed / 75) * tmp_frame;
  app.player.x -= (app.player.speed + app.player.dash.velocity) * tmp_frame;

  if (app.player.dash.velocity < 0 || app.player.x < app.player.x_min) {
    engine_refresh_remove(player_move_dash_left);
    if (app.player.x < app.player.x_min) {
      app.player.x = app.player.x_min;
    }
    if (app.player.y == app.player.y_max) {
      app.player.jump.velocity = 0;
      engine_refresh_add(player_move_jump_down);
    }
    else {
      app.player.jump.velocity = 0;
      engine_refresh_add(player_move_jump_down);
    }
  }
}

function player_move_dash_right(){
  let tmp_frame = app.engine.refresh.frame;
  app.player.dash.velocity -= (app.player.speed / 75) * tmp_frame;
  app.player.x += (app.player.speed + app.player.dash.velocity) * tmp_frame;

  if (app.player.dash.velocity < 0 || app.player.x > app.player.x_max) {
    engine_refresh_remove(player_move_dash_right);
    if (app.player.x > app.player.x_max) {
      app.player.x = app.player.x_max;
    }
    if (app.player.y == app.player.y_max) {
      app.player.jump.velocity = 0;
      engine_refresh_add(player_move_jump_down);
    }
    else {
      app.player.jump.velocity = 0;
      engine_refresh_add(player_move_jump_down);
    }
  }
}

function player_move_dash_clear(){
  engine_refresh_remove(player_move_dash_right);
  engine_refresh_remove(player_move_dash_left);
}

function player_explosion(number, width, height){
  player_explosion_stop();

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
      velocity: (Math.floor(Math.random() * 100) / 50) * (app.player.speed * 0.85),
      vertical: app.player.jump.speed / 2,
      horizontal: ((Math.floor(Math.random() * 100) / 50) - (Math.floor(Math.random() * 100) / 50)) * (app.player.speed / 5)
    });
  }

  player_move_clear();
  player_move_jump_clear();
  engine_element_remove("engine_draw_player");
  engine_element_add("engine_draw_player_explosion", engine_draw_player_explosion);

  engine_refresh_add(player_explosion_move);
}

function player_explosion_move(){
  let tmp_length = 0;
  let tmp_frame = app.engine.refresh.frame;
  for (let i = 0; i < app.player.explosion.list.length; i++) {
    app.player.explosion.list[i].velocity -= (app.player.explosion.list[i].vertical / 75) * tmp_frame;
    if (app.player.explosion.list[i].y < app.player.explosion.y_max) {
      app.player.explosion.list[i].y -= (app.player.explosion.list[i].vertical + app.player.explosion.list[i].velocity) * tmp_frame - (app.player.jump.speed * tmp_frame);
      if (app.player.explosion.list[i].velocity > 1) {
        app.player.explosion.list[i].x += (app.player.explosion.list[i].horizontal * app.player.explosion.list[i].velocity) * tmp_frame;
      }
      else {
        app.player.explosion.list[i].x += app.player.explosion.list[i].horizontal * tmp_frame;
      }
    }
    else {
      tmp_length++;
      app.player.explosion.list[i].y = app.player.explosion.y_max;
    }
  }
  if (tmp_length == app.player.explosion.list.length) {
    engine_refresh_remove(player_explosion_move);
  }
}

function player_explosion_stop(){
  engine_refresh_remove(player_explosion_move);
  engine_element_remove("engine_draw_player_explosion");
  delete app.player.explosion;
}
