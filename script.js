const canvas = document.querySelector('canvas');
const pen = canvas.getContext('2d');


canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight -10


class Player {
    constructor() 
    {
        this.velocity = 
        {
            x:20,
            y:5
        }

        const image = new Image()
        image.src = 'images/spaceship.png'
        image.onload = () => 
        {
            const scale = 0.2
            this.image = image
            this.width = image.width*scale
            this.height = image.height*scale
            this.position = 
            {
                x:(canvas.width/2) - this.width/2,
                y: canvas.height - 100
            }
        }
    }

    draw() {
        // pen.fillStyle = 'red'
        // pen.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        pen.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        )
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }    
    }
}

const player = new Player()

const keys = {
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    space:{
        pressed:false
    }
}


addEventListener('keydown', ({key}) =>{
    switch (key) {
        case 'a':
            keys.a.pressed = true
            break;
        case 'd':
            keys.d.pressed = true
            break;
        case ' ':
            console.log("projectile shoot")
            break;
        default:
            break;
    }
})


addEventListener('keyup', ({key}) =>{
    switch (key) {
        case 'a':
            keys.a.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
        case ' ':
            console.log("projectile shoot")
            break;
        default:
            break;
    }
})


function animate() 
{
    requestAnimationFrame(animate)
    pen.fillStyle = 'black'
    pen.fillRect(0, 0 ,canvas.width, canvas.height)
    player.update()

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -7
    }
    else if (keys.d.pressed && player.position.x + player.width < canvas.width) {
        player.velocity.x = 7
    }
    else{
        player.velocity.x = 0
    }

}



animate()
