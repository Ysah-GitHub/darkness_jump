function options_interface(){
  let tmp_options = document.createElement("div")
  tmp_options.id = "options";

  let tmp_options_left = document.createElement("div");
  tmp_options_left.id = "options_left";

  tmp_options_left.append(options_icon("video"));
  tmp_options_left.append(options_icon("interface"));
  tmp_options_left.append(options_icon("input"));
  tmp_options_left.append(options_icon("audio"));

  tmp_options.append(tmp_options_left);

  document.getElementById("interface").append(tmp_options);

  document.getElementById("options_left").children[0].click();
}

function options_icon(name){
  let tmp_icon = document.createElement("span");
  tmp_icon.id = "options_icon_" + name;
  tmp_icon.className = "icon";
  tmp_icon.append(window["icon_" + name](app.engine.height * 0.035, app.engine.height * 0.035));
  tmp_icon.onclick = function(){
    if (document.getElementById("options_right")) {
      document.getElementById("options_icon_" + document.getElementById("options_right").className).classList.remove("selected");
      document.getElementById("options_right").remove();
    }
    document.getElementById("options_icon_" + name).classList.add("selected");
    options_right(name);
  };
  return tmp_icon;
}

function options_right(name){
  let tmp_options = document.createElement("div");
  tmp_options.id = "options_right";
  tmp_options.className = name;

  let tmp_title = document.createElement("span");
  tmp_title.id = "options_title";
  tmp_title.className = "text";
  tmp_title.textContent = name.charAt(0).toUpperCase() + name.slice(1);;
  tmp_options.append(tmp_title);

  let tmp_icon_close = document.createElement("span");
  tmp_icon_close.id = "options_icon_close";
  tmp_icon_close.className = "icon close";
  tmp_icon_close.onclick = function(){document.getElementById("options").remove(); menu_main_interface()};
  tmp_icon_close.append(icon_close(app.engine.height * 0.05, app.engine.height * 0.05));
  tmp_options.append(tmp_icon_close);

  window["options_right_" + name](tmp_options);

  document.getElementById("options_left").after(tmp_options);
}

function options_right_video(tmp_options){
  let tmp_container = options_right_container();
  tmp_container.append(options_right_name("Resolution"));

  let tmp_select = document.createElement("select");
  tmp_select.className = "text options_input_select";
  tmp_select.onchange = function(){
    app.config.video.resolution = this.children[this.value].textContent;
    app_config_save();

    engine_resolution(app.config.video.resolution);
    engine_resolution_update()
    options_interface_reload("video");
  };

  let tmp_option_array = engine_resolution_list();
  for (let i = 0; i < tmp_option_array.length; i++) {
    let tmp_option = document.createElement("option");
    tmp_option.value = [i];
    tmp_option.textContent = tmp_option_array[i];
    if (app.config.video.resolution == tmp_option_array[i]) {
      tmp_option.setAttribute("selected", "");
    }
    tmp_select.append(tmp_option);
  }
  tmp_container.append(tmp_select);
  tmp_options.append(tmp_container);

  tmp_container = options_right_container();
  tmp_container.append(options_right_name("Framerate"));

  tmp_select = document.createElement("select");
  tmp_select.className = "text options_input_select";
  tmp_select.onchange = function(){
    engine_refresh_stop();
    if (this.value == 0) {
      app.config.video.framerate = this.children[this.value].textContent;
    }
    else {
      app.config.video.framerate = Number(this.children[this.value].textContent);
    }
    engine_refresh_start();
    app_config_save();
  };

  tmp_option_array = ["Auto", 30, 60, 75, 120, 144, 240];
  for (let i = 0; i < tmp_option_array.length; i++) {
    let tmp_option = document.createElement("option");
    tmp_option.value = [i];
    tmp_option.textContent = tmp_option_array[i];
    if (app.config.video.framerate == tmp_option_array[i]) {
      tmp_option.setAttribute("selected", "");
    }
    tmp_select.append(tmp_option);
  }
  tmp_container.append(tmp_select);
  tmp_options.append(tmp_container);

  tmp_container = options_right_container();
  tmp_container.append(options_right_name("Interval"));

  tmp_select = document.createElement("select");
  tmp_select.className = "text options_input_select";
  tmp_select.onchange = function(){
    app.config.video.interval = this.children[this.value].textContent;
    player_speed_default();
    app_config_save();
  };

  tmp_option_array = [50, 75, 100, 125, 150, 175, 200, 225, 250];
  for (let i = 0; i < tmp_option_array.length; i++) {
    let tmp_option = document.createElement("option");
    tmp_option.value = [i];
    tmp_option.textContent = tmp_option_array[i];
    if (app.config.video.interval == tmp_option_array[i]) {
      tmp_option.setAttribute("selected", "");
    }
    tmp_select.append(tmp_option);
  }
  tmp_container.append(tmp_select);
  tmp_options.append(tmp_container);

  tmp_option_array = ["hidden", "visible"];
  tmp_container = options_right_container();
  tmp_container.append(options_right_name("Explosion"));
  tmp_container.append(options_right_select(app.config.video, "explosion", tmp_option_array));
  tmp_options.append(tmp_container);
}

