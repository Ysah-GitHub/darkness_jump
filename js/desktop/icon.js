function icon_constructor(width, height, color, id, className, draw_func, click_func){
  let tmp_icon = document.createElement("canvas");
  tmp_icon.width = width;
  tmp_icon.height = height;
  draw_func(tmp_icon, color);

  tmp_icon.id = id;
  tmp_icon.className = className;
  tmp_icon.onclick = click_func;

  return tmp_icon;
}

function icon_close_options(){
  return icon_constructor(64, 64, "rgb(65, 65, 65)", "", "", icon_close_options_draw, function(){
    options_remove();
    interface_start_create();
    interface_options_create();
  });
}

function icon_video(){
  return icon_constructor(64, 64, "rgb(65, 65, 65)", "", "", icon_video_draw, function(){});
}

function icon_interface(){
  return icon_constructor(64, 64, "rgb(65, 65, 65)", "", "", icon_interface_draw, function(){});
}

function icon_input(){
  return icon_constructor(64, 64, "rgb(65, 65, 65)", "", "", icon_input_draw, function(){});
}

function icon_audio(){
  return icon_constructor(64, 64, "rgb(65, 65, 65)", "", "", icon_audio_draw, function(){});
}

function icon_close_options_draw(element, color){
  let tmp_draw = element.getContext("2d");
  tmp_draw.clearRect(0, 0, 64, 64);
  tmp_draw.fillStyle = color;

  tmp_draw.fillRect(18, 18, 4, 4);
  tmp_draw.fillRect(22, 22, 4, 4);
  tmp_draw.fillRect(26, 26, 4, 4);
  tmp_draw.fillRect(30, 30, 4, 4);
  tmp_draw.fillRect(34, 34, 4, 4);
  tmp_draw.fillRect(38, 38, 4, 4);
  tmp_draw.fillRect(42, 42, 4, 4);

  tmp_draw.fillRect(42, 18, 4, 4);
  tmp_draw.fillRect(38, 22, 4, 4);
  tmp_draw.fillRect(34, 26, 4, 4);
  tmp_draw.fillRect(26, 34, 4, 4);
  tmp_draw.fillRect(22, 38, 4, 4);
  tmp_draw.fillRect(18, 42, 4, 4);
}

function icon_video_draw(element, color){
  let tmp_draw = element.getContext("2d");
  tmp_draw.clearRect(0, 0, 64, 64);
  tmp_draw.fillStyle = color;

  tmp_draw.fillRect(0, 4, 64, 4);
  tmp_draw.fillRect(60, 8, 4, 44);
  tmp_draw.fillRect(4, 48, 56, 4);
  tmp_draw.fillRect(0, 8, 4, 44);
  tmp_draw.fillRect(4, 40, 56, 4);

  tmp_draw.fillRect(24, 52, 16, 4);
  tmp_draw.fillRect(20, 56, 24, 4);
}

function icon_interface_draw(element, color){
  let tmp_draw = element.getContext("2d");
  tmp_draw.clearRect(0, 0, 64, 64);
  tmp_draw.fillStyle = color;

  tmp_draw.fillRect(8, 8, 20, 20);
  tmp_draw.fillRect(36, 8, 20, 20);
  tmp_draw.fillRect(8, 36, 20, 20);
  tmp_draw.fillRect(36, 36, 20, 20);
}

function icon_input_draw(element, color){
  let tmp_draw = element.getContext("2d");
  tmp_draw.clearRect(0, 0, 64, 64);
  tmp_draw.fillStyle = color;

  tmp_draw.fillRect(44, 0, 4, 12);
  tmp_draw.fillRect(28, 8, 16, 4);
  tmp_draw.fillRect(28, 12, 4, 8);

  tmp_draw.fillRect(12, 20, 40, 4);
  tmp_draw.fillRect(52, 24, 4, 4);
  tmp_draw.fillRect(56, 28, 4, 16);
  tmp_draw.fillRect(8, 44, 48, 4);
  tmp_draw.fillRect(4, 28, 4, 16);
  tmp_draw.fillRect(8, 24, 4, 4);

  tmp_draw.fillRect(16, 28, 4, 4);
  tmp_draw.fillRect(20, 32, 4, 4);
  tmp_draw.fillRect(16, 36, 4, 4);
  tmp_draw.fillRect(12, 32, 4, 4);
  tmp_draw.fillRect(44, 32, 4, 4);
  tmp_draw.fillRect(36, 36, 4, 4);
}

function icon_audio_draw(element, color){
  let tmp_draw = element.getContext("2d");
  tmp_draw.clearRect(0, 0, 64, 64);
  tmp_draw.fillStyle = color;

  tmp_draw.fillRect(24, 8, 4, 4);
  tmp_draw.fillRect(20, 12, 4, 4);
  tmp_draw.fillRect(28, 12, 4, 40);
  tmp_draw.fillRect(16, 16, 4, 4);
  tmp_draw.fillRect(8, 20, 8, 4);
  tmp_draw.fillRect(4, 24, 4, 16);
  tmp_draw.fillRect(8, 40, 8, 4);
  tmp_draw.fillRect(16, 44, 4, 4);
  tmp_draw.fillRect(20, 48, 4, 4);
  tmp_draw.fillRect(24, 52, 4, 4);

  tmp_draw.fillRect(40, 24, 4, 4);
  tmp_draw.fillRect(44, 28, 4, 8);
  tmp_draw.fillRect(40, 36, 4, 4);

  tmp_draw.fillRect(48, 16, 4, 4);
  tmp_draw.fillRect(52, 20, 4, 4);
  tmp_draw.fillRect(56, 24, 4, 16);
  tmp_draw.fillRect(52, 40, 4, 4);
  tmp_draw.fillRect(48, 44, 4, 4);
}
