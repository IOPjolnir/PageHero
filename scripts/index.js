import heroDefaults from '../JSONs/heroDefaults.json' assert { type: 'json' }
import monsterDefaults from './monstersDefaultsFormules.js'
const cellWidth  = 100;        // 
const cellHeight = 100;        //
const pathCell   = '#';        //
const emptyCell  = ' ';        // 
const characterWidth  = 80;    //
const characterHeight = 80;    //
const movingInterval  = 350;   //
const fightingInterval = 1000; //
const map = document.querySelector('#game-map');
const markStart = document.querySelector('#mark-start');

var round = 0;
var heroesNumber = 0;

start();


function start() {
	map.field = new Field(5, 4, 3, 2);
	console.log(map.field);
	const player = new Hero(map.startX, map.startY);
	setStyles(player.body, {
		left: map.field.startX * cellWidth + (cellWidth - characterWidth) / 2 + 'px',
		top:  map.field.startY * cellHeight + (cellHeight - characterHeight) / 2 + 'px'
	});
	round = 1;
	mainLoop(player);
}


function mainLoop(player) {
	setInterval(() => {
		player.move(player.direction);
	}, movingInterval);
}


function setStyles(element, stylesObj) {
	Object.entries(stylesObj).forEach(entry => {
		const [key, value] = entry;
		element.style[key] = value;
	});
}


function randInt(left, right) {
	return Math.floor(Math.random() * (right - left) + left);
}



function Field(width, height, randomWidth, randomHeight) {
	this.width  = width + randInt(0, randomWidth + 1);
	this.height = height + randInt(0, randomHeight + 1);
	this.road   = document.querySelector('#outer.path');
	this.matrix = new Array(this.height);
	for (let i = 0; i < this.height; ++i) {
		this.matrix[i] = new Array(this.width);
		for (let j = 0; j < this.width; ++j) {
			this.matrix[i][j] = (i == 0 || j == 0 || i == this.height - 1 || j == this.width - 1) ? pathCell : emptyCell;
		}
	}
	setStyles(map, {
		width:  this.width * cellWidth + 'px',
		height: this.height * cellHeight + 'px'
	})
	const innerBorder = this.road.querySelector('#inner.path');
	setStyles(innerBorder, {
		left:   cellWidth + 'px',
		top:    cellHeight + 'px',
		width:  (this.width - 2) * cellWidth + 'px',
		height: (this.height - 2) * cellHeight + 'px'
	});
	this.startX = Math.round(Math.random() * (this.width - 3)) + 1;
	this.startY = this.height - 1;
	setStyles(markStart, {
		left:   this.startX * cellWidth + 'px',
		top:    (this.startY + 1) * cellHeight + 'px',
		width:  cellWidth  + 'px',
		height: cellHeight + 'px'
	});
}


function Hero(x, y) {
	this.__proto__ = new Creature(...Object.values(heroDefaults));
	this.lvl = 1;
	this.direction = 'right';
	this.x = x;
	this.y = y;
	this.body = document.createElement('div');
	this.body.id = 'player' + (++heroesNumber);
	this.body.className = 'hero -positioned';
	setStyles(this.body, {
		width:  characterWidth + 'px',
		height: characterHeight + 'px'
	});
	map.append(this.body);
	this.move = function(direction) {
		switch (direction) {

			case 'top':
				if (--this.y < 0) {
					this.y = 0;
					this.direction = 'left';
					this.move(this.direction);
				}
				break;

			case 'left':
				if (--this.x < 0) {
					this.x = 0;
					this.direction = 'bottom';
					this.move(this.direction);
				}
				break;

			case 'bottom':
				if (++this.y >= map.height) {
					this.y = map.height - 1;
					this.direction = 'right';
					this.move(this.direction);
				}
				break;

			case 'right': 
				if ((++(this.x)) >= map.width) {
					this.x = map.width - 1;
					this.direction = 'top';
					this.move(this.direction);
				}
				break;
			
			default:
				throw new Error('incorrect moving direction');
		}
		console.log(this.y, this.x)
		if (map.matrix[this.y][this.x] != pathCell) {
			
		}

		setStyles(this.body, {
			top:  this.y * cellHeight + (cellHeight - characterHeight) / 2 + 'px',
			left: this.x * cellWidth + (cellHeight - characterHeight) / 2 + 'px'
		});
	}
	this.nextCell = function() {
		
	}
}

function Monster(type, lvl) {
	this.__proto__ = new Creature(...Object.values(monsterDefaults(type, lvl)));
}

function Creature(healthPoints, minDamage, maxDamage, missChance) {
	this.healthPoints = healthPoints;
	this.minDamage    = minDamage;
	this.maxDamage    = maxDamage;
	this.missChance   = missChance;

	this.attack = new function(target) {
		const damage = Math.random();
	}
}