app.engine = {
  width: null,
  height: null,
  ground_height: null,
  element: [],
  refresh: null,
};

function engine_resolution(resolution){
  app.engine.width = Number(resolution.split("x")[0]);
  app.engine.height = Number(resolution.split("x")[1]);
  app.engine.ground_height = app.engine.height * 0.7;
}

function engine_resolution_update(){
  document.documentElement.style.setProperty("--engine_width", app.engine.width + "px");
  document.documentElement.style.setProperty("--engine_height", app.engine.height + "px");
  document.getElementById("engine").width = app.engine.width;
  document.getElementById("engine").height = app.engine.height;

  player_size_default();
  player_position_default();
  player_position_limit_default();
  player_speed_default();

  entity_load();
}

function engine_resolution_list(){
  let tmp_resolution_list_available = [];
  let tmp_resolution_list = [
    "640x480",
    "720x480",
    "1024x768",
    "1366x768",
    "1920x1080",
    "2560x1080",
    "3840x1080",
    "2560x1440",
    "3440x1440",
    "5120x1440",
    "3840x2160",
    "5120x2160"
  ];

  for (let i = 0; i < tmp_resolution_list.length; i++) {
    if (screen.width >= tmp_resolution_list[i].split("x")[0] && screen.height >= tmp_resolution_list[i].split("x")[1]) {
      tmp_resolution_list_available.push(tmp_resolution_list[i]);
    }
  }

  if (tmp_resolution_list_available[tmp_resolution_list_available.length - 1] != (screen.width + "x" + screen.height)) {
    tmp_resolution_list_available.push(screen.width + "x" + screen.height);
  }

  return tmp_resolution_list_available;
}

function engine_load(){
  engine_resolution(app.config.video.resolution);
  engine_resolution_update();

  player_load();
  entity_load();

  engine_element_add("engine_draw_player", engine_draw_player);
  engine_element_add("engine_draw_ground", engine_draw_ground);

  engine_refresh_start();

  control_keydown_set();
  control_keyup_set();
}

function engine_refresh(){
  let ctx = document.getElementById("engine").getContext("2d");
  ctx.clearRect(0, 0, app.engine.width, app.engine.height);
  for (let i = 0; i < app.engine.element.length; i++) {
    ctx.save();
    app.engine.element[i][1](ctx);
    ctx.restore();
  }
}

function engine_refresh_start(){
  if (app.config.video.framerate == "Auto") {
    app.engine.refresh = window.requestAnimationFrame(engine_refresh_auto);
  }
  else {
    app.engine.refresh = setInterval(engine_refresh, 1000 / app.config.video.framerate);
  }
}

function engine_refresh_stop(){
  if (app.config.video.framerate == "Auto") {
    window.cancelAnimationFrame(app.engine.refresh);
  }
  else {
    clearInterval(app.engine.refresh);
  }
}

function engine_refresh_auto(){
  engine_refresh();
  app.engine.refresh = window.requestAnimationFrame(engine_refresh_auto);
}

function engine_element_add(name, func, arguments){
  app.engine.element.push([name, func, arguments]);
}

function engine_element_remove(name){
  for (let i = 0; i < app.engine.element.length; i++) {
    if (app.engine.element[i][0] == name) {
      app.engine.element.splice(i, 1);
      break;
    }
  }
}

function engine_draw_player(ctx){
  ctx.fillStyle = app.player.color;
  ctx.shadowColor = app.player.color;
  ctx.shadowBlur = app.player.blur;
  ctx.fillRect(app.player.x, app.player.y, app.player.width, app.player.height);
}

function engine_draw_player_explosion(ctx){
  ctx.fillStyle = app.player.color;
  ctx.shadowColor = app.player.color;
  ctx.shadowBlur = app.player.explosion.blur;
  for (let i = 0; i < app.player.explosion.list.length; i++) {
    ctx.fillRect(app.player.explosion.list[i].x, app.player.explosion.list[i].y, app.player.explosion.width, app.player.explosion.height);
  }
}

function engine_draw_entity(ctx){
  for (let i = 0; i < app.entity.list.length; i++) {
    ctx.fillStyle = app.entity.list[i].color;
    ctx.shadowColor = app.entity.list[i].color;
    ctx.shadowBlur = app.player.blur;
    ctx.fillRect(app.entity.list[i].x, app.entity.list[i].y, app.entity.list[i].width, app.entity.list[i].height);
  }
}

function engine_draw_entity_explosion(ctx){
  for (let i = 0; i < app.entity.explosion.list.length; i++) {
    ctx.fillStyle = app.entity.explosion.list[i].color;
    ctx.shadowColor = app.entity.explosion.list[i].color;
    ctx.shadowBlur = app.entity.explosion.list[i].blur;
    for (let j = 0; j < app.entity.explosion.list[i].list.length; j++) {
      ctx.fillRect(app.entity.explosion.list[i].list[j].x, app.entity.explosion.list[i].list[j].y, app.entity.explosion.list[i].list[j].width, app.entity.explosion.list[i].list[j].height);
    }
  }
}

function engine_draw_ground(ctx){
  ctx.strokeStyle = app.config.interface.ground_color;
  ctx.beginPath();
  ctx.moveTo(0, app.engine.ground_height);
  ctx.lineTo(app.engine.width, app.engine.ground_height);
  ctx.stroke();
}
