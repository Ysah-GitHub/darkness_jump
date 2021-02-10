function interface_load(){
  interface_create();
  interface_menu_create();
}

function interface_create(){
  let tmp_interface = document.createElement("div");
  tmp_interface.id = "interface";
  tmp_interface.style.width = engine.config.interface.resolution.value.split("x")[0] + "px";
  tmp_interface.style.height = engine.config.interface.resolution.value.split("x")[1] + "px";
  document.body.prepend(tmp_interface);
}

function interface_resize(){
  document.getElementById("interface").style.width = engine.config.interface.resolution.value.split("x")[0] + "px";
  document.getElementById("interface").style.height = engine.config.interface.resolution.value.split("x")[1] + "px";
}

function interface_menu_create(){
  let tmp_menu = document.createElement("div")
  tmp_menu.id = "interface_menu";

  let tmp_start = document.createElement("div");
  tmp_start.id = "menu_start";
  tmp_start.style.width = (engine.height * 0.2) + "px";
  tmp_start.style.marginTop = (engine.height / 4) - (engine.height * 0.045) + "px";
  tmp_start.style.padding = (engine.height * 0.015) + "px";
  tmp_start.style.fontSize = (engine.height * 0.03) + "px";
  tmp_start.textContent = "Start";
  tmp_start.onclick = function(){
    document.getElementById("interface_menu").remove();
    stage_selection_interface();
  };
  tmp_menu.append(tmp_start);

  let tmp_options = document.createElement("div");
  tmp_options.id = "menu_options";
  tmp_options.style.width = (engine.height * 0.2) + "px";
  tmp_options.style.padding = (engine.height * 0.015) + "px";
  tmp_options.style.fontSize = (engine.height * 0.015) + "px";
  tmp_options.textContent = "Options";
  tmp_options.onclick = function(){
    control_keydown_unset();
    control_keyup_unset();
    interface_menu_remove();
    interface_options_create();
    interface_options_select_add("video");
  };
  tmp_menu.append(tmp_options);

  document.getElementById("interface").append(tmp_menu);
}

function interface_menu_remove(){
  document.getElementById("interface_menu").remove();
}

function interface_options_create(){
  let tmp_options = document.createElement("div")
  tmp_options.id = "interface_options";

  let tmp_options_left = document.createElement("div");
  tmp_options_left.id = "options_left";
  tmp_options_left.style.width = (engine.height * 0.1) + "px";
  tmp_options_left.style.height = (engine.height * 0.7) + "px";
  tmp_options_left.style.marginTop = (engine.height * 0.15) + "px";
  tmp_options_left.style.marginLeft = (engine.width / 2) - ((engine.height * 0.7) / 2) - ((engine.height * 0.1) + 64) + "px";

  tmp_options_left.append(interface_options_create_icon("video"));
  tmp_options_left.append(interface_options_create_icon("interface"));
  tmp_options_left.append(interface_options_create_icon("input"));
  tmp_options_left.append(interface_options_create_icon("audio"));

  tmp_options.append(tmp_options_left);

  let tmp_options_right = document.createElement("div");
  tmp_options_right.id = "options_right";
  tmp_options_right.style.width = (engine.height * 0.7) + "px";
  tmp_options_right.style.height = (engine.height * 0.7) + "px";
  tmp_options_right.style.marginTop = (engine.height * 0.15) + "px";

  tmp_options_right.append(interface_options_create_icon_close());

  tmp_options.append(tmp_options_right);

  document.getElementById("interface").append(tmp_options);
}

function interface_options_create_icon(name){
  let tmp_icon_size = engine.height * 0.05;
  let tmp_icon = document.createElement("span");
  tmp_icon.id = "options_icon_" + name;
  tmp_icon.className = "canvas";
  tmp_icon.style.padding = (tmp_icon_size / 4) + "px " + (tmp_icon_size / 2) + "px";
  tmp_icon.append(window["icon_" + name](tmp_icon_size, tmp_icon_size));
  tmp_icon.onclick = function(){interface_options_select(name)};
  return tmp_icon;
}