function options_right_interface(tmp_options){
  let tmp_container = options_right_container();
  tmp_container.append(options_right_name("Ground Color"));

  let tmp_input = document.createElement("span");
  tmp_input.id = "options_interface_ground_color";
  tmp_input.className = "options_input_color";
  tmp_input.onclick = function(){this.children[1].click()};

  let tmp_text = document.createElement("span");
  tmp_text.className = "text";
  tmp_text.textContent = app.config.interface.ground_color;
  tmp_input.append(tmp_text);

  let tmp_input_color = document.createElement("input");
  tmp_input_color.type = "color";
  tmp_input_color.value = app.config.interface.ground_color;
  tmp_input_color.oninput = function(){
    document.getElementById("options_interface_ground_color").children[0].textContent = this.value;
    app.config.interface.ground_color = this.value
  };
  tmp_input_color.onchange = app_config_save;
  tmp_input.append(tmp_input_color);
  tmp_container.append(tmp_input);

  let tmp_icon = document.createElement("span");
  tmp_icon.className = "icon options_icon_default_value";
  tmp_icon.onclick = function(){
    document.getElementById("options_interface_ground_color").children[0].textContent = "#555555";
    app.config.interface.ground_color = "#555555";
    app_config_save();
  };
  tmp_icon.append(icon_return(app.engine.height * 0.03, app.engine.height * 0.03));
  tmp_container.append(tmp_icon);
  tmp_options.append(tmp_container);

  let tmp_option_array = ["en", "fr"];
  tmp_container = options_right_container();
  tmp_container.append(options_right_name("Language"));
  tmp_container.append(options_right_select(app.config.interface, "language", tmp_option_array));
  tmp_options.append(tmp_container);

  tmp_option_array = ["hidden", "visible"];
  tmp_container = options_right_container();
  tmp_container.append(options_right_name("Score"));
  tmp_container.append(options_right_select(app.config.interface, "score", tmp_option_array));
  tmp_options.append(tmp_container);

  tmp_container = options_right_container();
  tmp_container.append(options_right_name("Timer"));
  tmp_container.append(options_right_select(app.config.interface, "timer", tmp_option_array));
  tmp_options.append(tmp_container);
}

function options_right_input(tmp_options){
  let tmp_container = options_right_container();
  tmp_container.append(options_right_name("Jump"));
  tmp_container.append(options_right_input_key("jump"));
  tmp_container.append(options_right_input_icon_default("jump"));
  tmp_options.append(tmp_container);

  tmp_container = options_right_container();
  tmp_container.append(options_right_name("Left"));
  tmp_container.append(options_right_input_key("left"));
  tmp_container.append(options_right_input_icon_default("left"));
  tmp_options.append(tmp_container);

  tmp_container = options_right_container();
  tmp_container.append(options_right_name("Right"));
  tmp_container.append(options_right_input_key("right"));
  tmp_container.append(options_right_input_icon_default("right"));
  tmp_options.append(tmp_container);

  tmp_container = options_right_container();
  tmp_container.append(options_right_name("Dash"));
  tmp_container.append(options_right_input_key("dash"));
  tmp_container.append(options_right_input_icon_default("dash"));
  tmp_options.append(tmp_container);

  tmp_container = options_right_container();
  tmp_container.append(options_right_name("Start"));
  tmp_container.append(options_right_input_key("start"));
  tmp_container.append(options_right_input_icon_default("start"));
  tmp_options.append(tmp_container);

  tmp_container = options_right_container();
  tmp_container.append(options_right_name("Return"));
  tmp_container.append(options_right_input_key("return"));
  tmp_container.append(options_right_input_icon_default("return"));
  tmp_options.append(tmp_container);
}

