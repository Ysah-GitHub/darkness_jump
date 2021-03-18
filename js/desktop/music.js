app.music = {
  current: null,
  list: {
    bonetrousle: {
      author: "Toby Fox - Undertale",
      name: "Bonetrousle",
      src: "rsc/music/bonetrousle.mp3",
      size: 1.55,
      duration: {minute: 0, second: 58},
      link: "https://youtu.be/zdeZwAk6ULE"
    },
    spider_dance: {
      author: "Toby Fox - Undertale",
      name: "Spider Dance",
      src: "rsc/music/spider_dance.mp3",
      size: 2.62,
      duration: {minute: 1, second: 44},
      link: "https://youtu.be/YZ3XjVVNagU"
    }
  }
};

function music_play(name){
  let tmp_music = document.createElement("audio");
  tmp_music.src = app.music.list[name].src;
  tmp_music.volume = app.config.audio.volume;

  app.music.curent = tmp_music;
  app.music.curent.play();
}

function music_stop(){
  app.music.curent.pause();
}

function music_volume_update(volume){
  app.config.audio.volume = volume;
  if (app.music.curent != null) {
    app.music.curent.volume = app.config.audio.volume;
  }
}
