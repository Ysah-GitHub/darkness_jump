app.stage = {
  current: {name: null, difficulty: null},
  event: {list: [], timeout: null},
  list: [
    "bonetrousle",
    "spider_dance"
  ]
};

function stage_start(){
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

  engine_refresh_add(entity_move);

  window["stage_" + app.stage.current.name + "_start_" + app.stage.current.difficulty]();
  document.getElementById("menu").remove();
}

function stage_end(completed){
  entity_move_stop();
  entity_spawn_clear();

  stage_timer_stop();
  stage_event_clear();
  stage_event_reset();

  music_stop();

  if (completed) {
    app.score[app.stage.current.name][app.stage.current.difficulty].completed = true;
    entity_explosion_all();
    entity_remove_all();
    setTimeout(stage_close, 500);
  }
  else {
    player_explosion(50, 4, 4);
    stage_end_interface(completed);
  }

  score_update();
  score_unset();
  score_save();
}

function stage_restart(){
  if (app.player.explosion != null) {
    player_explosion_stop();
    engine_element_add("engine_draw_player", engine_draw_player);
  }

  player_reset();

  entity_reset();
  entity_move_value_default();
  engine_element_remove("engine_draw_entity");

  stage_start();
}

function stage_close(){
  control_keydown_action_remove("start", "stage_restart");
  if (document.getElementById("menu")) {
    document.getElementById("menu").remove();
  }

  delete app.stage.timer;
  if (app.config.interface.timer == "visible") {
    document.getElementById("stage_timer").remove();
  }
  score_interface_remove();

  player_reset();
  if (app.player.explosion != null) {
    player_explosion_stop();
    engine_element_add("engine_draw_player", engine_draw_player);
  }

  entity_reset();
  entity_move_value_default();
  engine_element_remove("engine_draw_entity");

  menu_selection(app.stage.current.name);
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

function stage_timer_interface(){
  if (!document.getElementById("stage_timer")) {
    let tmp_timer = document.createElement("span");
    tmp_timer.id = "stage_timer";
    tmp_timer.className = "text";
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

function stage_end_interface(completed){
  if (!document.getElementById("menu")) {
    let tmp_menu = document.createElement("div")
    tmp_menu.id = "menu";
    tmp_menu.className = "stage";

    if (!completed) {
      let tmp_stage_status = document.createElement("div");
      tmp_stage_status.id = "menu_stage_game_over";
      tmp_stage_status.textContent = translation().game_over;
      tmp_stage_status.className = "text shadow";
      tmp_menu.append(tmp_stage_status);
    }

    let tmp_restart = document.createElement("span");
    tmp_restart.id = "menu_stage_restart";
    tmp_restart.className = "icon";
    tmp_restart.onclick = function(){control_keydown_action("start")};
    tmp_restart.append(icon_restart(app.engine.height * 0.15, app.engine.height * 0.15));
    tmp_menu.append(tmp_restart);

    let tmp_menu_return_container = document.createElement("div");
    let tmp_menu_return = document.createElement("span");
    tmp_menu_return.id = "menu_stage_return";
    tmp_menu_return.className = "text";
    tmp_menu_return.textContent = translation().return;
    tmp_menu_return.onclick = stage_close;
    tmp_menu_return_container.append(tmp_menu_return);
    tmp_menu.append(tmp_menu_return_container);

    document.getElementById("interface").append(tmp_menu);
    control_keydown_action_add("start", "stage_restart", stage_restart, [app.stage.current], true);
  }
}