function interface_options_create_icon_close(){
  let tmp_icon_close = document.createElement("span");
  tmp_icon_close.id = "icon_close_options";
  tmp_icon_close.className = "canvas";
  tmp_icon_close.onclick = function(){
    interface_options_remove();
    interface_menu_create();
    control_keydown_set();
    control_keyup_set();
  };
  tmp_icon_close.append(icon_close(engine.height * 0.05, engine.height * 0.05));
  return tmp_icon_close;
}

function interface_options_remove(){
  document.getElementById("interface_options").remove();
  delete engine.options;
}

function interface_options_select(tmp_options){
  interface_options_select_remove();
  interface_options_select_add(tmp_options);
}

function interface_options_select_add(tmp_options){
  engine.options = tmp_options;
  document.getElementById("options_icon_" + engine.options).classList.add("active");
  window["interface_options_" + engine.options]();
}

function interface_options_select_remove(){
  document.getElementById("options_right_content").remove();
  document.getElementById("options_icon_" + engine.options).classList.remove("active");
}

function interface_options_video(){
  let tmp_options_video = document.createElement("div");
  tmp_options_video.id = "options_right_content";

  tmp_options_video.append(interface_options_title("Video"));

  tmp_options_video.append(interface_options_name("Resolution"));

  tmp_options_resolution = document.createElement("select");
  tmp_options_resolution.className = "text options_select";
  tmp_options_resolution.style.height = Math.round(engine.height * 0.05) + "px";
  tmp_options_resolution.style.padding = Math.round(engine.height * 0.015) + "px";
  tmp_options_resolution.style.fontSize = Math.round(engine.height * 0.015) + "px";
  tmp_options_resolution.onchange = function(){
    engine.config.video.resolution.id = this.value;
    engine.config.video.resolution.value = this.children[this.value].textContent;
    engine.config.interface.resolution.id = this.value;
    engine.config.interface.resolution.value = this.children[this.value].textContent;
    engine.width = Number(this.children[this.value].textContent.split("x")[0]);
    engine.height = Number(this.children[this.value].textContent.split("x")[1]);
    engine_resolution_resize();
    interface_resize();
    interface_options_remove();
    interface_options_create();
    interface_options_select_add("video");
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

  tmp_options_video.append(interface_options_name("Framerate"));

  tmp_options_framerate = document.createElement("select");
  tmp_options_framerate.className = "text options_select";
  tmp_options_framerate.style.height = Math.round(engine.height * 0.05) + "px";
  tmp_options_framerate.style.padding = Math.round(engine.height * 0.015) + "px";
  tmp_options_framerate.style.fontSize = Math.round(engine.height * 0.015) + "px";
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
    120,
    75,
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

  document.getElementById("options_right").append(tmp_options_video);
}

function interface_options_interface(){
  let tmp_options_interface = document.createElement("div");
  tmp_options_interface.id = "options_right_content";

  tmp_options_interface.append(interface_options_title("Interface"));

  document.getElementById("options_right").append(tmp_options_interface);
}

function interface_options_input(){
  let tmp_options_input = document.createElement("div");
  tmp_options_input.id = "options_right_content";

  tmp_options_input.append(interface_options_title("Input"));

  tmp_options_input.append(interface_options_name("Jump"));
  tmp_options_input.append(interface_options_input_key("jump"));
  tmp_options_input.append(interface_options_input_icon_return("jump"));

  tmp_options_input.append(interface_options_name("Left"));
  tmp_options_input.append(interface_options_input_key("left"));
  tmp_options_input.append(interface_options_input_icon_return("left"));

  tmp_options_input.append(interface_options_name("Right"));
  tmp_options_input.append(interface_options_input_key("right"));
  tmp_options_input.append(interface_options_input_icon_return("right"));

  tmp_options_input.append(interface_options_name("Start"));
  tmp_options_input.append(interface_options_input_key("start"));
  tmp_options_input.append(interface_options_input_icon_return("start"));

  document.getElementById("options_right").append(tmp_options_input);
}

function interface_options_audio(){
  let tmp_options_audio = document.createElement("div");
  tmp_options_audio.id = "options_right_content";

  // let tmp_options_name = document.createElement("span");
  // tmp_options_name.className = "options_name";
  // tmp_options_name.style.lineHeight = Math.round(engine.height * 0.05) + "px";
  // tmp_options_name.style.fontSize = Math.round(engine.height * 0.015) + "px";
  // tmp_options_name.textContent = name + " :";
  // return tmp_options_name;

  tmp_options_audio.append(interface_options_title("Audio"));

  tmp_options_audio.append(interface_options_name("Music"));

  let tmp_input = document.createElement("input");
  tmp_input.className = "option_range";
  tmp_input.style.setProperty("--option_range_height", (engine.height * 0.015) + "px");
  tmp_input.type = "range";
  tmp_input.min = "0";
  tmp_input.max = "100";
  tmp_input.value = engine.config.audio.volume * 100;
  tmp_input.oninput = function(){music_volume_update(this.value / 100)};
  tmp_input.onchange = engine_config_save;
  tmp_options_audio.append(tmp_input)

  document.getElementById("options_right").append(tmp_options_audio);
}

function interface_options_title(title){
  let tmp_title = document.createElement("span");
  tmp_title.id = "options_title";
  tmp_title.style.lineHeight = Math.round(engine.height * 0.05) + "px";
  tmp_title.style.fontSize = Math.round(engine.height * 0.02) + "px";
  tmp_title.textContent = title;
  return tmp_title;
}

function interface_options_name(name){
  let tmp_options_name = document.createElement("span");
  tmp_options_name.className = "options_name";
  tmp_options_name.style.lineHeight = Math.round(engine.height * 0.05) + "px";
  tmp_options_name.style.fontSize = Math.round(engine.height * 0.015) + "px";
  tmp_options_name.textContent = name + " :";
  return tmp_options_name;
}

function interface_options_input_key(key){
  tmp_options_input_key = document.createElement("span");
  tmp_options_input_key.id = "options_input_key" + key;
  tmp_options_input_key.className = "options_input_key";
  tmp_options_input_key.style.height = (engine.height * 0.05) + "px";
  tmp_options_input_key.style.padding = (engine.height * 0.015) + "px";
  tmp_options_input_key.style.fontSize = (engine.height * 0.015) + "px";
  tmp_options_input_key.textContent = engine.config.input[key].key;
  tmp_options_input_key.onmouseover = function(){
    this.textContent = "Press key";
    window.addEventListener("keydown", function(){

    });
    window.onkeydown = function(e){
      if (event.keyCode == 32) {
        engine.config.input[key].key = "space";
        engine.config.input[key].keyCode = event.keyCode;
      }
      else {
        engine.config.input[key].key = event.key;
        engine.config.input[key].keyCode = event.keyCode;
      }
      document.getElementById("options_input_key" + key).textContent = engine.config.input[key].key;
      engine_config_save();
    };
    this.onmouseout = function(){
      window.onkeydown = null;
      this.onmouseout = null;
      this.textContent = engine.config.input[key].key;
    };
  };
  return tmp_options_input_key;
}

function interface_options_input_icon_return(key){
  tmp_options_input_key_icon = document.createElement("span");
  tmp_options_input_key_icon.className = "canvas options_input_key_icon";
  tmp_options_input_key_icon.onclick = function(){
    engine.config.input[key] = control_load_default()[key];
    document.getElementById("options_input_key" + key).textContent = engine.config.input[key].key;
    engine_config_save();
  };
  tmp_options_input_key_icon.append(icon_return(engine.height * 0.05, engine.height * 0.05));

  return tmp_options_input_key_icon;
}
