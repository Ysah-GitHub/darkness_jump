function stage_load(){
  if (localStorage.getItem("engine_stage")) {
    engine.stage = JSON.parse(localStorage.getItem("engine_stage"));
  }
}

function stage_save(){
  let tmp_engine_stage = Object.assign({}, engine.stage);
  tmp_engine_stage.current = null;
  tmp_engine_stage[engine.stage.current].score = 0;
  localStorage.setItem("engine_stage", JSON.stringify(tmp_engine_stage));
}

function stage_selection_interface(){
  let tmp_menu = document.createElement("div")
  tmp_menu.id = "interface_menu";
  tmp_menu.style.marginTop = (engine.height / 4) - (engine.height * 0.045) + "px";

  for (let i = 1; i < Object.keys(engine.stage).length; i++) {
    let tmp_stage = document.createElement("div");
    tmp_stage.className = "menu_stage";
    tmp_stage.style.width = (engine.height * 0.2) + "px";
    tmp_stage.style.padding = (engine.height * 0.015) + "px";
    tmp_stage.style.fontSize = (engine.height * 0.02) + "px";
    tmp_stage.textContent = Object.keys(engine.stage)[i];
    tmp_stage.onclick = function(){stage_start(Object.keys(engine.stage)[i])};
    tmp_menu.append(tmp_stage);
  }

  let tmp_menu_return = document.createElement("div");
  tmp_menu_return.className = "menu_stage";
  tmp_menu_return.style.width = (engine.height * 0.2) + "px";
  tmp_menu_return.style.marginTop = (engine.height * 0.03) + "px";
  tmp_menu_return.style.padding = (engine.height * 0.015) + "px";
  tmp_menu_return.style.fontSize = (engine.height * 0.015) + "px";
  tmp_menu_return.textContent = "Return";
  tmp_menu_return.onclick = function(){
    document.getElementById("interface_menu").remove();
    interface_menu_create();
  };
  tmp_menu.append(tmp_menu_return);

  document.getElementById("interface").append(tmp_menu);
}

function stage_hightscore_update(){
  let tmp_stage = engine.stage[engine.stage.current];
  if (tmp_stage.score > tmp_stage.hightscore) {
    tmp_stage.hightscore = tmp_stage.score;
    stage_hightscore_refresh();
  }
}

function stage_hightscore_refresh(){
  document.getElementById("hightscore").textContent = "Hightscore : " + engine.stage[engine.stage.current].hightscore;
}

function stage_lastscore_update(){
  engine.stage[engine.stage.current].lastscore = engine.stage[engine.stage.current].score;
}

function stage_lastscore_refresh(){
  document.getElementById("lastscore").textContent = "Lastscore : " + engine.stage[engine.stage.current].lastscore;
}

function stage_score_add(score){
  engine.stage[engine.stage.current].score += score;
  stage_hightscore_update();
  stage_score_refresh();
}

function stage_score_refresh(){
  document.getElementById("score").textContent = "Score : " + engine.stage[engine.stage.current].score;
}

function stage_score_reset(){
  engine.stage[engine.stage.current].score = 0;
}

function stage_score_interface(){
  let tmp_menu_score = document.createElement("div");
  tmp_menu_score.id = "menu_score";
  tmp_menu_score.style.marginTop = (engine.height * 0.55) + "px";

  let tmp_score = document.createElement("div");
  tmp_score.id = "hightscore";
  tmp_score.style.marginTop = (engine.height * 0.015) + "px";
  tmp_score.style.fontSize = (engine.height * 0.015) + "px";
  tmp_score.textContent = "Hightscore : " + engine.stage[engine.stage.current].hightscore;
  tmp_menu_score.append(tmp_score);

  tmp_score = document.createElement("div");
  tmp_score.id = "lastscore";
  tmp_score.style.marginTop = (engine.height * 0.015) + "px";
  tmp_score.style.fontSize = (engine.height * 0.015) + "px";
  tmp_score.textContent = "Lastscore : " + engine.stage[engine.stage.current].lastscore;
  tmp_menu_score.append(tmp_score);

  tmp_score = document.createElement("div");
  tmp_score.id = "score";
  tmp_score.style.marginTop = (engine.height * 0.015) + "px";
  tmp_score.style.fontSize = (engine.height * 0.015) + "px";
  tmp_score.textContent = "Score : 0";
  tmp_menu_score.append(tmp_score);

  document.getElementById("interface").append(tmp_menu_score);
}

