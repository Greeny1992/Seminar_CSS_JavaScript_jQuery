"use strict";
class Animal {
    constructor(name) {
        this.name = name;
    }
    move(meters) {
        alert(this.name + " moved " + meters + "m.");
    }
}
class Snake extends Animal {
    move() {
        alert("Slithering...");
        super.move(5);
    }
}
class Horse extends Animal {
    move() {
        alert("Galloping...");
        super.move(45);
    }
}
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
var but = document.createElement('button');
but.innerHTML = "Animal run";
but.onclick = function () {
    sam.move();
    tom.move(35);
};
document.body.appendChild(but);
