let playlist = [];
let PlaylistName = "My favorite songs";
let Pseudo = "Styloxis";
let audio = null;
let isPaused = true;
let lastId = -1;
let random = false;

LoadPlaylistInfo();
reloadPlaylist();

var myInterval = setInterval(function () {
    // Mise a jour des element

    document.getElementsByName("m_random")[0].style = random ? "background-color: rgb(10,255,10,0.25)" : "background-color: rgb(0,0,0,0.1)";


    if (lastId != -1 && audio != null) {
        document.getElementById("m_title").textContent = playlist[lastId].title;
        document.getElementById("m_author").textContent = playlist[lastId].artiste;
        document.getElementById("m_cover").src = playlist[lastId].image;

        document.getElementById("m_footer").style = "opacity: 1;";
        document.getElementById("m_main").style = "height: 70vh";

        document.getElementById("m_currenttime").textContent = TimeToString(audio.currentTime);
        document.getElementById("m_musictime").textContent = TimeToString(audio.duration);

        let nbrStr = 40;
        let a = (nbrStr / audio.duration) * audio.currentTime;
        let t = "[";
        for (let i = 0; i < nbrStr; i++){ t = t + (a <= i ? "_" : "#") }
        t += "]";
        document.getElementById("m_pourcenttime").textContent = t;

        document.getElementsByName("item_"+lastId)[0].style = "background-color: rgb(0,255,0,0.2)"

        if (audio.currentTime >= audio.duration * 0.99 && !isPaused) { NextMusic(); }

        let mcp = document.getElementsByName("m_cover_play")
            mcp.forEach(element => {
                element.src = (isPaused ? "Assets/play_arrow.png" : "Assets/pause.png")
                element.style = "background-color: rgb(10,255,10,0.25)"
            });
        

    } else {
        document.getElementById("m_footer").style = "opacity: 0;"
        document.getElementById("m_main").style = "height: 80vh;"
    }

}, 100);


let Elements = document.getElementsByName("_title");
for (let i = 0; i < Elements.length; i++) {
    Elements[i].textContent = PlaylistName;
}


document.getElementById("_info").textContent = Pseudo + " . " + playlist.length + " music";

function TimeToString(t) {
    let minute = Math.floor(t / 60);
    let seconde = Math.floor(t - (minute * 60));
    return minute+":"+ (seconde < 10 ? "0"+seconde:seconde);
}

function reloadPlaylist() {
    let htmlcode = "";

    for (let i = 0; i < playlist.length; i++) {
            htmlcode +=
            '<div id="MusicAssets" onclick="PlayMusic('+i+')" name="item_'+i+'">'+
            '<p id="child_1" >' + i + '</p>'+
            '<div id="child_2" style="display: flex;flex-wrap: wrap;"><img src="' + playlist[i].image + '"><div style="margin-left: 5%;"><p id="child2">' + playlist[i].title + '</p><p id="child2" style="color: rgb(180, 180, 180);font-size: clamp(10px, 1.1vw, 20px);">' + playlist[i].artiste+'</p></div></div>'+
            '<p id="child_3" >' + playlist[i].album + '</p>' +
            '<p id="child_4" >' + playlist[i].Creation + '</p>' +
            '<p id="child_5" style="text-align: center;">' + playlist[i].time + '</p>' +
            '</div>';
    }
    
    document.getElementById("MusicZone").innerHTML = htmlcode;
}


