	const canvas = document.getElementById("compos");
	
	const width = 400;
	const height = 300;
	canvas.width = width;
	canvas.height = height;

	const context = canvas.getContext("2d");

	function drawStar(x, y, radius, points = 5, stride = 2) {
		const angleChange = Math.PI * 2 / points;

		context.beginPath();
		context.moveTo(x, y - radius);
		for (let i = 1; i < points; i++) {
			let angle = stride * i * angleChange;
			context.lineTo(
				x + Math.sin(angle) * radius,
				y - Math.cos(angle) * radius,
			);
		}
		context.closePath();
		context.fill();
	}

	function drawPetals(x, y, radius) {

		const angleChange = Math.PI * 2 / 5;

		for (let i = 0; i < 5; i++) {
			let angle = i * angleChange;

			context.beginPath();
			context.ellipse(
				x + Math.sin(angle) * radius / 3,
				y - Math.cos(angle) * radius / 3,
				radius / 3,
				radius * 2 / 3,
				angle,
				Math.PI * 2,
				0,
			);
			context.fill();
		}
	}

	function drawReceptacle(x, y, radius) {
		const angleChange = Math.PI * 2 / 7;

		const radiusCoefficients = [
			5 / 6,
			4 / 5,
			1,
			6 / 7,
			3 / 4,
			5 / 6,
			3 / 4,
		];

		for (let i = 0; i < 7; i++) {
			let angle = i * angleChange;

			let r = radius * radiusCoefficients[i] / 4;

			let end_x = x + Math.sin(angle) * r;
			let end_y = y - Math.cos(angle) * r;

			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(end_x, end_y)
			context.stroke();

			context.beginPath();
			context.ellipse(
				end_x,
				end_y,
				radius / 20,
				radius / 20,
				0,
				Math.PI * 2,
				0,
			);
			context.fill();
		}
	}

	function drawFlower(x, y, radius) {
		context.fillStyle = "#8b00ff";
		drawPetals(x, y, radius);

		context.strokeStyle = "#FFFFFF";
		context.fillStyle = "#FFFFFF";
		drawReceptacle(x, y, radius);
	}
	
	context.translate(width / 2, height / 2);

	const transparencyBoost = 2;
	const transparencyFalloff = 6;

	for (let i = 0; i < 20; i++) {
		context.globalAlpha =  Math.log(i + transparencyBoost) / Math.log(transparencyFalloff);
		context.fillStyle = "#2b003d";
		drawStar(-width / 3, 0, Math.min(width, height) / 5);
		drawFlower(width / 3, 0, Math.min(width, height) / 5);
		
		context.rotate(Math.PI / 4);
		context.scale(-4 / 5, -4 / 5);
	}