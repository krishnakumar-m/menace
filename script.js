/****
MENACE - Machine Educable Noughts And Crosses Engine

 

machine play

check move_dictionary for <board_string>

   if not present push <board_string>,[available moves]

get a random move

record move as <board_string>, move in move_register

play move

 

determine win or lose

 

human play

 

determine win or lose

-------------------------------------------

win ->  for each board_string in move_register, add 'move' to move_dictionary

lose ->  for each board_string in move_register, reduce 'move' from move_dictionary
*****/

 move_dictionary = {};

cpu =0;

human = 0;

draw = 0;


 

 

 function reinit() {

move_register = [];

move_counter = 0;

board_string = "123456789";

}

function machinePlay(){

if(move_dictionary[board_string]==undefined || move_dictionary[board_string].length==0) {

                var arr = board_string.split('');

                do {

                var srchIndex = arr.indexOf('x');

                                if(srchIndex > -1){

                                arr.splice(srchIndex,1);

                                }

                }while(srchIndex > -1);

                do {

                var srchIndex = arr.indexOf('o');

                                if(srchIndex > -1){

                                arr.splice(srchIndex,1);

                                }

                }while(srchIndex > -1);

               

    move_dictionary[board_string] = arr;

}

arr = move_dictionary[board_string];


 var curr_move = arr[Math.floor(Math.random()*arr.length)];

move_register[move_counter] = { board : board_string, move:curr_move};

board_string = board_string.replace(curr_move,'x');

console.log("board "+board_string);

move_counter++;

  return isCPUWin();

}

function winOrLose(player) {

var pos = board_string.split('');

return ((pos[0]==pos[1] && pos[1]==pos[2] && pos[2]==player) ||

  (pos[3]==pos[4] && pos[4]==pos[5] && pos[5]==player) ||

  (pos[6]==pos[7] && pos[7]==pos[8] && pos[8]==player) ||

  (pos[0]==pos[3] && pos[3]==pos[6] && pos[6]==player) ||

  (pos[1]==pos[4] && pos[4]==pos[7] && pos[7]==player) ||

  (pos[2]==pos[5] && pos[5]==pos[8] && pos[8]==player) ||

  (pos[0]==pos[4] && pos[4]==pos[8] && pos[8]==player) ||

  (pos[2]==pos[4] && pos[4]==pos[6] && pos[6]==player) );

  }

function isCPUWin() {

if(winOrLose('x')) {

                for(var i=0;i<move_register.length;i++) {

                                var boardStr = move_register[i].board;

                                var move = move_register[i].move;

                                move_dictionary[boardStr].push(move);

                }

                reinit();

                console.log('CPU won');

                cpu++;

                return true;

}

return false;

}


 function isHumanWin() {

  if(winOrLose('o')) {

                for(var i=0;i<move_register.length;i++) {

                                var boardStr = move_register[i].board;

                                var move = move_register[i].move;

                                var arr = move_dictionary[boardStr];

                                do {

                                                var indx = arr.indexOf(move);

                                                if(indx > -1) {

                                                                arr.splice(indx,1);

                                                }

                                }while(indx>-1);

                                move_dictionary[boardStr] = arr;

                }

                                reinit();

                console.log('Human won');

                human++;

                return true;

}

  return false;

}

function humanPlay(pos) {

  var arr = board_string.split('');

  if(arr[pos] == 'o' || arr[pos] == 'x') {

                console.log("Error");

  } else {

    arr[pos] = 'o';

                board_string = arr.join('');

                isHumanWin();

  }


 }


 

function randomPlay() {

var arr = board_string.split('');

do {

                var srchIndex = arr.indexOf('x');

                                if(srchIndex > -1){

                                arr.splice(srchIndex,1);

                                }

}while(srchIndex > -1);

do {

                var srchIndex = arr.indexOf('o');

                                if(srchIndex > -1){

                                arr.splice(srchIndex,1);

                                }

}while(srchIndex > -1);


 if(arr.length>0) {

                var curr_move = arr[Math.floor(Math.random()*arr.length)];

                board_string = board_string.replace(curr_move,'o');

                console.log("board "+board_string);

                if(isHumanWin()) {return 1;}

} else {

   reinit();

   console.log("Draw !");

   draw++;

   return 2;

}

return 0;

}

 

 

function oneRound() {

                var humanResult = 0;

                var machineWon = machinePlay();

                if(machineWon) {

                                return true;

                } else {

                humanResult =   randomPlay();

                if(humanResult >0) {

                                return true;

                }

                }

                return false;

}

 

function runTrials() {

  var nResults = 0;

  while(nResults<100) {

                if(oneRound()) {

                                nResults++;

                }

  }

  stats();

}


function stats() {


 console.log("---------");

console.log("CPU : "+cpu);

console.log("Human : "+human);

console.log("Draw : "+draw);

console.log("---------");

console.log("Dictionary size :"+Object.keys(move_dictionary).length);

}
/***
xoo

xox

xxo
***/

