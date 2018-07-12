//GETING CONTEXT FOR THE CANVASES
var maingamecanvas = document.getElementById("maingame");
var context = maingamecanvas.getContext("2d");
var playercanvas = document.getElementById("playercanvas");
var playercontext = playercanvas.getContext("2d");

//SETTING ROOMS
var jacksroom = "";
var mainlobby = "";
var spareroom = "";

function createjacksroom(){
jacksroom = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,"x","x","x",1,1,1,1,1,1],
];
}
createjacksroom();

function createmainlobby(){
mainlobby = [
[1,1,"y","y","y","y","y","y","y","y","y","y",1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
["z",0,0,0,0,0,0,0,0,0,0,0,0,"w"],
["z",0,0,0,0,0,0,0,0,0,0,0,0,"w"],
["z",0,0,0,0,0,0,0,0,0,0,0,0,"w"],
["z",0,0,0,0,0,1,1,0,0,0,0,0,"w"],
["z",0,0,0,0,0,1,1,0,0,0,0,0,"w"],
["z",0,0,0,0,0,0,0,0,0,0,0,0,"w"],
["z",0,0,0,0,0,0,0,0,0,0,0,0,"w"],
["z",0,0,0,0,0,0,0,0,0,0,0,0,"w"],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,"x","x","x","x","x","x","x","x","x","x",1,1],
];}
createmainlobby();

function createspareroom(){
spareroom = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,1,0,0,0,0,0,0,0,0,1,0,1],
[1,0,1,0,1,1,1,1,1,1,0,1,0,1],
[1,0,1,0,0,0,0,0,0,0,0,1,0,1],
[1,0,1,0,0,0,1,1,0,0,0,1,0,1],
[1,0,1,0,0,0,1,1,0,0,0,1,0,1],
[1,0,1,0,0,0,0,0,0,0,0,1,0,1],
[1,0,1,0,1,1,1,1,1,1,0,1,0,1],
[1,0,1,0,0,0,0,0,0,0,0,1,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];	
}
createspareroom();

//ROOM TRANSITIONS TO GO TO 
// 0 = X DOWN; 1 = Y UP; 2 = Z LEFT; 3 = W RIGHT;
spareroomtransarray = [false,false,false,false]
jacksroomtransarray = ["mainlobby", false,false,false];

mainlobbytransarray = ["jacksroom","spareroom","spareroom","spareroom"];

//Reset Map Array evertime enter the room
function resetmap(mapname){
	switch(mapname){
		case jacksroom:
		createjacksroom();
		break;
		case mainlobby:
		createmainlobby();
		break;
		case spareroom:
		createspareroom();
	default:;
	}
}

//Setting var shows what is the current setting
var settingmap = " ";
var totranarrayname = "";

//To make a room checks what room to make then sets up the varibales to make it
function makearoomfunc(makemapname){
switch(makemapname){
	case "jacksroom":
	var damap = jacksroom;
	var datransname = jacksroomtransarray;
	break;
	case "mainlobby":
	var damap = mainlobby;
	var datransname = mainlobbytransarray;
	break;
	case "spareroom":
	var damap = spareroom;
	var datransname = spareroomtransarray;
	break;
	default: alert("Error In Drawing Room");
}
settingmap = damap;
totranarrayname = datransname;
resetmap(settingmap);
mapdraw(settingmap);
}


// WHEN DONE NO NEED TO EDIT BELLOW

function newtile(daX,daY,daWalk,daTrans, daSetting){
	this.xpos = daX;
	this.ypos = daY;
	this.walkable = daWalk;
	this.iftransis = daTrans;
	this.transisetting = daSetting;
	this.fillup = function(){
		context.fillRect(this.xpos,this.ypos,50,50);
	}
};

//FUNCTION TO DRAW THE MAP
var tempsetting = "None";
function mapdraw(mapname){
var n = 0; var i =0; var o = 0;
for (i =0; i < mapname.length ; i++){
var mapline = mapname[i];
	for (o = 0; o < mapline.length; o++) { 
		var completeo = mapline.length-1;
			if (mapline[o] == 1){
			context.fillStyle="black";
			var tempwalk = false;
			var temptrans = false;
			}
			else if (mapline[o] === "x" || mapline[o] === "y" || mapline[o] === "z" || mapline[o] === "w") {
			var tempwalk = true;	
			var temptrans = true;
			context.fillStyle="green";
			settranssetting(totranarrayname,mapname[i][o]);
			}
			else{
			context.fillStyle="green";	
			var tempwalk = true;
			var temptrans = false;
			}
			var tempxpos = 200+(o*50);
			var tempypos = 0+(n*50);
		mapname[i][o] = new newtile(tempxpos,tempypos,tempwalk,temptrans,tempsetting);
		context.fillRect(tempxpos,tempypos,50,50);
		if (o < completeo){	
		}
		else if (o === completeo){
		n++;
		}
	}	
}
};


//FUNCTION TO SET TILES WITH TRANSITION to new room VARIABLE
function settranssetting(transarrayname,vari){
		var transiX = transarrayname[0];
		var transiY = transarrayname[1];
		var transiZ = transarrayname[2];
		var transiW = transarrayname[3];
switch (vari){
	case "x":
	tempsetting = transiX;
	break;
	case "y":
	tempsetting = transiY;
	break;
	case "z":
	tempsetting = transiZ;
	break;
	case "w":
	tempsetting = transiW;
	break;
	default:
	alert("Error In Setting Tranistion Setting");}
}


//START GAME
makearoomfunc("mainlobby");





