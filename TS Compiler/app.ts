class Animal {
    constructor(public name: string) { }
    move(meters: number): void {
        alert(this.name + " moved " + meters + "m.");
    }
}

class Snake extends Animal {
    move():void {
        alert("Slithering...");
        super.move(5);
    }
}

class Horse extends Animal {
    move(): void {
        alert("Galloping...");
        super.move(45);
    }
}

var sam: Snake = new Snake("Sammy the Python")
var tom: Animal = new Horse("Tommy the Palomino")
var but: HTMLButtonElement = document.createElement('button')
but.innerHTML = "Animal run"
but.onclick = function() {
    sam.move()
    tom.move(35)
}
document.body.appendChild(but)