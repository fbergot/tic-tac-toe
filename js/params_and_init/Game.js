/**
 * init core for the game : (game state and all parameters for game);
 * 
 *  ----------------------------------------------------Crée par florian Bergot----------------------------------------------------------------
 */
export default class Game {
    /**
     * Create an instance of Game
     * @constructor
     * @param {Array<String>} array_path_img
     * @param {Canvas} canvas_instance instance of Canvas injection Class
     * @param {String} startPlayer string for starting player
     * @param {Utilitary} instance of Utilitary injection Class
     */
    constructor(array_path_img, canvas_instance , startPlayer , utilitary) {
        this.paths = array_path_img;
        this.canvas = canvas_instance;
        this.startPlayer = startPlayer;
        this.utilitary = utilitary;
        this.img_and_data = null;
        this.$ = (tag) => document.querySelector(tag);
        this.current_player = startPlayer;
        this.no_winner_message = ["C'est une partie nulle !", "Personne ne gagne !", "Ni l'un ni l'autre ne se démarque !", "Pas de gagnant !"];
        this.ctx = this.canvas.ctx;
        this.winner = undefined;
        /** GLOBAL GAME STATE */
        this.game_state = new Array(9);
        this.winnerPosition = [
                                [1, 2, 3],
                                [4, 5, 6],
                                [7, 8, 9],
                                [1, 4, 7],
                                [2, 5, 8],
                                [3, 6, 9],
                                [1, 5, 9],
                                [3, 5, 7]
        ];
        // auto play if startPlayer is "o" : (p1) in localStorage
        if (this.startPlayer === "o") {
            this.ia();
        }
    }

    /**
     * Find the case according to the coords of click in canvas
     * @param {Event} e
     * @param {Object} range
     */
    analyze_click_position(e, range) {

        // loop on all data for deduce what case is clicked from range (data)
        for (let rang in range) {
            if (
                e.offsetX >= range[rang].x[0] &&
                e.offsetX <= range[rang].x[1] &&
                e.offsetY >= range[rang].y[0] &&
                e.offsetY <= range[rang].y[1]
            ) {
                // verify if case is empty
                if (this.utilitary.verify_previously_play(rang , this.game_state)) {
                    // insert image and toogle player
                    this.insert_img_according_to_player(
                        range[rang],
                        (this.current_player = this.toogle_player(this.current_player)),
                        this.paths[0],
                        this.paths[1]
                    );
                    // update this.game_state array
                    this.game_state_change(rang, this.game_state, this.current_player); //update the game state
                    if (this.current_player !== this.toogle_player(this.current_player)) {
                        this.ia();
                    }
                    break;
                    // display message if case is not empty
                } else {
                    this.alert_message(["Vous ne pouvez pas jouer cette case !" , "alert"], ["replay_button" , "ok" , "okay"]);
                    break;
                }
            }
        }
    }

    /**
     * Send all good params for display images players
     * @param {Object} data
     * @param {String} current_player
     * @param {String} path1
     * @param {String} path2
     */
    insert_img_according_to_player(data, current_player, path1, path2) {
        const [x, y] = [data.x, data.y];
        if (current_player === "x") {
            this.display_img(path1, x, y, this.ctx);
        } else {
            this.display_img(path2, x, y, this.ctx);
        }
    }

    /**
     * Toogle current player
     * @param {String} player_current (this.player_current)
     * @return {String} !player_current
     */
    toogle_player(player_current) {
        if (this.winner === undefined) {
            return player_current === "x" ? "o" : "x";
        } else {
            return player_current;
        }
    }

    /**
     * Display image according to player
     * @param {String} path path for image
     * @param {Array<Number>} coordX 
     * @param {Array<Number>} coordY
     * @param {CanvasRenderingContext2D} ctx
     */
    display_img(path, coordX, coordY, ctx) {
        const img = new Image();
        img.addEventListener("load", function (e) {
            ctx.drawImage(
                img,
                coordX[0] + 1,
                coordY[0] + 1,
                coordX[1] - coordX[0] - 2,
                coordY[1] - coordY[0] - 2
            );
        });
        img.src = path;
    }

    /**
     * Insert a data in array game_state
     * @param {Number} number_case
     * @param {Array} array
     * @param {String} player
     */
    game_state_change(number_case, array, player) {
        array.splice(number_case - 1, 1, player);
        if (this.analyse_state(this.game_state)[0]) {
            this.winner = true;
            if (this.current_player === "x") {
                this.img_and_data = {
                    img: this.utilitary.init_img_from_path(this.paths[0]),
                    player: this.current_player === "x" ? 'Player 1' : 'Player 2'
                };               
            } else {
                this.img_and_data = {
                    img: this.utilitary.init_img_from_path(this.paths[1]),
                    player : this.current_player === "x" ? 'Player 1' : 'Player 2'
                };
            }
            /**prettier-ignore */
            this.alert_message([`C'est ${this.img_and_data.img} qui a gagné ! (${this.img_and_data.player})`, 'alert'], ["replay_button", "Rejouer", "replay"]);
        } 
    }

