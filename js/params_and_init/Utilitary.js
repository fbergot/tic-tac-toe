export default class Utilitary {
    /**
     * Randomize an Array
     * @param {Array} array
     * @returns {Array}
     */
    static randomize_array(array) {
        let i, j;
        for (i = 0; i < array.length; i++) {
            j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Make image with path
     * @param {String} path
     * @returns {String} img string for HTML
     */
    static init_img_from_path(path) {
        return `<img width='60px' height='60px'  src=${path} >`;
    }

    /**
     * Verify if case is empty or not
     * @param {String} n_case
     * @param {Array<undefined|string>} gameState
     * @returns {Boolean}
     */
    static verify_previously_play(n_case, gameState) {
        if (gameState[n_case - 1] !== undefined) {
            return false;
        }
        return true;
    }

    /**
     * Generate button
     * @param {String} className class HTML
     * @param {String} message_button message on the button
     * @param {String} id_button
     * @return {String} string of button HTML
     * */
    static generate_button_for_alert_message(className, message_button, id_button) {
        return `<button type='button' class=${className} id=${id_button}>${message_button}</button>`;
    }

    /**
     * Give one EventListener for one element HTML
     * @param {HTMLElement} element
     * @param {Function} callback
     */
    static add_event(element, callback) {
        element.addEventListener("click", callback);
    }
}