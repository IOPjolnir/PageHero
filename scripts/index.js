import heroDefaults from '../JSONs/heroDefaults.json' assert { type: 'json' }
import monsterDefaults from './monstersDefaultsFormules.js'
const cellWidth = 100;         // 
const cellHeight = 100;        //
const characterWidth = 80;     //
const characterHeight = 80;    //
const walkingInterval = 350;   //
const fightingInterval = 1000; //
const map = document.querySelector('#game-map');

var round = 0;

start();


function start() {
	map.field = new Field(6, 5, 3, 3);
	console.log(map.field);
	round = 1;
	mainLoop();
}

function mainLoop() {
	
}

function Field(width, height, randomWidth, randomHeight) {
	this.width = width + Math.round(Math.random() * randomWidth);
	this.height = height + Math.round(Math.random() * randomHeight);
	this.road = document.querySelector('#outer.path');
	const innerBorder = this.road.querySelector('#inner.path');
	map.style.width = this.width * cellWidth + 'px';
	map.style.height = this.height * cellHeight + 'px';
}


function Hero() {
	this.__proto__ = new Creature(...Object.values(heroDefaults));
	this.lvl = 1;
	this.x = Math.round(Math.random() * (map.field.width - 4)) + 2;
	this.y = map.field.height - 1;
	this.direction = 'left';
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