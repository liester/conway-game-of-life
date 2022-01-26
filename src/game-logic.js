const shouldLog = false;

const log = (string) => {
    if(shouldLog){
        console.log(string)
    }
}

const hasNeighbor = function hasNeighbor(world, row, column){
    return world[row] ? [1,2].includes(world[row][column]): false
}

const getNeighbors = function getNeighbors(world, row, column){
    //check left
    let left = hasNeighbor(world, row, column-1)
    //check top left
    let topLeft = hasNeighbor(world, row-1, column-1)
    //check top
    let top = hasNeighbor(world,row-1,column)
    //check top right
    let topRight = hasNeighbor(world, row-1, column+1)
    //check right
    let right = hasNeighbor(world, row, column+1)
    //check bottom right
    let bottomRight = hasNeighbor(world, row+1, column+1)
    //check bottom
    let bottom = hasNeighbor(world,row+1,column)
    //check bottom left
    let bottomLeft = hasNeighbor(world,row+1,column-1)

    log('has left:', !!left)
    log('has topLeft:', !!topLeft)
    log('has top:', !!top)
    log('has topRight:', !!topRight)
    log('has right:', !!right)
    log('has bottomRight:', !!bottomRight)
    log('has bottom:', !!bottom)
    log('has bottomLeft:', !!bottomLeft)
    const totalNeighbors = left + topLeft + top + topRight + right + bottomRight + bottom + bottomLeft;
    log(`[${row},${column}]: ${totalNeighbors}`)
    return totalNeighbors;
}

const printGame = function printGame(world){
    console.table(world);
}

const updateWorld = function updateWorld(world){
    for(let i = 0; i<5;i++){
        for(let j =0; j< 5;j++){
            if(world[i][j] === 3){
                world[i][j] = 1;
            }
            if(world[i][j] === 2){
                world[i][j] = 0;
            }
        }
    }
}

// 0: dead cell
// 1: alive cell
// 2: will die
// 3: will live/create

const getNextGeneration = function getNextGeneration({world}){
    for(let i = 0; i<5;i++){
        for(let j =0; j< 5;j++){
            log('checking:', i, ',', j)
            const neighbors =  getNeighbors(world, i,j)
            const cellAlive = world[i][j];
            if(cellAlive){
                if(neighbors < 2 || neighbors > 3){
                    log(`[${i},${j}]:alive, has ${neighbors} and will die`)
                    world[i][j] = 2
                }else{
                    log(`[${i},${j}]:alive, has ${neighbors} and will survive`)
                }
            }else {
                if(neighbors === 3) {
                    log(`[${i},${j}]:dead, has ${neighbors} and will create`)
                    world[i][j] = 3; //create cell
                }else {
                    log(`[${i},${j}]:dead, has ${neighbors} and will stay dead`)
                }
            }
            // printGame(world)
        }
    }
    // printGame(world)
    updateWorld(world)
    return world;
}

export {
    getNextGeneration
}