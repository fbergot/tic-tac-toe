// for verif
const verif = [];
const all_inputs_img = document.querySelectorAll("input[class^=input]");
const begin_inputs = document.querySelectorAll('input[class^=play]');

const data_player1 = ["img1" , "img2" , "img3"];
const data_player2 = ["img4", "img5", "img6"];

// press button validate
document.getElementById("but_commit").addEventListener("click", (e) => {
    redirect(e , verif , begin_inputs)
});

(function add_listener(nodeList) {
        nodeList.forEach((element) => {
            element.addEventListener("change", (e) => {
                add_data_in_storage(e.target.value, data_player1, data_player2 , verif);
            });
        });
})(all_inputs_img);

/**
 * Add images players items in localstorage
 * @param {String} value 
 * @param {Array<String>} dataP1 
 * @param {Array<String>} dataP2 
 */
function add_data_in_storage(value, dataP1, dataP2 , verif) {
    
    if (dataP1.indexOf(value) !== -1) {
        verif[0] = true;
        window.localStorage.setItem('player1', value);
        
    } else if (dataP2.indexOf(value) !== -1) {
        verif[1] = true;
        window.localStorage.setItem("player2", value);
    }

}

/**
 * Add player in localStorage for beginning
 * @param {NodeList} inputs 
 */
function analyseBeginInput(inputs) {
    if (inputs[0].checked) {
        window.localStorage.setItem("begin", 'p1');
    } else if (inputs[1].checked) {
        window.localStorage.setItem("begin", "p2");      
    }
}


function redirect(e, verif, inputs) {
    analyseBeginInput(inputs)

    if (verif.length === 2) {
        window.location.assign('game.html');      
    } else {
        alert('tous les joueurs n\'ont pas sélectionnés d\'images');
    }
}