//PLAYER STATS CONTAINER
context.fillStyle="black";
context.strokeRect(0,0,200,400);
//DIRECTIONAL PAD HOLDER
context.fillRect(0,400,200,200);
//DIRRECTIONAL PAD
context.fillStyle="white";
var DPup = context.fillRect(75,425,50,50);
var DPleft = context.fillRect(25,470,50,50);
var DPright = context.fillRect(125,470,50,50);
var DPdown = context.fillRect(75,515,50,50);


//PLAYER DRAWN ON THE SECOND CANVAS
var ppice = {
	xpos: 0,
	ypos: 0,
};

//MAP LOCATION, BY TILES
var gox = 6;
var goy = 10;
var newgox = 0;
var newgoy = 0;

//CHECK IF ABLE TO MOVE ON NEW TILE
function mapmovecheck(mapname){
	var mapname = mapname;
	if (mapname[newgoy][newgox].walkable) {
		//They may move
		goy =newgoy;
		gox =newgox;
		ppice.ypos=mapname[goy][gox].ypos;
		ppice.xpos=mapname[goy][gox].xpos;
	}
	else{
		//They do not move
	}
}

//CHECK IF TRANSITION TO NEW AREA IF GO ON NEW TILE
function maptransicheck(mapname){
	var mapname = mapname;
	if (mapname[newgoy][newgox].iftransis){
		var togoto = mapname[newgoy][newgox].transisetting;
		makearoomfunc(togoto);
	}
	else {

	}
}

//SET THE POSITION OF THE PLAYER PEICE BASED ON TILE MAP
ppice.xpos=settingmap[goy][gox].xpos;
ppice.ypos=settingmap[goy][gox].ypos;

//DRAW THE PLAYER ON THE CANVAS
playercontext.fillStyle="red";
playercontext.fillRect(ppice.xpos,ppice.ypos,50,50);

//Code to move player according to direction by tile
function moveplayerup(){
     if (goy === 0) {}
     else{
        newgoy = goy-1;
       	newgox = gox;
       	mapmovecheck(settingmap);
       	maptransicheck(settingmap);
   		}
 }
        function moveplayerleft(){
        	if (gox === 0) {}
        	else{
        	newgox = gox-1;
        	newgoy = goy;
        	mapmovecheck(settingmap);
        	maptransicheck(settingmap);
        	}
        }
 

//CODE TO MOVE PEICE ACCORDING TO KEY PRESS
window.addEventListener('keydown',this.check,false);

function check(e) {
    var code = e.keyCode;
    switch (code) {
        case 38:
    	moveplayerup();
        break;
        case 37: 
        moveplayerleft();
        break;
        case 39:
        //Right
        	if (gox === 13) {}
        	else{
        	newgox = gox+1;
        	newgoy = goy;
        	mapmovecheck(settingmap);
        	maptransicheck(settingmap);
        	}
         break;
        case 40:
        //Down
        	if (goy === 11) {}
        	else{
        	newgox = gox;
        	newgoy = goy+1;
        	mapmovecheck(settingmap);
        	maptransicheck(settingmap);
        	}
          break;
        default: ; //Everything else
    }
}


window.setInterval(function(){
	playercontext.clearRect(200,0,700,600);
	playercontext.fillStyle="red";
    playercontext.fillRect(ppice.xpos,ppice.ypos,50,50);
	}, 60);





function testthis(){
alert("Use your keyboard's arrow keys to move");
}

playercanvas.addEventListener("mousedown", testthis, true);










//TIME FUNCTIONS
var time = {
seconds : 30,
hour : 7,
amcheck : 1,
pam : "AM",
};

window.setInterval(function(){
	checktime();
	
	 if (time.hour === 11 && time.seconds === 59) {
		time.amcheck = time.amcheck + 1;
		time.hour = 12;
		time.seconds = 0;
			if (time.amcheck%2 == 0){
			time.pam = "PM";
			}
			else {
			time.pam = "AM";
			}
	}
	else if (time.hour === 12 && time.seconds == 59){
		time.hour = 1;
		time.seconds = 0;
	}
	else if (time.seconds < 59){
		time.seconds = time.seconds + 1;
	}
	else if (time.seconds >= 59){
		time.seconds = 0;
		time.hour =  time.hour + 1;
	}
	else{
	}
//DRAWING TIME CLOCK	
	if (time.seconds < 10){
//	document.getElementById("timebox").innerHTML =  time.hour + ":" + "0" + time.seconds + time.pam ;
	context.clearRect(1,1,150,150);
	context.fillStyle="black";
	context.font = "1em times new roman";
	context.fillText(time.hour + ":" + "0" + time.seconds + time.pam,10,50);

	}
	else {
//	document.getElementById("timebox").innerHTML =  time.hour + ":" + time.seconds + time.pam ;
	context.clearRect(1,1,150,150);
	context.fillStyle="black";
	context.font = "1em times new roman";
	context.fillText(time.hour + ":" + time.seconds + time.pam,10,50);

	}
}, 1000);


function checktime(){
	if (time.hour === 7 && time.seconds === 1 && time.pam === "AM"){

	}
	else if (time.hour === 12 && time.seconds >= 0 && time.seconds <= 5 && time.pam === "PM"){

	}
}










/************************************
var keys = {};
$(document).keydown(function(event){
        keys[event.which] = true;
      }).keyup(function(event){
        delete keys[event.which];
 });

$(document).keydown(function(key) {
switch(parseInt(key.which,10)) {
case 37:
break;
case 40:
break;
case 38:
break;
case 39:
break;
default:
break;}
}
			});

***************************************/