    /**
     * Analyse gameState for understand if winner-position and attribute digital values
     * @param {Array} array
     * @return {Array<Boolean & Number>}
     */
    analyse_state(array) {
        let i;
        for (i = 0; i < this.winnerPosition.length; i++) {
            if (
                array[this.winnerPosition[i][0] - 1] === "x" &&
                array[this.winnerPosition[i][1] - 1] === "x" &&
                array[this.winnerPosition[i][2] - 1] === "x"
            ) {
                return [true, 10];
            } else if (
                array[this.winnerPosition[i][0] - 1] === "o" &&
                array[this.winnerPosition[i][1] - 1] === "o" &&
                array[this.winnerPosition[i][2] - 1] === "o"
            ) {
                return [true, 0];
            }
        }
        return [false, -10];
    }

  /**
   * Display message and button
   * @param {Array<String>} arrayParamForDiv_content message and class for the div in the div_content
   * @param {Array<String>} arrayParamForButton params for create the button with good classname , button-message and id
   */
  
    alert_message(arrayParamForDiv_content, arrayParamForButton) {
        if (this.$('.alert_content') === null) {
            const parent = this.$("#body");
            const div_content = document.createElement("div");
            div_content.classList.add("alert_content");
            // prettier-ignore
            div_content.innerHTML = `<div class=${arrayParamForDiv_content[1]}>${arrayParamForDiv_content[0]}</div>
                ${this.utilitary.generate_button_for_alert_message(arrayParamForButton[0], arrayParamForButton[1], arrayParamForButton[2])}`;
            parent.appendChild(div_content);
            // listener for button #okay :
            if (this.$("#okay") !== null) {
                this.utilitary.add_event(this.$("#okay"), () => void parent.removeChild(div_content));
            }
            if (this.$("#replay") !== null) {
                this.utilitary.add_event(this.$("#replay"), () => {
                    window.location.reload();
                });
            }
      }
    }

  /**
   * Function analyze and play for the machine (ia) and display random no_winner_message[] if need
   */
    ia() {
        //   copy gameState
        const copy_game_state = this.game_state.slice();
        const positions = [];
        // changer ce comportement pour chnger qui commence
        let curPlay = this.startPlayer;

        /**
         * Recursive function for analyse positions (player 1 - player 2) 
         * @param {Number} step
         */
        const loop = (step) => {
            let obj;
            let i;
            for (i = 0; i < copy_game_state.length; i++) {
                if (copy_game_state[i] == undefined) {
                    copy_game_state[i] = curPlay;
                    obj = {
                        case: i + 1,
                        data: this.analyse_state(copy_game_state)[1]
                    };
                    positions.push(obj);
                    copy_game_state[i] = undefined;
                }
            }
            curPlay = this.toogle_player(this.startPlayer);
            if (step < 2) {
                loop(step + 1);
            }
        };
        loop(1);
        if (positions.length > 0) {
            this.display_ia(positions);
        } else {
             /**prettier-ignore */
            this.alert_message([`${this.no_winner_message[Math.floor(Math.random() * this.no_winner_message.length)]}`, 'alert'],
                               ["replay_button", "Refaire une partie", "replay"]);
        }
    }
    
  /**
   * Choice one case according to best value in (-10 , 0 , 10)
   * @param {Array<object>} array_positions
   */
    display_ia(array_positions) {
        this.utilitary.randomize_array(array_positions);
        let max = -10, play;

        for (let value of array_positions) {
            if (value.data >= max) {
                    max = value.data;
                    play = value;
            }
        }

        const obj_coord = this.canvas.range[play.case];
        // call the function for display , toogle and update the game_state
        if (this.winner === undefined) {
            /** prettier-ignore*/
            this.insert_img_according_to_player(obj_coord, (this.current_player = this.toogle_player(this.current_player)), this.paths[0], this.paths[1]);
            this.game_state_change(play.case, this.game_state, this.current_player);           
        }
        // if null position :
        if (array_positions.length === 2) {          
                /**prettier-ignore */
            this.alert_message([`${this.no_winner_message[Math.floor(Math.random() * this.no_winner_message.length)]}`, 'alert'],
                               ["replay_button", "Refaire une partie", "replay"]);
        }
    }
}