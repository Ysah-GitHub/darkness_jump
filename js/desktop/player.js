var player = {
  width: 50,
  height: 50,
  x: null,
  y: null,
  x_min: null,
  x_max: null,
  y_min: null,
  y_max: null,
  speed: 1,
  move: {key: [], action: [], interval: null},
  jump: {double: false, timeout: null},
  color: "rgb(50, 170, 255)"
};

function player_load(){
  player_position_default();
  player_limit_default();
  player_control_default();
}

function player_position_default(){
  player.x = 100;
  player.y = (engine.height - player.height);
}

function player_limit_default(){
  player.x_min = 0;
  player.x_max = (engine.width - player.width);
  player.y_min = (engine.height - player.height);
  player.y_max = (0 + player.height);
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
  control_keyup_action_add("jump", "player_jump_stop", player_jump_stop, [], true);
  control_keyup_action_add("jump", "player_jump_down", function(){
    control_keydown_action_add("jump", "player_jump_double", player_jump_double, [], true);
    player_jump_down();
  }, [], true);
  player_jump_up(0);
  player.jump.double = true;
}

function player_jump_up(height){
  if (height < 250) {
    let tmp_height = (5 * (player.speed * 0.8));
    height += tmp_height
    player.y -= tmp_height;
    player.jump.timeout = setTimeout(player_jump_up, 5, height);
  }
  else {
    control_keyup_action_remove("jump", "player_jump_stop");
    control_keyup_action_remove("jump", "player_jump_down");
    player_jump_stop();
    player_jump_down();
  }
}

function player_jump_down(){
  if (player.y < player.y_min) {
    player.y += (5 * player.speed);
    player.jump.timeout = setTimeout(player_jump_down, 5);
  }
  else {
    player.y = player.y_min;
    control_keydown_action_remove("jump", "player_jump_double");
    control_keydown_action_add("jump", "player_jump", player_jump, [], true);
    player.jump.double = true;
  }
}

function player_jump_double(){
  if (player.jump.double) {
    player.jump.double = false;
    player_jump_stop();
    player_jump_up(100);
  }
}

function player_jump_stop(){
  clearTimeout(player.jump.timeout);
}
