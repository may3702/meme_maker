const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let isPainting = false;
let isFilling = false;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round" //라인의 모양


function onMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(isPainting){
        ctx.lineTo(x, y);
        ctx.stroke();
        return;
    };
    ctx.moveTo(x, y);
};

function startPainting(){
    isPainting = true;
};

function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
};

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
};

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
};

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
};

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "🎨 Fill";
    } else{
        isFilling = true;
        modeBtn.innerText = "✏️ Draw";
    };
};

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH ,CANVAS_HEIGHT);
    };
};

function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "🎨 Fill";
};

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);  //가져온 파일의 URL
    const image = new Image();      // <img src="">
    image.src = url;

     //image가 로드 되었을 때 canvas에 나타내기
    image.onload = function(){
        //ctx.drawImage(나타낼이미지, x, y, width, height)
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
};

function onDoubleClick(event){
    const text = textInput.value;
    //text에 글자가 있으면 실행한다
    if(text !== ""){
        ctx.save();
            ctx.lineWidth = 1;
            ctx.font = "60px gothic";
            //strokeText(작성할 내용, x, y)
            ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    };
    
    //ctx.font="" -> px, font-family를 변경할 수 있다
    //ctx.save() -> 현재 상태, 색상, 스타일 등 모든 것을 저장
    //ctx.restore() -> 수정을 완료하고 원래 설정으로 되돌아감
    //    => save와 restore 사이에 어떠한 수정을 하여도 저장되지 않는다
};

function onSaveClick(){
    //toDataURL() -> 캔버스에 그린 그림을 URL로 변환
    const url = canvas.toDataURL();
    //가짜 링크 a태그 생성
    const a = document.createElement("a");
    //a링크의 href속성을 url로 설정
    a.href = url;
    //다운로드 했을 때 저장할 이름 설정
    a.download = "myDrawing.png";
    //a를 클릭하면 파일 다운로드
    a.click();
};





//click은 마우스로 클릭하고 땐 경우
//mousedown은 마우스로 누르고 움직이는 경우
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);

color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);

destroyBtn.addEventListener("click", onDestroyClick);

eraserBtn.addEventListener("click", onEraserClick);

fileInput.addEventListener("change", onFileChange);

saveBtn.addEventListener("click", onSaveClick);

















/*
////ctx 옵션 설명
//ctx.fillRect(x, y, width, height);     옵션대로 채워진 사각형을 만듦
//ctx.strokeRect(x, y, width, height);   옵션대로 사각형 라인을 만듦 
//ctx.fillStyle = "";       채우기 색상
//ctx.strokeStyle = "";     라인 색상
//ctx.fill();               색 채우기
//ctx.storke();             라인 만들기

//ctx.beginPath();          새로운 경로를 만듦, 이전 경로와 분리
//ctx.moveTo()              선을 긋지 않으면서 브러시를 이동시킴
//ctx.lineTo()              선을 그어줌

//새로운 색을 채워주고 싶다면, 새로운 path가 필요한지 아닌지 생각해서 beginPath(); 를 적용
*/


/*
////집모양 만들기
ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50, 200);
ctx.lineWidth = 2;
ctx.fillRect(300, 300, 50, 100);
ctx.fillRect(200, 200, 200, 20);

ctx.moveTo(200, 200);
ctx.lineTo(325, 100);
ctx.lineTo(450, 200);
ctx.fill();
*/


/*
////사람 만들기
ctx.fillRect(210, 190, 15, 100);
ctx.fillRect(350, 190, 15, 100);
ctx.fillRect(260, 190, 60, 200);

ctx.arc(290, 120, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(270, 110, 8, Math.PI, 2 * Math.PI);
ctx.arc(310, 110, 8, Math.PI, 2 * Math.PI);
ctx.fill();
*/