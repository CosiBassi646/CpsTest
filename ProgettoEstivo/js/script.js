// dichiarazione degli elementi
let parti = document.getElementById("start");
let tempo = document.getElementById("tempo");
let secondiPassati = 0;
let interval = null;
let riprova = document.getElementById("riparti");
var clicks = 0;
let punteggio = document.getElementById("punteggio");
let area = document.getElementById("area");
let record = document.getElementById("record");
let highScore = 0;

// Funzione per caricare il record dal localStorage all'inizio
function caricaRecord() {
    const recordSalvato = localStorage.getItem("record");
    if (recordSalvato) {
        highScore = parseFloat(recordSalvato);
        record.innerHTML = highScore;
    }
}

// Funzioni
function mostraTempo(){
    const minuti = Math.floor(secondiPassati / 60);
    const secondi = secondiPassati % 60; // per far resettare i secondi quando arrivano a 60
    tempo.innerHTML = minuti + ":" + secondi;
}

function resetTempo(){
    clearInterval(interval);
    interval = null;
    secondiPassati = 0;
    clicks = 0;  // Reset del numero di click
    mostraTempo();
    punteggio.innerHTML = "---";
    parti.onclick = StartTempo;  // Riabilita il click per il pulsante "Start"
    parti.disabled = false;  // Riabilita il pulsante "Start"
}

function timer(){
    if(secondiPassati < 3){
        secondiPassati++;
    }
    mostraTempo();
    if (secondiPassati >= 3) {
        clearInterval(interval); // Ferma il timer
        parti.onclick = null;    // Disattiva i click
        calcolaCps();  // Calcola e mostra il CPS al termine del timer
        setRecord();
        //esito dei test
        if(calcolaCps() < 1){
            Swal.fire("SweetAlert2 is working!");
        }else{
            if(calcolaCps() <= 5 && calcolaCps() >= 1){
                Swal.fire({
                    title: "Not bad!",
                    text: "but you can do better",
                    imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Fthumbs-up-meme-discover-more-interesting-face-finger-hand-ok-memes-httpswwwidlememecomthumbsupmeme7--974044225630196945%2F&psig=AOvVaw0wAG0pWATJ_lRg5XYS9j6A&ust=1726138058794000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDDiMDbuogDFQAAAAAdAAAAABAE',
                  });
            }
        }
        parti.disabled = false;   // Riabilita il pulsante "Start" alla fine del timer
    }
 
}

function StartTempo(){
    resetTempo();
    clicks = 0;  // Reset del numero di click ogni volta che si inizia
    punteggio.innerHTML = "---";
    interval = setInterval(timer, 1000);
    parti.disabled = true;
    parti.onclick = aumentaClick;  // Assegna la funzione di aumento dei click al pulsante
}

function aumentaClick(){
    if(secondiPassati < 3){
        clicks++;          
    }
}

function calcolaCps(){
    const score = clicks / 3;
    console.log(clicks);
    punteggio.innerHTML = score;
    return score;
}

function setRecord(){
    const currentScore = calcolaCps();
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem("record", highScore); 
        record.innerHTML = highScore;   
    }
}



// gestione degli eventi
parti.addEventListener("click", StartTempo);
area.addEventListener("click", aumentaClick);
riprova.onclick = resetTempo;
Document.addEventListener("DOMContentLoaded", caricaRecord());