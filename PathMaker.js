function changeState(id){
        // console.log(id);
        // //read matrix to see state
        // console.log(window.matr.get(id));
        if (window.matr.get(id) == 0){
            window.matr.set(id,1);
            document.getElementById(id).style.backgroundColor = "black";
            document.getElementById(id).innerHTML = "";
        }
        else if (window.matr.get(id) == 1){
            window.matr.set(id,2);
            document.getElementById(id).style.backgroundColor = "skyblue";
            document.getElementById(id).innerHTML = "START";
        }
        else if (window.matr.get(id) == 2){
            window.matr.set(id,3);
            document.getElementById(id).style.backgroundColor = "red";
            document.getElementById(id).innerHTML = "END";
        }
        else{
            window.matr.set(id,0);
            document.getElementById(id).style.backgroundColor = "tan"; 
            document.getElementById(id).innerHTML = id;
        }
    }

    ///states include empty, obstacle,one-way,two way, three-way
    //have a set of already traversed spaces
    // return shortest possible path(S)


function produce4x4(){
    // window.matrix = [[0,0,0,0][0,0,0,0][0,0,0,0][0,0,0,0]];
    let toWrite = "";
    for (let x = 0; x < 16; x++){
        toWrite += "<div class='oB4' id='" + x + "' onclick='changeState("+ x +")'>" + x + "</div>";
    }
    document.getElementById("omniBoard").innerHTML = toWrite;
    window.matr = new matrixMax(4);
    console.log(window.matr);
}

function produce5x5(){
    let toWrite = "";
    for (let x = 0; x < 25; x++){
        toWrite += "<div class='oB5' id='" + x + "' onclick='changeState("+ x +")'>" + x + "</div>";
    }
    document.getElementById("omniBoard").innerHTML = toWrite;
    window.matr = new matrixMax(5);
    console.log(window.matr); 
}

function produce7x7(){
    let toWrite = "";
    for (let x = 0; x < 49; x++){
        toWrite += "<div class='oB7' id='" + x + "' onclick='changeState("+ x +")'>" + x + "</div>";
    }
    document.getElementById("omniBoard").innerHTML = toWrite;
    window.matr = new matrixMax(7);
    console.log(window.matr); 
}

function produce10x10(){
    let toWrite = "";
    for (let x = 0; x < 100; x++){
        toWrite += "<div class='oB10' id='" + x + "' onclick='changeState("+ x +")'>" + x + "</div>";
    }
    document.getElementById("omniBoard").innerHTML = toWrite;
    window.matr = new matrixMax(10);
    console.log(window.matr); 
}


class matrixMax{
    constructor(x){
        this.matrix = [];
        if (x == 4){
            this.matrix = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        }
        if (x == 5){
            this.matrix = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        }
        if (x == 7){
            for (let x = 0; x < 49; x++){
                this.matrix.push(0);
            }
        }
        if (x == 10){
            for (let x = 0; x < 100; x++){
                this.matrix.push(0);
            }
        }
    }
    get(id){
        return this.matrix[id];
    }
    set(id,state){
        this.matrix[id] = state;
    }
    findStartsAndEnds(){
        let toReturn = [[],[]];
        for (let x = 0; x < this.matrix.length; x++){
            if (this.matrix[x] == 2){
                toReturn[0].push(x);
            }
            else if (this.matrix[x] == 3){
                toReturn[1].push(x);
            }
        }
        return toReturn;
    }
    traversal(starts){
        let finalPaths = [];
        let size = this.matrix.length;
        console.log("Size is " + size);
        for (let x = 0; x < starts.length; x++){
            let traversed = new Set();
            let paths = [];
            let placeHolder = [];
            paths.push([starts[x]]);
            while (paths.length != 0){
                for (let t = 0; t < paths.length; t++){
                    ///look left, right, up, and down
                    ///length of board is squareroot of 
                    let y = paths[t];
                    let num = y[y.length-1];
                    ////move down
                    if ((!(num >= (size-Math.sqrt(size)))) && !traversed.has(num + Math.sqrt(size))){
                        //if obstacle
                        if (this.matrix[num + Math.sqrt(size)] == 1){
                            // continue;
                        }
                        else{
                            let copy = y.slice(0);
                            traversed.add(num);
                            traversed.add(num + Math.sqrt(size));
                            copy.push(num + Math.sqrt(size));
                            //if exit : do
                            if (this.matrix[num+Math.sqrt(size)] == 3){
                                finalPaths.push(copy);
                                paths = [];
                                placeHolder = [];
                                break;
                            }
                            placeHolder.push(copy);
                             }
                    }
                    ///move up 
                    // console.log(num);
                    if (!traversed.has(num - Math.sqrt(size)) && !(num <= Math.sqrt(size))){
                        if (this.matrix[num - Math.sqrt(size)] == 1){
                            // continue;
                        }
                        else{
                            let copy = y.slice(0);
                            traversed.add(num);
                            traversed.add(num - Math.sqrt(size));
                            copy.push(num - Math.sqrt(size));
                            //if exit : do
                            if (this.matrix[num-Math.sqrt(size)] == 3){
                                finalPaths.push(copy);
                                paths = [];
                                placeHolder = [];
                                break;
                            }
                            placeHolder.push(copy);
                          }
                    }
                    //moveleft
                    if (!traversed.has(num - 1) && !(num % (Math.sqrt(size)) == 0)){
                        if (this.matrix[num-1] == 1){

                        }
                        else{
                            let copy = y.slice(0);
                            traversed.add(num);
                            traversed.add(num - 1);
                            copy.push(num -1);
                            //if exit : do
                            if (this.matrix[num-1] == 3){
                                finalPaths.push(copy);
                                paths = [];
                                placeHolder = [];
                                break;
                            }
                            placeHolder.push(copy); 
                        }
                    }
                    //moveRight
                    if (!traversed.has(num + 1) && !((1 + num)%(Math.sqrt(size)) == 0)){
                        if (this.matrix[num + 1] == 1){

                        }
                        else{
                            let copy = y.slice(0);
                            traversed.add(num);
                            traversed.add(num + 1);
                            copy.push(num +1);
                            if (this.matrix[num+1] == 3){
                                finalPaths.push(copy);
                                paths = [];
                                placeHolder = [];
                                break;
                            }
                            placeHolder.push(copy);
                        }
                    }



                }
                paths = placeHolder;
                placeHolder = [];
                console.log(paths);
            }
            if (finalPaths.length <= x){
                finalPaths.push(false);
            }
        }
        return finalPaths;
    }
}

function pathExplainer(starts,paths){
    //match starts to corresponding paths in neat fashion
    let text = "Paths:<br>";
    if (starts.length == 0){
        text += "There are no places to start from."
    }
    for (let c = 0; c < starts.length; c++){
        text += "Start at " + starts[c] + ":<br>";
        //path write
        if (paths[c] == false){
            text += "There is no end square that can be reached from this start square."
        }
        else{
            text += starts[c];
            for (let x = 1; x < paths[c].length; x++){
                text += " -> " + paths[c][x];
            }
            text += "<br>";
        }
    }
    document.getElementById("rightDisplay").innerHTML = text;

}

function pathMaker(){
    //read matrix for starts and ends
    let ends = window.matr.findStartsAndEnds();
    // let lengt = Math.sqrt(window.matr.matrix.length);
    // console.log(ends);
    let answer = window.matr.traversal(ends[0]);
    pathExplainer(ends[0],answer);
}

