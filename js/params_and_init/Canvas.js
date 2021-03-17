
/**
 * Create Canvas and init all goods params
 */
export default class Canvas {
	/**
	 *Creates an instance of Canvas.
	 * @param {String} id
	 * @constructor
	 */
	constructor(id_canvas) {
		// init canvas and context 2d
		this.canvas = document.getElementById(id_canvas);
		this.ctx = this.canvas.getContext('2d');

		this.canvas.width = innerHeight * 0.6;
		this.canvas.height = innerHeight * 0.6;
		this.width_canvas = this.canvas.width;
		this.height_canvas = this.canvas.height;
		this.step_w = this.width_canvas / 3;
		this.step_h = this.height_canvas / 3;
		// for make the grid and know the part clicked in canvas (1-9)
		this.range = {
						1: {
							x: [0, 1 * this.step_w],
							y: [0, 1 * this.step_h]
						},
						2: {
							x: [1 * this.step_w, 2 * this.step_w],
							y: [0, 1 * this.step_h]
						},
						3: {
							x: [2 * this.step_w, 3 * this.step_w],
							y: [0, 1 * this.step_h]
						},
						4: {
							x: [0, 1 * this.step_w],
							y: [1 * this.step_h, 2 * this.step_h]
						},
						5: {
							x: [1 * this.step_w, 2 * this.step_w],
							y: [1 * this.step_h, 2 * this.step_h]
						},
						6: {
							x: [2 * this.step_w, 3 * this.step_w],
							y: [1 * this.step_h, 2 * this.step_h]
						},
						7: {
							x: [0, 1 * this.step_w],
							y: [2 * this.step_h, 3 * this.step_h]
						},
						8: {
							x: [1 * this.step_w, 2 * this.step_w],
							y: [2 * this.step_h, 3 * this.step_h]
						},
						9: {
							x: [2 * this.step_w, 3 * this.step_w],
							y: [2 * this.step_h, 3 * this.step_h]
						}
		};		
	}
	/**
	 * Make the grid of game
	 */
	make_grid() {
		  this.ctx.beginPath();
		// grid in X
		for (let i = 0; i < 2; i++) {
			this.ctx.moveTo(this.step_w, 0);
			this.ctx.lineTo(this.step_w, this.height_canvas);
			this.step_w += this.step_w;
		}
		// grid in Y
		for (let i = 0; i < 2; i++) {
			this.ctx.moveTo(0, this.step_h);
			this.ctx.lineTo(this.width_canvas, this.step_h);
			this.step_h += this.step_h;
		}
		this.ctx.stroke();
	};
}


