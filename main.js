let volume_slider = document.querySelector(".volume_slider");
let btn = document.querySelectorAll('.song #play_btn');
let song = document.querySelectorAll('#music');

/*popup music player part*/
let p_m_player = document.querySelector('.popup_music_player');
let down_player = document.querySelector('#down_player');
let current_track_name = document.querySelector('#current_track_name');
let current_singer_name = document.querySelector('#current_singer_name');
let song_img = document.querySelector('.song_img');

/*controlls part*/
let play_pause_btn = document.querySelector('#play_pause_btn');
let slider = document.querySelector('#slider');
let forward_btn = document.querySelector('#forward_btn');
let backward_btn = document.querySelector('#backward_btn');

/*songs duration*/
let current_duration = document.querySelector('.controlls .progress_part #current_duration');
let total_duration = document.querySelector('.controlls .progress_part #total_duration');

/*small music player part*/
let s_m_player = document.querySelector('.small_music_player');
let playing_img = document.querySelector('.playing_img');
let wave_animation = document.querySelector('.wave_animation');
let up_player = document.querySelector('#up_player');
let song_name = document.querySelector('#song_name');
let artist_name = document.querySelector('#artist_name');


/*default values*/
let is_song_played = false;
let song_status = false;
let index_no = 0;

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;

}


btn.forEach((btn,index) => {
  btn.addEventListener('click', function(){

    s_m_player.style.transform = 'translateY(0px)';
    
    if (index != index_no) {
      song_status = false;
    }
    
    index_no = index;

    song[index].currentTime = 0;

  	if (song_status == false) {
      play_song();
  	}else{
      pause_song();	 
  	}

  });
});


/*pause song*/
function pause_song(){
  song[index_no].pause();
  song_status = false;
  clearInterval(update_second);
  wave_animation.style.opacity = '0';
  play_pause_btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  audio.pause();
  
}


/*This function will update every 1s*/
 function update_second(){

	  let position = 0;

    // update slider position
		if(!isNaN(song[index_no].duration)){
		   position = song[index_no].currentTime * (100 / song[index_no].duration);
		   slider.value =  position;
	      }

    let durationMinutes = Math.floor(song[index_no].duration / 60);
    let durationSeconds = Math.floor(song[index_no].duration - durationMinutes * 60);
    total_duration.textContent = durationMinutes + ":" + durationSeconds;

    // Calculate the time left and the total duration
    let curr_minutes = Math.floor(song[index_no].currentTime / 60);
    let curr_seconds = Math.floor(song[index_no].currentTime - curr_minutes * 60);
 
    // Add a zero to the single digit time values
    if (curr_seconds < 10) { curr_seconds = "0" + curr_seconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
 
    // Display the updated duration
    current_duration.textContent = curr_minutes + ":" + curr_seconds;

       
// function will run when the song is over
	if (song[index_no].ended) {
      clearInterval(update_second);
  	  wave_animation.style.opacity = '0';
      play_pause_btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
      index_no = index_no + 1;
      if (index_no == All_song.length) {
        index_no = 0;
      }
    
      song[index_no].currentTime = 0;
        play_song();
        random_bg_color();
    }
 }
 

/*show popup music player */
up_player.addEventListener('click', function(){
   p_m_player.style.transform = 'translateY(0%)';
});


/* Hide popup music player */
down_player.addEventListener('click', function(){
   p_m_player.style.transform = 'translateY(110%)';
});


/*play pause btn inside the popup Music player*/
play_pause_btn.addEventListener('click', function(){
    if (song_status == false) {
  		song[index_no].play();
      song_status = true;
      wave_animation.style.opacity = '1';
  		this.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  	}else{
  		song[index_no].pause();
      song_status = false;
      wave_animation.style.opacity = '0';
      this.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  	}
    audio.pause();
});


// change slider position 
function change_duration(){
	slider_position = song[index_no].duration * (slider.value / 100);
	song[index_no].currentTime = slider_position;
}


/*forward btn (next)*/
forward_btn.addEventListener('click', function(){
   
   index_no = index_no + 1;
    if (index_no == All_song.length) {
      index_no = 0;
    }
  
    song[index_no].currentTime = 0;
      play_song();
      random_bg_color();
      audio.pause();
});


/*backward btn (previous)*/
backward_btn.addEventListener('click', function(){
    
    if (index_no == 0) {
      index_no = All_song.length-1;
    }else{
      index_no = index_no -1;
    }

    song[index_no].currentTime = 0;

    play_song();
    random_bg_color();
    audio.pause();
});


/*play function*/
function play_song(){
  song[index_no].play();
  
  if (is_song_played == true) {
      document.querySelector(".active_song").pause();
      document.querySelector(".active_song").classList.remove("active_song");
  }else{
        is_song_played = true;
    }
    
  song[index_no].classList.add("active_song");

  song_status = true;
  setInterval(update_second, 1000);
  wave_animation.style.opacity = '1';
  p_m_player.style.transform = 'translateY(0%)';

  song_img.innerHTML = `<img src="${All_song[index_no].img}" />`;
  playing_img.innerHTML = `<img src="${All_song[index_no].img}" />`;

  song_name.innerHTML = All_song[index_no].name;
  artist_name.innerHTML = All_song[index_no].singer;

  current_track_name.innerHTML = All_song[index_no].name;
  current_singer_name.innerHTML = All_song[index_no].singer;
  play_pause_btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  random_bg_color();
  audio.pause();
}

/*Lấy thời gian tết âm lịch (mily giây)*/
var tetAmLich = new Date(2022, 1, 16, 0, 0, 0).getTime();
function newYear() {
    /*Lấy thời gian ngày hiện tại (mily giây) */
    var ngayHienTai = new Date().getTime();

    /*Tính thời gian còn lại (mily giây) */
    thoigianConLai = tetAmLich - ngayHienTai;

   /*Chuyển đơn vị thời gian tương ứng sang mili giây*/
    var giay = 1000;
    var phut = giay * 60;
    var gio = phut * 60;
    var ngay = gio * 24;

   /*Tìm ra thời gian theo ngày, giờ, phút giây còn lại thông qua cách chia lấy dư(%) và làm tròn số(Math.floor) trong Javascript*/
    var d = Math.floor(thoigianConLai / (ngay));
    var h = Math.floor((thoigianConLai % (ngay)) / (gio));
    var m = Math.floor((thoigianConLai % (gio)) / (phut));
    var s = Math.floor((thoigianConLai % (phut)) / (giay));

   /*Hiển thị kết quả ra các thẻ Div với ID tương ứng*/
    document.getElementById("day").innerText = d;
    document.getElementById("hour").innerText = h;
    document.getElementById("minute").innerText = m;
    document.getElementById("second").innerText = s;
}

/*Thiết Lập hàm sẽ tự động chạy lại sau 1s*/
setInterval(function () {
    newYear();
}, 1000)
