var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var scoreboard = document.getElementById("kresty");
let points = 0;
var e = document.getElementById("ending");
let barcounter = 0;

var back = new Image(896,896);
var strip = new Image(10, 128);
var car = new Image(117, 236);
var barricade = new Image(140, 106);
var cross = new Image(100, 100)

var audio=new Audio();
audio.src='audio/main.mp3';

var xCarPos = 270; //начальное положение машины по Х
var yCarPos = 650; //начальное положение машины по Y
var x = 0;
back.src = "pic/back.png";
strip.src = "pic/strip.png";
car.src = "pic/car.png";
barricade.src = "pic/barricade.png";
cross.src = "pic/cross.png";
var road1 = []; //массив с полосками по левую сторону
road1[0] = {x: 225,
    y: 0}
var road2 = []; //массив с полосками по правую сторону
road2[0] = {x: 671,
    y: 0}
var bar = []; //массив с баррикадами
bar[0] = {x: 40,
    y: 0
}
var crosses = []; //массив с крестами
crosses[0] = {x: 40,
    y: 150
}

//ФУНКЦИЯ УПРАВЛЕНИЯ АВТОМОБИЛЕМ
document.onkeypress=function(event) {
    if ((event.key === "a" || event.key === "ф" || event.key === "A" || event.key === "Ф") && xCarPos >= 41)
        xCarPos -= 230; //нажата A - сдвиг влево на полосу
    if ((event.key === "d" || event.key === "в" || event.key === "D" || event.key === "В") && xCarPos <= 729)
        xCarPos += 230; //нажата D - сдвиг вправо на полосу
}

//ФУНКЦИЯ ГЕНЕРАЦИИ ПСЕВДОСЛУЧАЙНЫХ ЧИСЕЛ
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//ФУНКЦИЯ ОТРИСОВКИ ИГРЫ
function draw() {
	audio.play();
    context.drawImage(back, 0, 0, 896, 896)
    for (var i = 0; i < road1.length; i++) { //эффект бегущей дороги
        context.drawImage(strip, road1[i].x, road1[i].y, 10, 128); //отрисовка полосы
        road1[i].y += 10; //движение полосы для создания эффекта
        //создание новой полоски, при условии если последняя из массива достигла определенной отметки
        if (road1[i].y == 300) {
            road1.push({
                x: 225,
                y: 0
            })
        }
    }
    for (var i = 0; i < road2.length; i++) { //эффект бегущей дороги
        context.drawImage(strip, road2[i].x, road2[i].y, 10, 128); //отрисовка полосы
        road2[i].y += 10; //движение полоски для создания эффекта
        //создание новой полоски, при условии если последняя из массива достигла определенной отметки
        if (road2[i].y == 300) {
            road2.push({
                x: 671,
                y: 0
            })
        }
    }
    context.drawImage(car, xCarPos, yCarPos, 117, 236); //отрисовка машины на дороге
    for (var i = 0; i < bar.length; i++) {
        context.drawImage(barricade, bar[i].x, bar[i].y, 140, 106); //отрисовка баррикады
        bar[i].y += 10; //движение баррикады по дороге
        //проверка столкновений с баррикадами
        if ((yCarPos == bar[i].y + 80 || yCarPos == bar[i].y + 30 || yCarPos == bar[i].y - 30 || yCarPos == bar[i].y - 100 || yCarPos == bar[i].y - 150) && xCarPos == bar[i].x) 
        {
            location.reload()       
        }
        //создание новой баррикады
        if (bar[i].y == 500) {
            x = getRandomInRange(1, 4);
            switch (x) {
                case 1:
                    bar.push({x: 40, y: 0})
                    break;
                case 2:
                    bar.push({x: 270, y: 0})
                    break;
                case 3:
                    bar.push({x: 500, y: 0})
                    break;
                case 4:
                    bar.push({x: 730, y: 0})
                    break;
            }
        }
    }
    for (var i = 0; i < crosses.length; i++) {
        context.drawImage(cross, crosses[i].x, crosses[i].y, 100, 100);
        crosses[i].y += 10;
        if ((yCarPos == crosses[i].y + -30 && xCarPos == crosses[i].x)) { //ловим пересечение с крестом Доминика Торетто
            points++; //добавляем очко в переменную
            scoreboard.value = points; //передаем переменную с очками в поле на экране
        }
        //создание нового Креста Доменика Торетто (+ цепочка в подарок)
        if (crosses[i].y == 900) {
            x = getRandomInRange(1, 4);
            switch (x) {
                case 1:
                    crosses.push({x: 40, y: 0})
                    break;
                case 2:
                    crosses.push({x: 270, y: 0})
                    break;
                case 3:
                    crosses.push({x: 500, y: 0})
                    break;
                case 4:
                    crosses.push({x: 730, y: 0})
                    break;
            }
        }
    }
    if (points < 30) //если крестов Доминика Торетто (+ цепочка в подарок) меньше чем 30, игра отрисовывается
        {
            
            requestAnimationFrame(draw)
            
        }
    else //иначе - останавливается, и показывает окно с окончанием игры
    {
        document.getElementById('ending').style.visibility = 'visible';
		audio.stop();
        cancelAnimationFrame(draw)
    }
}
car.onload = draw; //отрисовывает после загрузки машины на canvas'е