function stage_start(stage){
  engine.stage.current = stage;
  engine_reset();
  document.getElementById("interface_menu").remove();

  if (!document.getElementById("menu_score")) {
    stage_score_interface();
  }
  else {
    stage_lastscore_refresh();
    stage_score_refresh();
  }

  engine_element_add("engine_draw_entity", engine_draw_entity);
  window["stage_start_" + stage]();
}

function stage_start_nostalgia(){
  music_play("bonetrousle");
  stage_nostalgia_bonetrousle();
  music.curent.onended = function(){
    clearTimeout(entity.spawn.timeout);
    music_play("spider_dance");
    stage_nostalgia_spider_dance();
    music.curent.onended = stage_end;
  };
}

function stage_over(){
  player_explosion(50, (player.width / 5), (player.height / 5), 0.5);
  engine_element_remove("engine_draw_player");
  engine_element_add("engine_draw_player_explosion", engine_draw_player_explosion);

  player_move_clear();
  player_jump_clear();
  player_control_remove();
  player_move_value_reset();
  player_jump_value_reset();

  stage_end();
}

function stage_end(){
  clearTimeout(entity.spawn.timeout);
  entity_move_stop_all();

  music_stop();

  stage_lastscore_update();
  stage_save();

  stage_end_interface();
  control_keydown_action_add("start", "engine_start_stage", stage_start, [engine.stage.current], true);
}

function stage_end_interface(){
  let tmp_menu = document.createElement("div")
  tmp_menu.id = "interface_menu";

  let tmp_stage = document.createElement("div");
  tmp_stage.className = "menu_stage";
  tmp_stage.style.width = (engine.height * 0.2) + "px";
  tmp_stage.style.marginTop = (engine.height / 4) - (engine.height * 0.045) + "px";
  tmp_stage.style.padding = (engine.height * 0.015) + "px";
  tmp_stage.style.fontSize = (engine.height * 0.02) + "px";
  tmp_stage.textContent = "Restart";
  tmp_stage.onclick = function(){control_keydown_action("start")};
  tmp_menu.append(tmp_stage);

  let tmp_menu_return = document.createElement("div");
  tmp_menu_return.className = "menu_stage";
  tmp_menu_return.style.width = (engine.height * 0.2) + "px";
  tmp_menu_return.style.marginTop = (engine.height * 0.03) + "px";
  tmp_menu_return.style.padding = (engine.height * 0.015) + "px";
  tmp_menu_return.style.fontSize = (engine.height * 0.015) + "px";
  tmp_menu_return.textContent = "Return";
  tmp_menu_return.onclick = function(){
    control_keydown_action_remove("start", "engine_start_stage");
    document.getElementById("interface_menu").remove();
    document.getElementById("menu_score").remove();
    interface_menu_create();
    engine_reset();
  };
  tmp_menu.append(tmp_menu_return);

  document.getElementById("interface").append(tmp_menu);
}

function stage_nostalgia_bonetrousle(){
  entity_new_red_nostalgia();
  if (entity.spawn.rate > 0.7) {
    entity.spawn.rate -= 0.005;
  }
  entity.move.base += 0.01;
  entity.spawn.timeout = setTimeout(stage_nostalgia_bonetrousle, ((((Math.floor(Math.random() * 8) + 3) * entity.spawn.rate) * 100)));
}

function stage_nostalgia_spider_dance(){
  entity_new_purple_nostalgia();
  if (entity.spawn.rate > 0.5) {
    entity.spawn.rate -= 0.01;
  }
  entity.move.base += 0.01;
  entity.spawn.timeout = setTimeout(stage_nostalgia_spider_dance, ((((Math.floor(Math.random() * 8) + 3) * entity.spawn.rate) * 100)));
}
