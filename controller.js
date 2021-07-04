/**
 * Main controller
 */
var controller = {

	/**
	 * Serves initial page display
	 */
	index : async function(req, res) {
		
		let height = 300;
		let width = 550;

		const GIFEncoder = require('gif-encoder-2')
		const { createCanvas } = require('canvas')
		const { writeFile } = require('fs')
		const path = require('path')

		const canvas = createCanvas(width, height)
		const ctx = canvas.getContext('2d')

		const encoder = new GIFEncoder(width, height)
		
		encoder.start();

		encoder.setDelay(1000);

		let days = 7;
		let hours = 12;
		let mins = 60;
		let seconds = 60;

		for (i=0; i<1000; i++) {
			controller.updateCountdownTimer(ctx, days, hours, mins, seconds--);
  			encoder.addFrame(ctx);
  		}

  		encoder.finish();
		const buffer = encoder.out.getData();
		fs = require('fs');
		fs.writeFileSync('test.gif', buffer );

		res.render("pages/index", { gif : '../test.gif' } );
		
	},


	updateCountdownTimer : function(ctx, days, hours, mins, seconds) {
		ctx.fillStyle = '#ffffff';
  		ctx.fillRect(0, 0, 550, 300);

  		ctx.font = '40px Arial';
	    ctx.fillStyle = "red";
	    ctx.textAlign = 'center';
	    ctx.textBaseline = 'top';
  		ctx.fillText(days, 75, 10);

  		ctx.font = '40px Arial';
  		ctx.fillStyle = "#eee";
	    ctx.textAlign = 'center';
	    ctx.textBaseline = 'top';
  		ctx.fillText('Days', 75, 50);

  		ctx.font = '40px Arial';
  		ctx.fillStyle = "red";
  		ctx.textAlign = 'center';
	    ctx.textBaseline = 'top';
  		ctx.fillText(hours, 200, 10);

 		ctx.font = '40px Arial';
 		ctx.fillStyle = "#eee";
 		ctx.textAlign = 'center';
	    ctx.textBaseline = 'top';
  		ctx.fillText('Hours', 200, 50);

  		ctx.font = '40px Arial';
 		ctx.fillStyle = "red";
 		ctx.textAlign = 'center';
	    ctx.textBaseline = 'top';
  		ctx.fillText(mins, 325, 10);

  		ctx.font = '40px Arial';
 		ctx.fillStyle = "#eee";
 		ctx.textAlign = 'center';
	    ctx.textBaseline = 'top';
  		ctx.fillText('Mins', 325, 50);

  		ctx.font = '40px Arial';
  		ctx.fillStyle = "red";
  		ctx.textAlign = 'center';
	    ctx.textBaseline = 'top';
  		ctx.fillText(seconds, 450, 10);

  		ctx.font = '40px Arial';
 		ctx.fillStyle = "#eee";
 		ctx.textAlign = 'center';
	    ctx.textBaseline = 'top';
  		ctx.fillText('Mins', 450, 50);

  		return ctx;

	}

}

module.exports = controller;