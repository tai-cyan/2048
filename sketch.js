setup = () => {
  createCanvas(700, 700)
  background(220)
  reset()
  noLoop()
}

draw = () => {
  frame()
  dispNewData()
  gameOver()
}

keyPressed = () =>{
  switch (key){
    case "r":
      reset()
      redraw()
      break
  }
  switch(keyCode){
    case UP_ARROW:
      if(f===ture){
      upMove()
      }
      endJudge()
      break
    case DOWN_ARROW:
      if(f===ture){
      downMove()
      }
      endJudge()
      break
    case RIGHT_ARROW:
      if(f===ture){
      rightMove()
      }
      endJudge()
      break
    case LEFT_ARROW:
      if(f===ture){
      leftMove()
      }
      endJudge()
      break
  }
}
      
addNewBlock = () => {
  while(true){
    var a = Math.floor(Math.random()*4)
    var b = Math.floor(Math.random()*4)
    if(data[a][b]===11){
      data[a][b] = 0
      break
    }
  }
}
  
endJudge = () => {
  let flag = false
  for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      if(data[j][i]===11){
        flag = true
      }
    }
  }
  if(flag===false){
    gameOver()
  }else if(flag===true){
    addNewBlock()
    redraw()
  }
}
  
gameOver = () => {
  fill("black")
  stroke(0)
  strokeWeight(0)
  rect(80, 200, 540, 300, 10)
  textSize(100)
  fill("white")
  text("game over", 110, 320)
  textSize(45)
  text("restart -> press [r] key",130,420)
}

  
let f=false

upMove = () =>{
  //x=j,y=i
  for(let c=0;c<3;c++){
    for(let i=0;i<4;i++){
      for(let j=1;j<4;j++){
        if(data[j-1][i]===11){
          data[j-1][i] = data[j][i]
          data[j][i] = 11
          f=true
        }else if(data[j-1][i]===data[j][i]){
          data[j-1][i] += 1
          data[j][i] = 11
          f=true
        }
      }
    }
  }
}

downMove = () =>{
  //x=j,y=i
  for(let c=0;c<3;c++){
    for(let i=0;i<4;i++){
      for(let j=0;j<3;j++){
        if(data[j+1][i]===11){
          data[j+1][i] = data[j][i]
          data[j][i] = 11
          f=true
        }else if(data[j+1][i]===data[j][i]){
          data[j+1][i] += 1
          data[j][i] = 11
          f=true
        }
      }
    }
  }
}

rightMove = () =>{
  //x=j,y=i
  for(let c=0;c<3;c++){
    for(let i=0;i<3;i++){
      for(let j=0;j<4;j++){
        if(data[j][i+1]===11){
          data[j][i+1] = data[j][i]
          data[j][i] = 11
          f=true
        }else if(data[j][i+1]===data[j][i]){
          data[j][i+1] += 1
          data[j][i] = 11
          f=true
        }
      }
    }
  }
}


leftMove = () =>{
  //x=j,y=i
  for(let c=0;c<3;c++){
    for(let i=1;i<4;i++){
      for(let j=0;j<4;j++){
        if(data[j][i-1]===11){
          data[j][i-1] = data[j][i]
          data[j][i] = 11
          f=true
        }else if(data[j][i-1]===data[j][i]){
          data[j][i-1] += 1
          data[j][i] = 11
          f=true
        }
      }
    }
  }
}
  
reset = () => {
  for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      data[j][i]=11
    }
  }
  var a = Math.floor(Math.random()*4)
  var b = Math.floor(Math.random()*4)
  var c = Math.floor(Math.random()*4)
  var d = Math.floor(Math.random()*4)
  data[a][b]=0
  data[c][d]=0
  background(220)
}

var data = [
  [11,11,11,11],
  [11,11,11,11],
  [11,11,11,11],
  [11,11,11,11]
]

//i=x,j=y
dispNewData = () => {
  for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      disp(i,j,data[j][i])
    }
  }
}

//・(x座標,y座標,状態番号)・
disp = (x, y, n) =>{
  plot(x, y, n)
  number(x, y, n)
}

//(x座標, y座標, 状態番号)
plot = (x, y, n) => {
  x = positionConversion(x)
  y = positionConversion(y)
  n = colorSelect(n)
  pocket(x, y, n)
}

//(x座標,y座標,状態番号)
number = (x, y, n) => {
  var xAssist, size, yAssist
  
  switch(n){
    case 0:
    case 1:
    case 2:
      xAssist = 40
      size = 80
      yAssist = 95
    break
    case 3:
    case 4:
    case 5:
      xAssist = 20
      size = 80
      yAssist = 95
    break
    case 6:
    case 7:
    case 8:
      xAssist = 5
      size = 70
      yAssist = 95
    break
    case 9:
    case 10:
      xAssist = 3
      size = 55
      yAssist = 90
    break
  }
  
  x = positionConversion(x)+xAssist
  y = positionConversion(y)+yAssist
  
  textSize(size)
  fill("white")
  n = numberConversion(n)
  text(n, x, y)
}



pocket = (x, y, color) => {
  fill(color)
  stroke(0)
  strokeWeight(0)
  rect(x, y, 130, 130, 10)
}

positionConversion = (a) => {
  a = (a*150)+60
  return(a)
}
  
frame = () => {
  stroke("white")
  strokeWeight(20)
  
  // 縦線
  line(50, 50, 50, 650)
  line(200, 50, 200, 650)
  line(350, 50, 350, 650)
  line(500, 50, 500, 650)
  line(650, 50, 650, 650)
  
  //横線
  line(50, 50, 650, 50)
  line(50, 200, 650, 200)
  line(50, 350, 650, 350)
  line(50, 500, 650, 500)
  line(50, 650, 650, 650)
}

colorSelect = (a) => {
  switch(a){
    case 0: //2
      a = "#ccedff"
    break
    case 1: //4
      a = "#5cd8ff"
    break
    case 2: //8
      a = "#ffc24d"
    break
    case 3: //16
      a = "#ff8a4d"
    break
    case 4: //32
      a = "#ff5d4d"
    break
    case 5: //64
      a = "#ff3849"
    break
    case 6: //128
      a = "#ffec38"
    break
    case 7: //256
      a = "#dbff38"
    break
    case 8: //512
      a = "#38fff1"
    break
    case 9: //1024
      a = "#384eff"
    break
    case 10: //2048!!!
      a = "#a138ff"
    break;
    default:
      a = "#ccc"
    break;
  }
  return(a)
}


numberConversion = (a) => {
  switch(a){
    case 0: //2
      a = "2"
    break
    case 1: //4
      a = "4"
    break
    case 2: //8
      a = "8"
    break
    case 3: //16
      a = "16"
    break
    case 4: //32
      a = "32"
    break
    case 5: //64
      a = "64"
    break
    case 6: //128
      a = "128"
    break
    case 7: //256
      a = "256"
    break
    case 8: //512
      a = "512"
    break
    case 9: //1024
      a = "1024"
    break
    case 10: //2048!!!
      a = "2048"
    break
    default:
      a = " "
    break
  }
  return(a)
}