function options_right_audio(tmp_options){
  let tmp_container = options_right_container();
  tmp_container.append(options_right_name("Music"));

  let tmp_input = document.createElement("input");
  tmp_input.id = "options_music_input_range";
  tmp_input.className = "options_input_range";
  tmp_input.type = "range";
  tmp_input.min = "0";
  tmp_input.max = "100";
  tmp_input.value = app.config.audio.volume * 100;
  tmp_input.oninput = function(){
    music_volume_update(this.value / 100);
    document.getElementById("options_music_input_number").value = this.value;
  };
  tmp_input.onchange = app_config_save;
  tmp_container.append(tmp_input);

  tmp_input = document.createElement("input");
  tmp_input.id = "options_music_input_number";
  tmp_input.className = "text options_input_number";
  tmp_input.type = "number";
  tmp_input.min = "0";
  tmp_input.max = "100";
  tmp_input.value = app.config.audio.volume * 100;
  tmp_input.onchange = function(){
    music_volume_update(this.value / 100);
    document.getElementById("options_music_input_range").value = this.value;
    app_config_save();
  };
  tmp_container.append(tmp_input);
  tmp_options.append(tmp_container);
}

function options_right_input_key(key){
  tmp_key = document.createElement("span");
  tmp_key.id = "options_input_key" + key;
  tmp_key.className = "text options_input_key";
  tmp_key.textContent = app.config.input[key].key;
  tmp_key.onmouseover = function(){
    this.textContent = "Press key";
    window.onkeydown = function(e){
      if (event.keyCode == 32) {
        app.config.input[key].key = "Space";
        app.config.input[key].keyCode = event.keyCode;
      }
      else {
        app.config.input[key].key = event.key;
        app.config.input[key].keyCode = event.keyCode;
      }
      document.getElementById("options_input_key" + key).textContent = app.config.input[key].key;
      app_config_save();
    };
    this.onmouseout = function(){
      window.onkeydown = null;
      this.onmouseout = null;
      this.textContent = app.config.input[key].key;
    };
  };
  return tmp_key;
}

function options_right_input_icon_default(key){
  let tmp_icon = document.createElement("span");
  tmp_icon.className = "icon options_icon_default_value";
  tmp_icon.onclick = function(){
    app.config.input[key] = app_config_default().input[key];
    document.getElementById("options_input_key" + key).textContent = app.config.input[key].key;
    app_config_save();
  };
  tmp_icon.append(icon_return(app.engine.height * 0.03, app.engine.height * 0.03));

  return tmp_icon;
}

function options_right_container(){
  let tmp_container = document.createElement("div");
  tmp_container.className = "options_right_container";
  return tmp_container;
}

function options_right_name(name){
  let tmp_name = document.createElement("span");
  tmp_name.className = "text options_name";
  tmp_name.textContent = name;
  return tmp_name;
}

function options_right_select(obj, config, option){
  let tmp_select = document.createElement("select");
  tmp_select.className = "text options_input_select";
  tmp_select.onchange = function(){obj[config] = this.children[this.value].textContent; app_config_save()};
  for (let i = 0; i < option.length; i++) {
    let tmp_option = document.createElement("option");
    tmp_option.value = [i];
    tmp_option.textContent = option[i];
    if (obj[config] == option[i]) {
      tmp_option.setAttribute("selected", "");
    }
    tmp_select.append(tmp_option);
  }
  return tmp_select;
}

function options_interface_reload(option){
  document.getElementById("options").remove();
  options_interface();
}
