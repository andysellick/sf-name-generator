
var nameword = 'street fighter';

var startwords = [
'',
'hyper',
'super',
'turbo',
'ultra',
];

var startwordssilly = [
'awesome',
'mega',
'ultimate',
'uber',
'supreme',
'galactic',
'intergalactic',
'epic',
'deluxe',
];

var middlewords = [
'',
'fighting',
'street',
'world',
'warrior',
'champion',
'turbo',
'tournament',
'battle',
'anniversary',
'impact',
'remix',
'grand',
'master',
];

var middlewordssilly = [
'punching',
'kicking',
'fisticuffs',
'face slap',
'slapfest',
'staredown',
'combo',
'hard core',
'struggle',
'brawl',
'attack',
'assault',
'combat',
'grapple',
'squabble',
'brawl',
'melee',
'fracas',
'rumpus',
'rumble',
'scuffle',
'clash',
'conflict',
];

var numberwords = [
'',
'II',
'III',
'IV',
'V',
'X',
'EX',
'alpha',
'ultra',
'3D',
'2',
'3',
];

var numberwordssilly = [
'VI',
'VII',
'XXX',
'1000',
'2000',
'3000',
'360',
'One',
];

var endwords = [
'',
'zero',
'edition',
'gold',
'HD',
'AE',
'arcade',
'anthology',
'plus',
'battle',
'challenge',
'revival',
'warriors dreams',
'upper',
'max',
'double upper',
'arrange',
'new generation',
'2nd impact',
'giant attack',
'volt',
'arena',
];

var endwordssilly = [
'fatality',
'megasplosion',
'mashup',
'vs the world',
'beat down',
'throw down',
'in your face',
'dance off',
'collection',
'adventure',
'fight',
'deluxe',
'XP',
'meta',
'deep crust',
'bash'
];

var actualnames = [
'fighting street',
'street fighter',
'street fighter II the world warrior',
'street fighter II',
'street fighter II champion edition',
'street fighter II turbo hyper fighting',
'street fighter II special champion edition',
'street fighter II plus',
'street fighter II turbo',
'street fighter II hyper fighting',
'street fighter II turbo hyper fighting',
'super street fighter II the new challengers',
'super street fighter II tournament battle',
'super street fighter II turbo',
'super street fighter II X grand master challenge',
'super street fighter II turbo revival',
'super street fighter II X revival',
'super street fighter II turbo HD remix',
'hyper street fighter II the anniversary edition',
'street fighter alpha warriors dreams',
'street fighter zero',
'street fighter alpha 2',
'street fighter zero 2',
'street fighter alpha 2 gold',
'street fighter zero 2 alpha',
'street fighter alpha 3',
'street fighter zero 3',
'street fighter alpha 3 upper',
'street fighter zero 3 upper',
'street fighter alpha 3 max',
'street fighter zero 3 double upper',
'street fighter zero 2 arrange',
'street fighter zero 2 alpha arrange',
'hyper street fighter alpha',
'hyper street fighter zero',
'street fighter III new generation',
'street fighter III 2nd impact giant attack',
'street fighter III 3rd strike fight for the future',
'street fighter IV HD',
'street fighter IV volt',
'street fighter IV arena',
'super street fighter IV 3D edition',
'super street fighter IV AE',
'ultra street fighter IV',
'street fighter V',
];
var actualnamesresults = [];
var attempts = 0;

function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//insert saved data into local storage
function store(){
	var storename = 'sf2namegenerator';
	var tostore = {};
	tostore.actualnamesresults = actualnamesresults;
	tostore.attempts = attempts;
	localStorage.setItem(storename, JSON.stringify(tostore));
}

//retrieve relevant values from local storage and set, called on page load
function readStore(){
	var storename = 'sf2namegenerator';
	var stored = localStorage.getItem(storename);
	if(stored !== null){
		stored = JSON.parse(stored);
		actualnamesresults = stored.actualnamesresults;
		attempts = stored.attempts;
		$('#attempts').html(attempts);
		$('#score').html(actualnamesresults.length);
	}
}

function generateName(){
	var startword = startwords.slice();
	var numberword = numberwords.slice();
	var middleword = middlewords.slice();
	var endword = endwords.slice();

	//include silly words
	if(!$('input[name="realistic"]:checked').length){
		startword = startword.concat(startwordssilly);
		numberword = numberword.concat(numberwordssilly);
		middleword = middleword.concat(middlewordssilly);
		endword = endword.concat(endwordssilly);
	}

	var middle = '';
	var tmpwords = middleword.slice();
	var nummiddlewords = randomInt(0,Math.min(tmpwords.length,3));
	var wordindex = 0;

	while(nummiddlewords > 0){
		wordindex = randomInt(0,tmpwords.length - 1);
		middle += tmpwords[wordindex] + ' ';
		tmpwords.splice(wordindex,1);
		nummiddlewords--;
	}
	var str = startword[randomInt(0,startword.length - 1)] + ' ' + nameword + ' ' + numberword[randomInt(0,numberword.length - 1)] + ' ' + middle + ' ' + endword[randomInt(0,endword.length - 1)];
	str = str.replace(/\s{2,}/g, ' '); //clear out any double spaces
	var found = actualnames.indexOf(str);

	if(found !== -1){
		if(actualnamesresults.indexOf(found) === -1){
			actualnamesresults.push(found);
		}
	}

	attempts++; //keep a count of how many times you've clicked the button
	$('#attempts').html(attempts);
	$('#score').html(actualnamesresults.length);
	store();
	$('#generated').html(str);
}

$(document).ready(function(){
	readStore();
	$('#generate').on('click',function(e){
		e.preventDefault();
		generateName();
	});
});
