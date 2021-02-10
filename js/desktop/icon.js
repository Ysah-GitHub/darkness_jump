function icon_constructor(width, height, color, draw_func){
  let tmp_icon = document.createElement("canvas");
  tmp_icon.width = width;
  tmp_icon.height = height;
  draw_func(tmp_icon, color, width, height);
  return tmp_icon;
}

function icon_fillRect(draw, width, height, values){
  for (let i = 0; i < values.length; i++) {
    values[i] = (values[i] / 64);
  }
  draw.fillRect((width * values[0]), (height * values[1]), (width * values[2]), (height * values[3]));
}

function icon_close(width, height){
  return icon_constructor(width, height, "rgb(85, 85, 85)", icon_close_draw);
}

function icon_video(width, height){
  return icon_constructor(width, height, "rgb(65, 65, 65)", icon_video_draw);
}

function icon_interface(width, height){
  return icon_constructor(width, height, "rgb(65, 65, 65)", icon_interface_draw);
}

function icon_input(width, height){
  return icon_constructor(width, height, "rgb(65, 65, 65)", icon_input_draw);
}

function icon_audio(width, height){
  return icon_constructor(width, height, "rgb(65, 65, 65)", icon_audio_draw);
}

function icon_return(width, height){
  return icon_constructor(width, height, "rgb(65, 65, 65)", icon_return_draw);
}

function icon_close_draw(element, color, width, height){
  let tmp_draw = element.getContext("2d");
  tmp_draw.clearRect(0, 0, width, height);
  tmp_draw.fillStyle = color;

  let tmp_draw_value = [
    [18, 18, 4, 4],
    [22, 22, 4, 4],
    [26, 26, 4, 4],
    [30, 30, 4, 4],
    [34, 34, 4, 4],
    [38, 38, 4, 4],
    [42, 42, 4, 4],
    [42, 18, 4, 4],
    [38, 22, 4, 4],
    [34, 26, 4, 4],
    [26, 34, 4, 4],
    [22, 38, 4, 4],
    [18, 42, 4, 4]
  ];
  for (let i = 0; i < tmp_draw_value.length; i++) {
    icon_fillRect(tmp_draw, width, height, tmp_draw_value[i]);
  }
}

function icon_video_draw(element, color, width, height){
  let tmp_draw = element.getContext("2d");
  tmp_draw.clearRect(0, 0, width, height);
  tmp_draw.fillStyle = color;

  let tmp_draw_value = [
    [0, 4, 64, 4],
    [0, 4, 64, 4],
    [60, 8, 4, 44],
    [4, 48, 56, 4],
    [0, 8, 4, 44],
    [4, 40, 56, 4],
    [24, 52, 16, 4],
    [20, 56, 24, 4]
  ];
  for (let i = 0; i < tmp_draw_value.length; i++) {
    icon_fillRect(tmp_draw, width, height, tmp_draw_value[i]);
  }
}

function icon_interface_draw(element, color, width, height){
  let tmp_draw = element.getContext("2d");
  tmp_draw.clearRect(0, 0, width, height);
  tmp_draw.fillStyle = color;

  let tmp_draw_value = [
    [8, 8, 20, 20],
    [36, 8, 20, 20],
    [8, 36, 20, 20],
    [36, 36, 20, 20]
  ];
  for (let i = 0; i < tmp_draw_value.length; i++) {
    icon_fillRect(tmp_draw, width, height, tmp_draw_value[i]);
  }
}

function icon_input_draw(element, color, width, height){
  let tmp_draw = element.getContext("2d");
  tmp_draw.clearRect(0, 0, width, height);
  tmp_draw.fillStyle = color;

  let tmp_draw_value = [
    [44, 0, 4, 12],
    [28, 8, 16, 4],
    [28, 12, 4, 8],
    [12, 20, 40, 4],
    [52, 24, 4, 4],
    [56, 28, 4, 16],
    [8, 44, 48, 4],
    [4, 28, 4, 16],
    [8, 24, 4, 4],
    [16, 28, 4, 4],
    [20, 32, 4, 4],
    [16, 36, 4, 4],
    [12, 32, 4, 4],
    [44, 32, 4, 4],
    [36, 36, 4, 4]
  ];
  for (let i = 0; i < tmp_draw_value.length; i++) {
    icon_fillRect(tmp_draw, width, height, tmp_draw_value[i]);
  }
}

function icon_audio_draw(element, color, width, height){
  let tmp_draw = element.getContext("2d");
  tmp_draw.clearRect(0, 0, width, height);
  tmp_draw.fillStyle = color;

  let tmp_draw_value = [
    [24, 8, 4, 4],
    [20, 12, 4, 4],
    [28, 12, 4, 40],
    [16, 16, 4, 4],
    [8, 20, 8, 4],
    [4, 24, 4, 16],
    [8, 40, 8, 4],
    [16, 44, 4, 4],
    [20, 48, 4, 4],
    [24, 52, 4, 4],
    [40, 24, 4, 4],
    [44, 28, 4, 8],
    [40, 36, 4, 4],
    [48, 16, 4, 4],
    [52, 20, 4, 4],
    [56, 24, 4, 16],
    [52, 40, 4, 4],
    [48, 44, 4, 4]
  ];
  for (let i = 0; i < tmp_draw_value.length; i++) {
    icon_fillRect(tmp_draw, width, height, tmp_draw_value[i]);
  }
}

function icon_return_draw(element, color, width, height){
  let tmp_draw = element.getContext("2d");
  tmp_draw.clearRect(0, 0, width, height);
  tmp_draw.fillStyle = color;

  let tmp_draw_value = [
    [16, 22, 32, 4],
    [44, 26, 4, 18],
    [20, 44, 28, 4],
    [24, 16, 4, 16],
    [20, 19, 4, 10],
  ];
  for (let i = 0; i < tmp_draw_value.length; i++) {
    icon_fillRect(tmp_draw, width, height, tmp_draw_value[i]);
  }
}
