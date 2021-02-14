var player = {
  width: null,
  height: null,
  x: null,
  x_min: null,
  x_max: null,
  y: null,
  y_min: null,
  y_max: null,
  speed: null,
  color: null,
  move: {key: [], action: [], interval: null, base: null},
  jump: {active: false, timeout: null, base: null}
};

function player_load(){
  player_size_default();
  player_position_default();
  player_limit_default();
  player_speed_default();
  player_color_default();
  player_move_value_default();
  player_jump_value_default();
  player_control_default();
}

function player_position_default(){
  player.x = (engine.width * 0.1);
  player.y = (engine.config.interface.ground_height - player.height);
}

function player_size_default(){
  player.width = Math.round(engine.height / 30);
  player.height = Math.round(engine.height / 30);
}

function player_limit_default(){
  player.x_min = 0;
  player.x_max = (engine.width - player.width);
  player.y_min = (engine.config.interface.ground_height - player.height);
  player.y_max = 0;
}

function player_speed_default(){
  player.speed = 1;
}

function player_color_default(){
  player.color = "rgb(50, 170, 255)";
}

function player_control_default(){
  control_keydown_action_add("left", "player_move_add", player_move_add, ["left", player_move_left], true);
  control_keydown_action_add("left", "player_move", player_move, ["left"], true);
  control_keydown_action_add("right", "player_move_add", player_move_add, ["right", player_move_right], true);
  control_keydown_action_add("right", "player_move", player_move, ["right"], true);
  control_keydown_action_add("jump", "player_jump", player_jump, [], true);
}

function player_control_remove(){
  control_keydown_action_remove("left", "player_move_add");
  control_keydown_action_remove("left", "player_move");
  control_keydown_action_remove("right", "player_move_add");
  control_keydown_action_remove("right", "player_move");
  control_keydown_action_remove("jump", "player_jump");
  control_keydown_action_remove("jump", "player_jump_double");

  control_keyup_action_remove("left", "player_move_remove");
  control_keyup_action_remove("right", "player_move_remove");
  control_keyup_action_remove("jump", "player_jump_clear");
  control_keyup_action_remove("jump", "player_jump_stop");
  control_keyup_action_remove("jump", "player_jump_down");
  control_keyup_action_remove("jump", "player_jump_double");
}

function player_move(key){
  if (player.move.key.length > 1) {
    player_move_clear();
  }

  let tmp_index = (player.move.action.length - 1);
  player.move.action[tmp_index]();
}

function player_move_add(key, action){
  player.move.key.push(key);
  player.move.action.push(action);
  control_keyup_action_add(key, "player_move_remove", player_move_remove, [key, action], true);
}

function player_move_remove(key, action){
  for (let i = 0; i < player.move.key.length; i++) {
    if (player.move.key[i] == key) {
      player.move.key.splice(i, 1);
      player.move.action.splice(i, 1);
      control_keydown_action_add(key, "player_move_add", player_move_add, [key, action], true);
      control_keydown_action_add(key, "player_move", player_move, [key], true);
      player_move_clear();
      if (player.move.key.length > 0) {
        let tmp_index = (player.move.key.length - 1);
        player_move(player.move.key[tmp_index]);
      }
      break;
    }
  }
}

function player_move_clear(){
  clearInterval(player.move.interval);
}

function player_move_value_reset(){
  player.move = {key: [], action: [], interval: null, base: null};
}

function player_move_value_default(){
  player.move.base = (player.width / 8);
}

function player_move_left(){
  player.move.interval = setInterval(function(){
    player.x -= player.move.base * player.speed;
    if (player.x < player.x_min) {
      player.x = player.x_min;
    }
  }, 5);
}

function player_move_right(){
  player.move.interval = setInterval(function(){
    player.x += player.move.base * player.speed;
    if (player.x > player.x_max) {
      player.x = player.x_max;
    }
  }, 5);
}

function player_jump(){
  player.jump.active = true;

  control_keyup_action_add("jump", "player_jump_clear", player_jump_clear, [], true);
  control_keyup_action_add("jump", "player_jump_stop", player_jump_stop, [], true);
  control_keyup_action_add("jump", "player_jump_down", player_jump_down, [0], true);
  control_keyup_action_add("jump", "player_jump_double", function(){
    control_keydown_action_add("jump", "player_jump_double", player_jump_double, [], true);
  }, [], true);

  player_jump_up(player.speed);
}

function player_jump_up(velocity){
  velocity -= 0.02;
  if (velocity > 0 && player.y > player.y_max) {
    player.y -= (player.jump.base * velocity);
    player.jump.timeout = setTimeout(player_jump_up, 5, velocity);
  }
  else {
    control_keyup_action_remove("jump", "player_jump_clear");
    control_keyup_action_remove("jump", "player_jump_down");
    player_jump_clear();
    player_jump_down(0);
  }
}

function player_jump_down(velocity){
  velocity += 0.02;
  if (player.y < player.y_min) {
    player.y += (player.jump.base * velocity);
    player.jump.timeout = setTimeout(player_jump_down, 5, velocity);
  }
  else {
    control_keydown_action_remove("jump", "player_jump_double");
    player.y = player.y_min;

    if (player.jump.active) {
      player_jump_up(player.speed);
    }
    else {
      control_keydown_action_add("jump", "player_jump", player_jump, [], true);
    }
  }
}

function player_jump_double(){
  player_jump_clear();
  player_jump_up(player.speed);
}

function player_jump_clear(){
  clearTimeout(player.jump.timeout);
}

function player_jump_stop(){
  player.jump.active = false;
}

function player_jump_value_default(){
  player.jump.base = (player.height / 4);
}

function player_jump_value_reset(){
  player.jump = {active: false, timeout: null, base: null};
}

function player_explosion(number, width, height, velocity){
  let tmp_x = (player.x + (player.width / 2));
  let tmp_y = (player.y + (player.height / 2));

  player.explosion = {
    width:  width,
    height: height,
    velocity: velocity,
    list: [],
    interval: null
  };

  for (let i = 0; i < number; i++) {
    player.explosion.list.push({
      x: tmp_x,
      y: tmp_y,
      top: (Math.floor(Math.random() * 100) / 10),
      right: (Math.floor(Math.random() * 100) / 10),
      bottom: (Math.floor(Math.random() * 100) / 10),
      left: (Math.floor(Math.random() * 100) / 10)
    });
  }
  player.explosion.interval = setInterval(player_explosion_move, 5);
}

function player_explosion_move(){
  player.explosion.velocity -= 0.005;
  if (player.explosion.velocity <= 0.1) {
    player_explosion_stop();
  }
  else {
    for (let i = 0; i < player.explosion.list.length; i++) {
      player.explosion.list[i].x += ((player.explosion.list[i].right - player.explosion.list[i].left) * player.explosion.velocity);
      player.explosion.list[i].y += ((player.explosion.list[i].top - player.explosion.list[i].bottom) * player.explosion.velocity);
    }
  }
}

function player_explosion_stop(){
  engine_element_remove("engine_draw_player_explosion");
  clearInterval(player.explosion.interval);
  delete player.explosion;
}
