window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game,1000/15);

}
let px=py=10;
let gs=tc=20;
let ax=ay=15;
let xv=yv=0;
let trail=[];
let tail = 1;
let highScore = 0; // Ty's work



function game() {
    px+=xv;
    py+=yv;
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);

    ctx.fillStyle="lime";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==px && trail[i].y==py) {
            tail = 1;
        }
    }
    trail.push({x:px,y:py});
    while(trail.length>tail) {
    trail.shift();
    }

    if(ax==px && ay==py) {
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
    }
    ctx.fillStyle = 'red';
    //ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2); 
    ctx.beginPath(); //Ty's work
    ctx.arc(ax*gs, ay*gs, 7, 0, 2* Math.PI); //Ty's work
    
    ctx.fill();
    ctx.strokeStyle = 'red';

    score = trail.length-1; //Ty's work
    document.getElementById("score").innerHTML = score; //Ty's work
    
    if(score > parseInt(highScore)){  //Ty's work
       localStorage.setItem('storedHighScore', score);
    } else {
       localStorage.setItem('storedHighScore', highScore);
    }

    highScore = localStorage.getItem("storedHighScore");
    
    document.getElementById("hiScore").innerHTML = highScore; //Ty's work
}
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            xv=-1;yv=0;
            break;
        case 38:
            xv=0;yv=-1;
            break;
        case 39:
            xv=1;yv=0;
            break;
        case 40:
            xv=0;yv=1;
            break;
    }
}
