var player = {};

function player_load(){
  player_size_default();
  player_position_default();
  player_limit_default();
  player_speed_default();
  player_color_default();

  player.move = {key: [], action: [], interval: null};
  player.jump = {active: false, timeout: null};

  player_control_default();
}

function player_position_default(){
  player.x = 100;
  player.y = (engine.height - player.height);
}

function player_size_default(){
  player.width = 50;
  player.height = 50;
}

function player_limit_default(){
  player.x_min = 0;
  player.x_max = (engine.width - player.width);
  player.y_min = (engine.height - player.height);
  player.y_max = (0 + player.height);
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

function player_move(key){
  if (player.move.key.length > 1) {
    player_move_stop();
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
      player_move_stop();
      if (player.move.key.length > 0) {
        let tmp_index = (player.move.key.length - 1);
        player_move(player.move.key[tmp_index]);
      }
      break;
    }
  }
}

function player_move_stop(){
  clearInterval(player.move.interval);
}

function player_move_left(){
  player.move.interval = setInterval(function(){
    player.x -= 5 * player.speed;
    if (player.x < player.x_min) {
      player.x = player.x_min;
    }
  }, 5);
}

function player_move_right(){
  player.move.interval = setInterval(function(){
    player.x += 5 * player.speed;
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
  if (velocity > 0) {
    player.y -= (10 * velocity);
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
    player.y += (10 * velocity);
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
