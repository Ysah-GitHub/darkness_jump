function options_create(){
  let tmp_options_panel_left = document.createElement("div");
  tmp_options_panel_left.id = "options_panel_left";

  let tmp_icon_array = [
    "video",
    "interface",
    "input",
    "audio"
  ];
  for (let i = 0; i < tmp_icon_array.length; i++) {
    let tmp_icon = document.createElement("span");
    tmp_icon.id = "options_icon_" + tmp_icon_array[i];
    tmp_icon.className = "canvas";
    tmp_icon.append(window["icon_" + tmp_icon_array[i]]());
    tmp_icon.onclick = function(){options_select(tmp_icon_array[i])};
    tmp_options_panel_left.append(tmp_icon);
  }
  document.getElementById("interface").append(tmp_options_panel_left);

  let tmp_options_panel_right = document.createElement("div");
  tmp_options_panel_right.id = "options_panel_right";

  let tmp_icon_close_options = document.createElement("span");
  tmp_icon_close_options.id = "icon_close_options";
  tmp_icon_close_options.append(icon_close_options());
  tmp_options_panel_right.append(tmp_icon_close_options);

  document.getElementById("interface").append(tmp_options_panel_right);

  engine.options = "video";
  document.getElementById("options_icon_video").classList.add("active");
  options_video();
}

function options_remove(){
  delete engine.options;
  document.getElementById("options_panel_left").remove();
  document.getElementById("options_panel_right").remove();
}

function options_select(tmp_options){
  document.getElementById("options_content").remove();
  document.getElementById("options_icon_" + engine.options).classList.remove("active");

  engine.options = tmp_options;
  document.getElementById("options_icon_" + engine.options).classList.add("active");
  window["options_" + engine.options]();
}

function options_video(){
  let tmp_options_video = document.createElement("div");
  tmp_options_video.id = "options_content";

  let tmp_options_title = document.createElement("span");
  tmp_options_title.id = "options_title";
  tmp_options_title.textContent = "Video";
  tmp_options_video.append(tmp_options_title)

  let tmp_options_resolution = document.createElement("span");
  tmp_options_resolution.className = "text options_name";
  tmp_options_resolution.textContent = "Resolution : ";
  tmp_options_video.append(tmp_options_resolution);

  tmp_options_resolution = document.createElement("select");
  tmp_options_resolution.className = "text options_select";
  tmp_options_resolution.onchange = function(){
    if (this.value == 0) {
      engine.width = window.outerWidth;
      engine.height = window.outerHeight;
      engine.config.video.resolution.id = this.value;
      engine.config.video.resolution.value = window.outerWidth + "x" + window.outerHeight;
    }
    else {
      engine.width = Number(this.children[this.value].textContent.split("x")[0]);
      engine.height = Number(this.children[this.value].textContent.split("x")[1]);;
      engine.config.video.resolution.id = this.value;
      engine.config.video.resolution.value = this.children[this.value].textContent;
    }
    engine_resolution_resize();
    engine_config_save();
  };

  let tmp_resolution_array = [
    (window.outerWidth + "x" + window.outerHeight),
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
  for (let i = 0; i < tmp_resolution_array.length; i++) {
    let tmp_option = document.createElement("option");
    tmp_option.value = [i];
    tmp_option.textContent = tmp_resolution_array[i];
    if (engine.config.video.resolution.id == i) {
      tmp_option.setAttribute("selected", "");
    }
    tmp_options_resolution.append(tmp_option);
  }
  tmp_options_video.append(tmp_options_resolution);

  let tmp_options_framerate = document.createElement("span");
  tmp_options_framerate.className = "text options_name";
  tmp_options_framerate.textContent = "Framerate : ";
  tmp_options_video.append(tmp_options_framerate);

  tmp_options_framerate = document.createElement("select");
  tmp_options_framerate.className = "text options_select";
  tmp_options_framerate.onchange = function(){
    engine_refresh_stop();
    engine.config.video.framerate.id = this.value;
    if (this.value == 0) {
      engine.config.video.framerate.value = this.children[this.value].textContent;
    }
    else {
      engine.config.video.framerate.value = Number(this.children[this.value].textContent);
    }
    engine_refresh_start();
    engine_config_save();
  };

  let tmp_framerate_array = [
    "Auto",
    240,
    144,
    60
  ];
  for (let i = 0; i < tmp_framerate_array.length; i++) {
    let tmp_option = document.createElement("option");
    tmp_option.value = [i];
    tmp_option.textContent = tmp_framerate_array[i];
    if (engine.config.video.framerate.id == i) {
      tmp_option.setAttribute("selected", "");
    }
    tmp_options_framerate.append(tmp_option);
  }
  tmp_options_video.append(tmp_options_framerate);

  document.getElementById("options_panel_right").append(tmp_options_video);
}

function options_interface(){
  let tmp_options_interface = document.createElement("div");
  tmp_options_interface.id = "options_content";

  let tmp_options_title = document.createElement("span");
  tmp_options_title.id = "options_title";
  tmp_options_title.textContent = "Interface";
  tmp_options_interface.append(tmp_options_title)

  document.getElementById("options_panel_right").append(tmp_options_interface);
}

function options_input(){
  let tmp_options_input = document.createElement("div");
  tmp_options_input.id = "options_content";

  let tmp_options_title = document.createElement("span");
  tmp_options_title.id = "options_title";
  tmp_options_title.textContent = "Input";
  tmp_options_input.append(tmp_options_title)

  document.getElementById("options_panel_right").append(tmp_options_input);
}

function options_audio(){
  let tmp_options_audio = document.createElement("div");
  tmp_options_audio.id = "options_content";

  let tmp_options_title = document.createElement("span");
  tmp_options_title.id = "options_title";
  tmp_options_title.textContent = "Audio";
  tmp_options_audio.append(tmp_options_title)

  document.getElementById("options_panel_right").append(tmp_options_audio);
}
