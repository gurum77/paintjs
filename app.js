const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
canvas.width = 900;
canvas.height = 500;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

ctx.fillRect(50, 20, 100, 100);
let painting = false;
let filling = false;


function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function handleChangeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;

}

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;
}

function handleModeClick(event) {
    filling = !filling;
    mode.innerText = filling ? "Fill" : "Paint";

}

function handleCanvasClick(event) {
    if (filling)
        ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleCM(event) {
    event.preventDefault();
}

function handleSave(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "a.png";
    link.click();
}
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if (colors) {
    Array.from(colors).forEach(color => color.addEventListener("click", handleChangeColor));
}



if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSave);
}