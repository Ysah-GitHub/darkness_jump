var engine = {
  width: null,
  height: null,
  element: [],
  ground: {height: null},
  refresh: null,
  config: {
    video: {
      resolution: {id: null, value: null},
      framerate: {id: null, value: null}
    },
  }
};

function engine_config_load(){
  if (localStorage.getItem("engine_config")) {
    engine.config = JSON.parse(localStorage.getItem("engine_config"));
  }
  else {
    engine_config_load_default();
    engine_config_save();
  }
}

function engine_config_load_default(){
  engine.config.video.resolution.id = 0;
  engine.config.video.resolution.value = window.outerWidth + "x" + window.outerHeight;
  engine.config.video.framerate.id = 0;
  engine.config.video.framerate.value = "Auto";
}

function engine_config_save(){
  localStorage.setItem("engine_config", JSON.stringify(engine.config));
}

function engine_load(){
  engine_config_load();

  engine_resolution(engine.config.video.resolution.value);
  engine.ground.height = (engine.height / 2);

  player_load();
  entity_load();

  engine_element_add("engine_draw_player", engine_draw_player);
  engine_element_add("engine_draw_ground", engine_draw_ground);

  engine_create();
  engine_refresh_start();
}

function engine_refresh_start(){
  if (engine.config.video.framerate.id == 0) {
    engine.refresh = window.requestAnimationFrame(engine_refresh_auto);
  }
  else {
    engine.refresh = setInterval(engine_refresh, 1000 / engine.config.video.framerate.value);
  }
}

function engine_refresh_stop(){
  if (engine.config.video.framerate.id == 0) {
    window.cancelAnimationFrame(engine.refresh);
  }
  else {
    clearInterval(engine.refresh);
  }
}

function engine_refresh_auto(){
  engine_refresh();
  engine.refresh = window.requestAnimationFrame(engine_refresh_auto);
}

function engine_refresh(){
  let ctx = document.getElementById("engine").getContext("2d");
  ctx.clearRect(0, 0, engine.width, engine.height);
  for (let i = 0; i < engine.element.length; i++) {
    engine.element[i][1](ctx);
  }
}

function engine_element_add(name, func, arguments){
  engine.element.push([name, func, arguments]);
}

function engine_element_remove(name){
  for (let i = 0; i < engine.element.length; i++) {
    if (engine.element[i][0] == name) {
      engine.element.splice(i, 1);
      break;
    }
  }
}

function engine_resolution(resolution){
  engine.width = Number(resolution.split("x")[0]);
  engine.height = Number(resolution.split("x")[1]);
}

function engine_resolution_resize(){
  engine.ground.height = (engine.height / 2);

  player_size_default()
  player_limit_default();
  player_position_default();
  player_move_value_default();
  player_jump_value_default();

  entity_size_default();
  entity_move_value_default();

  document.getElementById("engine").width = engine.width;
  document.getElementById("engine").height = engine.height;
}

function engine_create(){
  let tmp_engine = document.createElement("canvas");
  tmp_engine.id = "engine";
  tmp_engine.width = engine.width;
  tmp_engine.height = engine.height;
  document.body.prepend(tmp_engine);
}

function engine_start(){
  dev_entity_start();
  engine_element_add("engine_draw_entity", engine_draw_entity);
}



function engine_draw_player(ctx){
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function engine_draw_entity(ctx){
  for (let i = 0; i < Object.keys(entity.list).length; i++) {
    let tmp_entity = entity.list[Object.keys(entity.list)[i]]
    ctx.fillStyle = tmp_entity.color;
    ctx.fillRect(tmp_entity.x, tmp_entity.y, tmp_entity.width, tmp_entity.height);
  }
}

function engine_draw_ground(ctx){
  ctx.strokeStyle = "rgb(75, 75, 75)";
  ctx.beginPath();
  ctx.moveTo(0, engine.ground.height);
  ctx.lineTo(engine.width, engine.ground.height);
  ctx.stroke();
}
