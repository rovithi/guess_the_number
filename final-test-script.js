// Τα ερωτήματα 2 έως 7 θα απαντηθούν στο αρχείο αυτό

const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const root = document.querySelector(":root");

// 2. να ορίσετε τους σχετικούς χειριστές συμβάντων
newGuess.addEventListener("keyup", (e) => {console.log(e.code); if (e.code === "Enter") checkKey();});
checkButton.addEventListener("click", checkKey);
restartButton.addEventListener("click", restart);

let previousGuesses = [];
let theGuess;
let result = "lost";
restartButton.disabled = true;
restartButton.style.visibility = 'hidden';
window.onload = newRandom();
newGuess.focus();

function newRandom(){
/* 3. συνάρτηση που βρίσκει ένα τυχαίο αριθμό μεταξύ 1 και 100
 και τον εκχωρεί στη μεταβλητή theGuess */
 theGuess = Math.floor((Math.random() * 100) + 1);
 console.log(theGuess);
}

function checkKey(e){
/* 4. συνάρτηση που όταν ο χρήστης πατήσει <<enter>>
 να καλεί τη συνάρτηση που αποτελεί τον κεντρικό ελεγκτή του παιχνιδιού.
 */
checkGuess();

}

function checkGuess(){
/* 5. Να ορίσετε συνάρτηση checkGuess η οποία καλείται είτε όταν ο χρήστης πατήσει <<enter>>
στο πεδίο "new-guess" είτε όταν πατήσει το πλήκτρο "check", η οποία είναι ο κεντρικός ελεγκτής,
καλεί τη συνάρτηση processGuess (η οποία αποφαίνεται για την ορθότητα του αριθμού) και κάνει
τις κατάλληλες ενέργειες για να μην μπορεί να εισάγει ο χρήστης νέο αριθμό ή να ανασταλεί η
λειτουργία του <<enter>>, εμφάνιση του πλήκτρου 'restart' και την εξαφάνιση του πλήκτρου 'check'
σε περίπτωση ολοκλήρωσης του παιχνιδιού. */

if (previousGuesses.length != 10 && result!="win"){
    let newvalue = parseInt(newGuess.value);
    result = processGuess(newvalue);
    newGuess.value = "";
    if(result=="win" || previousGuesses.length == 10){
        checkButton.disabled = true;
        checkButton.style.visibility = 'hidden';
        restartButton.disabled = false;
        restartButton.style.visibility = 'visible';
    }

}

   

    

}

function processGuess(newValue){
 /* 6.  Να ορίσετε συνάρτηση processGuess(newValue) η οποία καλείται από τη συνάρτηση checkGuess,
 περιέχει τη λογική του παιχνιδιού, ελέγχει αν η τιμή του χρήστη είναι σωστή, ή αν το παιχνίδι έχει
 τελειώσει χωρίς ο χρήστης να έχει βρει τον αριθμό, και επιστρέφει αντίστοιχα την τιμή "win", ή "lost",
 δημιουργεί και εμφανίζει τα κατάλληλα μηνύματα, αλλάζοντας το χρώμα του στοιχείου μηνυμάτων.
 Όλα τα μηνύματα του προγράμματος εμανίζονται από την processGuess().
 Σε περίπτωση που το παιχνίδι δεν έχει ακόμα τελειώσει, η συνάρτηση μπορεί είτε να μην επιστρέφει κάποια ιδιαίτερη τιμή,
 είτε να επιστρέφει κάποια τιμή της επιλογής σας */


if (!isNaN(newValue)){
    previousGuesses.push(newValue);
    lowHigh.innerHTML = "Προηγούμενες προσπάθειες: " + previousGuesses;
    if (newValue == theGuess){
        result = "win";
    }
    else if(newValue > theGuess){
        message.style.backgroundColor = "var(--msg-wrong-color)";
        message.innerHTML = "Λάθος το ξεπέρασες!";
    }
    else{
        message.style.backgroundColor = "var(--msg-wrong-color)";
        message.innerHTML = "Λάθος είσαι πιο χαμηλά!";
    }
}
else{
    message.innerHTML = "Δώσε Αριθμό!";
}

if (previousGuesses.length == 10 && result!="win"){
    message.innerHTML = "Τέλος παιχνιδιού, έχασες!";
    message.style.backgroundColor = "var(--msg-wrong-color)";
}
else if(result=="win"){
    message.innerHTML = "Μπράβο το βρήκες!";
    message.style.backgroundColor = "var(--msg-win-color)";
}

return result;

}


function restart(){
/* 7. Να ορίσετε συνάρτηση restart η οποία καλείται όταν ο χρήστης πατήσει το πλήκτρο
'restart' και επανεκινεί τη διαδικασία */
    previousGuesses = [];
    lowHigh.innerHTML = "";
    message.innerHTML = "";
    message.style.backgroundColor = "";
    result = "lost";
    restartButton.disabled = true;
    restartButton.style.visibility = 'hidden';
    checkButton.disabled = false;
    checkButton.style.visibility = 'visible';

    newRandom();
}