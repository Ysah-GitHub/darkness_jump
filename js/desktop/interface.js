function interface_load(){
  interface_create();
  interface_start_create();
  interface_options_create();
}

function interface_create(){
  let tmp_interface = document.createElement("div");
  tmp_interface.id = "interface";
  document.body.prepend(tmp_interface);
}

function interface_start_create(){
  let tmp_start = document.createElement("div");
  tmp_start.id = "interface_start";
  tmp_start.textContent = "Start";
  tmp_start.onclick = engine_start;
  document.getElementById("interface").prepend(tmp_start);
}

function interface_start_remove(){
  document.getElementById("interface_start").remove();
}

function interface_options_create(){
  let tmp_options = document.createElement("div");
  tmp_options.id = "interface_options";
  tmp_options.textContent = "Options";
  document.getElementById("interface_start").after(tmp_options);
}

function interface_options_remove(){
  document.getElementById("interface_options").remove();
}
