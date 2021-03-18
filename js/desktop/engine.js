app.engine = {
  width: null,
  height: null,
  ground_height: null,
  element: [],
  refresh: {frame: null, last_frame: null, interval: null, func: []}
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

  player_reset();
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
  document.documentElement.style.setProperty("--engine_width", app.engine.width + "px");
  document.documentElement.style.setProperty("--engine_height", app.engine.height + "px");
  document.getElementById("engine").width = app.engine.width;
  document.getElementById("engine").height = app.engine.height;

  player_load();
  entity_load();

  engine_element_add("engine_draw_player", engine_draw_player);
  engine_element_add("engine_draw_ground", engine_draw_ground);

  engine_refresh_start();

  control_keydown_set();
  control_keyup_set();
}

function engine_refresh(tmp_frame){
  app.engine.refresh.frame = tmp_frame - app.engine.refresh.last_frame;
  app.engine.refresh.last_frame = tmp_frame;

  for (let i = 0; i < app.engine.refresh.func.length; i++) {
    app.engine.refresh.func[i]();
  }

  let ctx = document.getElementById("engine").getContext("2d");
  ctx.clearRect(0, 0, app.engine.width, app.engine.height);
  for (let i = 0; i < app.engine.element.length; i++) {
    ctx.save();
    app.engine.element[i][1](ctx);
    ctx.restore();
  }
  app.engine.refresh.interval = window.requestAnimationFrame(engine_refresh);
}

function engine_refresh_add(func){
  app.engine.refresh.func.push(func);
}

function engine_refresh_remove(func){
  if (app.engine.refresh.func.indexOf(func) >= 0) {
    app.engine.refresh.func.splice(app.engine.refresh.func.indexOf(func), 1);
  }
}

function engine_refresh_start(){
  app.engine.refresh.interval = window.requestAnimationFrame(engine_refresh);
}

function engine_refresh_stop(){
  window.cancelAnimationFrame(app.engine.refresh.interval);
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
    for (let j = 0; j < app.entity.explosion.list[i].length; j++) {
      ctx.fillStyle = app.entity.explosion.list[i][j].color;
      ctx.shadowColor = app.entity.explosion.list[i][j].color;
      ctx.shadowBlur = app.entity.explosion.list[i][j].blur;
      ctx.fillRect(app.entity.explosion.list[i][j].x, app.entity.explosion.list[i][j].y, app.entity.explosion.list[i][j].width, app.entity.explosion.list[i][j].height);
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
