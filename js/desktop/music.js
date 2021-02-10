var music = {
  current: null,
  list: {
    bonetrousle: {
      author: "Toby Fox - Undertal",
      name: "Bonetrousle",
      src: "rsc/music/bonetrousle.mp3",
      size: 2.21,
      duration: 0.57
    },
    spider_dance: {
      author: "Toby Fox - Undertal",
      name: "Spider Dance",
      src: "rsc/music/spider_dance.mp3",
      size: 4.07,
      duration: 1.46
    }
  }
};

function music_play(name){
  let tmp_music = document.createElement("audio");
  tmp_music.src = music.list[name].src;
  tmp_music.volume = engine.config.audio.volume;

  music.curent = tmp_music;
  music.curent.play();
}

function music_stop(){
  music.curent.pause();
}

function music_volume_update(volume){
  engine.config.audio.volume = volume;
  music.curent.volume = engine.config.audio.volume;
}