function LoadPlaylistInfo() {
    playlist = [
        { title: "Enemy feat. J.I.D.", artiste: "Imagine Dragons", image: "Assets/MusicCover/Enemy.jpg", album: "Arcane (soundtrack)", Creation: "2021", time: "2.53",music: "Assets/Music/m_enemy.mp3" },
        { title: "Save Me", artiste: "Omri", image: "Assets/MusicCover/Saveme.jpg", album: "-", Creation: "2018", time: "5:35", music: "Assets/Music/m_saveme.mp3" },
        { title: "Love Like Mine", artiste: "Stela Cole", image: "Assets/MusicCover/Lovelikemine.jpg", album: "Woman of the Hour", Creation: "2020", time: "3:08", music: "Assets/Music/m_lovelikemine.mp3" },
        { title: "Lonely", artiste: "Akon", image: "Assets/MusicCover/Lonely.jpg", album: "Trouble", Creation: "2004", time: "3:55", music: "Assets/Music/m_lonely.mp3" },
        { title: "Drown My Feelings", artiste: "The Medic", image: "Assets/MusicCover/Drownmyfeelings.jpg", album: "-", Creation: "2018", time: "2:04", music: "Assets/Music/m_drown.mp3" },
        { title: "Up & Down", artiste: "Nils Van Zandt", image: "Assets/MusicCover/Updown.jpg", album: "-", Creation: "2016", time: "3:18", music: "Assets/Music/m_updown.mp3" },
        { title: "Awake and Alive", artiste: "Skillet", image: "Assets/MusicCover/Awakeandalive.jpg", album: "Awake", Creation: "", time: "3:29", music: "Assets/Music/m_awakeandalive.mp3"},
        { title: "Centuries", artiste: "Fall out Boy", image: "Assets/MusicCover/Centuries.jpg", album: "American Beauty", Creation: "2015", time: "3:48", music: "Assets/Music/m_centuries.mp3"},
        { title: "Courtesy Call", artiste: "Thousand Foot Krutch", image: "Assets/MusicCover/Courtesycall.jpg", album: "The End is Where We Begin", Creation: "2012", time: "3:56", music: "Assets/Music/m_courtesycall.mp3"},
        { title: "Numb", artiste: "Linkin Park", image: "Assets/MusicCover/Numb.jpg", album: "Meteora", Creation: "2003", time: "3:07", music: "Assets/Music/m_numb.mp3" },
        { title: "In the End", artiste: "Linkin Park", image: "Assets/MusicCover/Intheend.jpg", album: "Hybrid Theory", Creation: "2000", time: "3:36", music: "Assets/Music/m_intheend.mp3" },
        { title: "Sainted by the Storm", artiste: "Powerwolf", image: "Assets/MusicCover/Saintedbythestorm.jpg", album: "-", Creation: "2022", time: "3:44", music: "Assets/Music/m_saintedbythestorm.mp3" },
        { title: "Alien", artiste: "Die Antwoord", image: "Assets/MusicCover/Alien.jpg", album: "-", Creation: "2016", time: "4:16", music: "Assets/Music/m_alien.mp3" },
        { title: "12", artiste: "MORGENSHTERN", image: "Assets/MusicCover/12.jpg", album: "-", Creation: "2022", time: "3:00", music: "Assets/Music/m_12.mp3" },
        { title: "bad thoughts", artiste: "bbno$", image: "Assets/MusicCover/Badthoughts.jpg", album: "i don't care at all", Creation: "2019", time: "2:32", music: "Assets/Music/m_badthoughts.mp3" },
        { title: "Anunnaki", artiste: "Vald", image: "Assets/MusicCover/Anunnaki.jpg", album: "V", Creation: "2022", time: "3:22", music: "Assets/Music/m_anunnaki.mp3" },
    ]
}

function PlayMusic(id) {

    if (id === -1 && lastId !== -1) {
        id = lastId;
    } else {
        id = id <= 0 ? 0 : id;
    }

    if (audio === null || lastId != id) {
        
        if (!isPaused) { audio.pause(); }
        audio = new Audio(playlist[id].music);
        audio.play();
        isPaused = false;
        lastId = id;

        reloadPlaylist();
    }
    else {
        if (!isPaused) {
            audio.pause();
            isPaused = true;
        } else {
            audio.play();
            isPaused = false;
        }
    }
}

function NextMusic() {
    PlayMusic(random ? Math.floor(Math.random() * (playlist.length - 0.01)) : lastId + 1 < playlist.length ? lastId + 1 : playlist.length - 1);
}
function PrevMusic() {
    PlayMusic(lastId - 1 > -1 ? lastId-1 : 0);
}

function RandomMusic(){
    random = !random;
}