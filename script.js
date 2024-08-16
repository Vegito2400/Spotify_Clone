async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    
    let div = document.createElement("div");
    div.innerHTML = response;
    let sng = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < sng.length; index++) {
        const element = sng[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs;
}
getSongs();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

let play = document.getElementById("pause");
let currentSong = new Audio();
let bgnd = document.getElementById("bgnd");
let hambmenu= document.getElementById('hamburger');
let tempmenu = document.getElementById('hambgr');

const playmusic = (track)=>{
    currentSong.src = "/Songs/"+ track;
    currentSong.play();
    play.src="SVGs/pause.svg";
    document.querySelector(".songinfo").innerHTML = decodeURI(track);

}

async function main() {
    
    let songs = await getSongs();

    let songList = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for(const song of songs){
        songList.innerHTML = songList.innerHTML + `<li><div class="lside flex"><img class="invert" width="34" src="SVGs/music.svg" alt="">
                            <div class="info">
                                <div hidden> ${song.replaceAll("%20", " ")}</div>
                                <div> ${song.replaceAll("%20", " ").replace(".mp3"," ")}</div>
                                <div class="artist">Spotify</div>
                            </div>
                            </div>
                            <div class="playnow">
                                <img class="invert" src="SVGs/play.svg" alt="">
                            </div> </li>`;
    }
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })
    let songlist = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for(const song of songs){
        songlist.innerHTML = songlist.innerHTML + `<li><div class="lfside flex"><img class="invert" width="34" src="SVGs/music.svg" alt="">
                            <div class="info">
                                <div hidden> ${song.replaceAll("%20", " ")}</div>
                                <div> ${song.replaceAll("%20", " ").replace(".mp3"," ")}</div>
                                <div class="artist">Spotify</div>
                            </div>
                            </div>
                            <div class="playnow">
                                <img class="invert" src="SVGs/play.svg" alt="">
                            </div> </li>`;
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "SVGs/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "SVGs/play.svg"
        }
    })

    currentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".songduration").innerHTML= `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
    })
    document.querySelector(".seektrack").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })


    hambmenu.addEventListener("click", ()=>{

        tempmenu.classList.toggle("leftmenuoff");
        tempmenu.classList.toggle("leftmenuon");
    });

    bgnd.addEventListener("click", ()=>{
        tempmenu.classList.toggle("leftmenuoff");
        tempmenu.classList.toggle("leftmenuon");
    })

}

main();
