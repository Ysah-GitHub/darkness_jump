app.stage = {
  current: {name: null, difficulty: null},
  event: {list: [], timeout: null},
  list: [
    "bonetrousle",
    // "spider_dance"
  ]
};

function stage_start(){
  document.getElementById("menu").remove();

  stage_reset();
  app.stage.current.completed = null;
  engine_element_add("engine_draw_entity", engine_draw_entity);

  score_interface();
  score_set();
  score_interface_update();

  if (app.config.interface.timer == "visible") {
    stage_timer_start_with_interface();
    stage_timer_interface();
    stage_timer_interface_update();
  }
  else {
    stage_timer_start();
  }

  app.entity.move.interval = setInterval(entity_move, 1000 / app.config.video.interval);

  window["stage_" + app.stage.current.name + "_start_" + app.stage.current.difficulty]();
}

function stage_over(){
  player_explosion(50, 2, 4, 4);
  app.stage.current.completed = false;
  stage_end();
}

function stage_end(){
  stage_event_clear();
  stage_event_reset();

  entity_spawn_clear();
  entity_move_stop();

  music_stop();

  if (app.stage.current.completed == null) {
    app.score[app.stage.current.name][app.stage.current.difficulty].completed = true;
    entity_explosion_all();
    entity_remove_all();
  }
  delete app.stage.current.completed;

  score_update();
  score_unset();
  score_save();

  stage_timer_stop();

  stage_end_interface();
  control_keydown_action_add("start", "engine_start_stage", stage_start, [app.stage.current], true);
}

function stage_reset(){
  player_move_clear();
  player_move_reset();
  player_move_jump_clear();
  player_speed_default();
  player_position_default();
  player_control_remove();
  player_control_default();
  if (app.player.explosion != null) {
    player_explosion_stop();
  }

  entity_reset();
  entity_move_value_default();

  engine_element_remove("engine_draw_player");
  engine_element_remove("engine_draw_entity");
  engine_element_add("engine_draw_player", engine_draw_player);
}

function stage_return(){
  control_keydown_action_remove("start", "engine_start_stage");
  document.getElementById("menu").remove();
  menu_selection();
  stage_reset();
  score_interface_remove();

  stage_timer_remove();
  if (app.config.interface.timer == "visible") {
    stage_timer_interface_remove();
  }
}

function stage_event(){
  if (app.stage.event.list.length > 0) {
    app.stage.event.timeout = setTimeout(function(){
      app.stage.event.list[0].func();
      app.stage.event.list.splice(0, 1);
      stage_event();
    }, (app.stage.event.list[0].time - app.stage.timer.second) * 1000);
  }
}

function stage_event_add(func, time){
  app.stage.event.list.push({func: func, time: time});
}

function stage_event_clear(){
  clearTimeout(app.stage.event.timeout);
}

function stage_event_reset(){
  app.stage.event.list = [];
}

function stage_timer_start(){
  app.stage.timer = {second: 0, interval: setInterval(function(){app.stage.timer.second += 1}, 1000)};
}

function stage_timer_start_with_interface(){
  app.stage.timer = {second: 0, interval: setInterval(function(){app.stage.timer.second += 1; stage_timer_interface_update()}, 1000)};
}

function stage_timer_stop(){
  clearInterval(app.stage.timer.interval);
}

function stage_timer_remove(){
  delete app.stage.timer;
}

function stage_timer_interface(){
  if (!document.getElementById("stage_timer")) {
    let tmp_timer = document.createElement("span");
    tmp_timer.id = "stage_timer";
    document.getElementById("interface").prepend(tmp_timer);
  }
}

function stage_timer_interface_update(){
  let tmp_minute = Math.floor(app.stage.timer.second / 60);
  let tmp_second = app.stage.timer.second - tmp_minute * 60;

  if (tmp_second < 10) {
    tmp_second = "0" + tmp_second;
  }

  document.getElementById("stage_timer").textContent = tmp_minute + ":" + tmp_second;
}

function stage_timer_interface_remove(){
    document.getElementById("stage_timer").remove();
}

function stage_end_interface(){
  let tmp_menu = document.createElement("div")
  tmp_menu.id = "menu";
  tmp_menu.className = "stage";

  let tmp_stage = document.createElement("div");
  tmp_stage.className = "menu_stage";
  tmp_stage.textContent = "Restart";
  tmp_stage.onclick = function(){control_keydown_action("start")};
  tmp_menu.append(tmp_stage);

  let tmp_menu_return = document.createElement("div");
  tmp_menu_return.id = "menu_stage_return";
  tmp_menu_return.textContent = "Return";
  tmp_menu_return.onclick = stage_return;
  tmp_menu.append(tmp_menu_return);

  document.getElementById("interface").append(tmp_menu);
}
