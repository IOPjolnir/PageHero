import heroDefaults from '../JSONs/heroDefaults.json' assert { type: 'json' }
import monsterDefaults from './monstersDefaultsFormules.js'
const cellWidth = 100;         // 
const cellHeight = 100;        //
const characterWidth = 80;     //
const characterHeight = 80;    //
const walkingInterval = 350;   //
const fightingInterval = 1000; //
const map = document.querySelector('#game-map');
const markStart = document.querySelector('#mark-start');

var round = 0;
var heroesNumber = 0;

start();


function start() {
	map.field = new Field(5, 4, 3, 2);
	const player = new Hero();
	// TODO player.body.style.left = map.startX * cellWidth + (cellWidth - characterWidth) / 2 + 'px';
	// TODO player.body.style.top = map.startY * cellHeight + (cellHeight - characterHeight) / 2 + 'px';
	round = 1;
	mainLoop();
}

function mainLoop() {
	
}

function Field(width, height, randomWidth, randomHeight) {
	this.width = width + Math.round(Math.random() * randomWidth);
	this.height = height + Math.round(Math.random() * randomHeight);
	this.road = document.querySelector('#outer.path');
	map.style.width = this.width * cellWidth + 'px';
	map.style.height = this.height * cellHeight + 'px';
	const innerBorder = this.road.querySelector('#inner.path');
	innerBorder.style.left = cellWidth + 'px';
	innerBorder.style.top = cellHeight + 'px';
	innerBorder.style.width = (this.width - 2) * cellWidth + 'px';
	innerBorder.style.height = (this.height - 2) * cellHeight + 'px';
	this.startX = Math.round(Math.random() * (this.width - 3)) + 1;
	this.startY = this.height - 1;
	markStart.style.left = this.startX * cellWidth + 'px';
	markStart.style.top = (this.startY + 1) * cellHeight + 'px';
	markStart.style.width = cellWidth + 'px';
	markStart.style.height = cellHeight + 'px';
}


function Hero() {
	this.__proto__ = new Creature(...Object.values(heroDefaults));
	this.lvl = 1;
	this.direction = 'left';
	this.x = Math.round(Math.random() * (map.field.width - 4)) + 2;
	this.y = map.field.height - 1;
	this.body = document.createElement('div');
	this.body.id = 'player' + (++heroesNumber);
	this.body.className = 'hero -positioned';
	this.body.style.width = characterWidth + 'px';
	this.body.style.height = characterHeight + 'px';
	map.append(this.body);
}

function Monster(type, lvl) {
	this.__proto__ = new Creature(...Object.values(monsterDefaults(type, lvl)));
}

function Creature(healthPoints, minDamage, maxDamage, missChance) {
	this.healthPoints = healthPoints;
	this.minDamage = minDamage;
	this.maxDamage = maxDamage;
	this.missChance = missChance;
}