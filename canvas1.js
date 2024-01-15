const canvas = document.getElementById("drawing");
	
const width = 200;
const height = 350;
canvas.width = width;
canvas.height = height;

const context = canvas.getContext("2d");

const translateFactor = 8;
const rotationFactor = 1 / 64;

function drawFloatingCard(delta) {
    context.reset();
    const y = translateFactor * Math.sin(delta / 500);
    const rotation = Math.PI * rotationFactor * Math.sin(delta / 1000);
    context.translate(width / 2, height / 2 + y);
    context.rotate(rotation);
    drawCard();
    requestAnimationFrame(drawFloatingCard);
}
requestAnimationFrame(drawFloatingCard);

function drawCard() {
    // card back

    context.lineWidth = 5;
    context.strokeStyle = "#FF4444";
    context.fillStyle = "#FFEEAA";

    const border = 20;

    context.beginPath();
    context.rect(border - width / 2, border - height / 2, width - border * 2, height - border * 2);
    context.fill();
    context.stroke();

    const objectSize = (width - border) * 5 / 8;

    // yin yang
    {
        context.lineWidth = 5;
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = "#AA77EE";
        const radius = objectSize / 2;
        const cx = 0;
        const cy = height / 2 - width / 2;

        const halfPI = Math.PI / 2;

        // back circle
        context.beginPath();
        context.ellipse(cx, cy, radius, radius, 0, Math.PI * 2, 0);
        context.fill();
        context.stroke();

        // center waves

        // note on arcs: angle seems to start offset by 90 degrees,
        // which is why this is from -halfPI to +halfPI going down
        // (and vice-versa going up)

        context.fillStyle = "#AA77EE";
        context.beginPath();
        context.moveTo(cx, cy - radius);
        // inside c
        context.arc(cx, cy - radius / 2, radius / 2, -halfPI, halfPI, true);
        // inside ͻ
        context.arc(cx, cy + radius / 2, radius / 2, -halfPI, halfPI, false);
        // outside )
        context.arc(cx, cy, radius, halfPI, -halfPI, true);
        context.fill();

        // dots

        const smallRadius = radius / 5;
        context.fillStyle = "#FFFFFF";
        context.beginPath();
        context.ellipse(cx, cy - radius / 2, smallRadius, smallRadius, 0, Math.PI * 2, 0);
        context.fill();
        
        
        context.fillStyle = "#AA77EE";
        context.beginPath();
        context.ellipse(cx, cy + radius / 2, smallRadius, smallRadius, 0, Math.PI * 2, 0);
        context.fill();
    }

    // "Death" Kanji: 死

    function drawDeath(color, thickness) {
        context.strokeStyle = color;
        context.lineCap = "square";
        context.lineWidth = thickness * 2;

        const cx = 0;
        const cy = width / 2 - height / 2;

        //const strokeWidth = 10;
        const cWidth = objectSize * 4 / 5;
        const cHeight = objectSize * 4 / 5;

        const rightStemX = cx + cWidth / 8;
        
        // top stroke
        context.beginPath();
        context.moveTo(cx - cWidth / 2, cy - cHeight / 2);
        context.lineTo(cx + cWidth / 2, cy - cHeight / 2);
        context.stroke();
        
        // right stem
        context.beginPath();
        context.moveTo(cx + cWidth / 8, cy - cHeight / 2);
        context.lineTo(cx + cWidth / 8, cy + cHeight / 2);
        context.lineTo(cx + cWidth / 2, cy + cHeight / 2);
        context.lineTo(cx + cWidth / 2, cy + cHeight / 3);
        context.stroke();
        
        // right stem middle stem
        context.beginPath();
        context.moveTo(cx + cWidth / 8, cy);
        context.lineTo(cx + cWidth / 2, cy - cHeight / 8);
        context.stroke();

        // left stem
        context.beginPath();
        context.moveTo(cx - cWidth / 8, cy - cHeight / 2);
        context.lineTo(cx - cWidth / 1.5, cy - cHeight / 12);
        context.stroke();

        // left lower stem
        context.beginPath();
        context.moveTo(cx - cWidth / 8, cy - cHeight / 8);
        context.lineTo(cx - cWidth / 2, cy + cHeight / 2);
        context.stroke();

        // left stems upper joiner
        context.beginPath();
        context.moveTo(cx - cWidth / 4, cy - cHeight / 4);
        context.lineTo(cx - cWidth / 8, cy - cHeight / 8);
        context.stroke();

        // left stems lower joiner
        context.beginPath();
        context.moveTo(cx - cWidth / 2, cy - cHeight / 8);
        context.lineTo(cx - cWidth / 4, cy + cHeight / 8);
        context.stroke();
    }
    drawDeath("#AA2222", 10);
    drawDeath("#FF4444", 5);
}