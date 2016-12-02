'use strict';

import SnakePart from './snakePart';

const SNAKEWIDTH = 20;
const SNAKEHEIGHT = 20;
const BODYPARTMARGIN = 5;
const SNAKECOLOR = '#ffffff';

export default class Snake {

    constructor(context, x, y, color) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.score = 0;
        this.direction = "right";
        this.color = color;
        this.width = SNAKEWIDTH;
        this.height = SNAKEHEIGHT;

        this.bodyParts = [];
    }

    draw() {
        this.addBodyPart(this.x, this.y);
    }

    addBodyPart(x, y) {
        let snakePart = new SnakePart(this.context, x, y, this.width, this.height, this.color);
        snakePart.draw();

        this.bodyParts.push(snakePart);
    }

    moveDown() {
        let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
        let firstBodyPart = this.bodyParts[0];

        lastBodyPart.remove();

        lastBodyPart.y = firstBodyPart.y + this.height + BODYPARTMARGIN;
        lastBodyPart.x = firstBodyPart.x;
        lastBodyPart.draw();

        this.moveBodyPartsInArray();
    }

    moveUp() {
        let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
        let firstBodyPart = this.bodyParts[0];

        lastBodyPart.remove();

        lastBodyPart.y = firstBodyPart.y - this.height - BODYPARTMARGIN;
        lastBodyPart.x = firstBodyPart.x;
        lastBodyPart.draw();

        this.moveBodyPartsInArray();
    }

    moveLeft() {
        let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
        let firstBodyPart = this.bodyParts[0];

        lastBodyPart.remove();

        lastBodyPart.y = firstBodyPart.y;
        lastBodyPart.x = firstBodyPart.x - this.width - BODYPARTMARGIN;
        lastBodyPart.draw();

        this.moveBodyPartsInArray();
    }

    moveRight() {
        let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
        let firstBodyPart = this.bodyParts[0];

        lastBodyPart.remove();

        lastBodyPart.y = firstBodyPart.y;
        lastBodyPart.x = firstBodyPart.x + this.width + BODYPARTMARGIN;
        lastBodyPart.draw();

        this.moveBodyPartsInArray();
    }

    addScore() {
        this.score += 1;
    }

    moveBodyPartsInArray() {
        this.bodyParts.splice(0, 0, this.bodyParts.splice(this.bodyParts.length - 1, 1)[0]);
    }

    move() {
        if (this.direction === 'right') {
            this.moveRight();
        }
        else if (this.direction === 'down') {
            this.moveDown();
        }
        else if (this.direction === 'up') {
            this.moveUp();
        }
        else if (this.direction === 'left') {
            this.moveLeft();
        }
    }

    checkCollisionWithApples(apples) {
        let firstBodyPart = this.bodyParts[0];
        let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];

        apples.forEach((apple, index) => {
            if (firstBodyPart.x < apple.x + apple.radius * 2 &&
                firstBodyPart.x + firstBodyPart.width > apple.x &&
                firstBodyPart.y < apple.y + apple.radius * 2 &&
                firstBodyPart.height + firstBodyPart.y > apple.y) {

                apples.splice(index, 1);
                this.addScore();

                console.log(this.score);
                this.addBodyPart(lastBodyPart.x - (this.width + BODYPARTMARGIN), lastBodyPart.y);

            }
        });
    }

}
