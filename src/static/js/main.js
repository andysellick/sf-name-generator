
var nameword = 'Street Fighter';

var startwords = [
'',
'hyper',
'super',
'turbo',
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
'fighting',
'world',
'warrior',
'champion',
'turbo',
'tournament',
'battle',
'anniversary',
'impact',
'remix',
];

var middlewordssilly = [
'punching',
'kicking',
'fisticuffs',
'slapface',
'slapfest',
'tickle',
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
'II',
'III',
'IV',
'EX',
'alpha',
'ultra',
'3D',
''
];

var numberwordssilly = [
'12',
'13',
'15',
'1000',
'2000',
'3000',
'360',
'One',
];

var endwords = [
'zero',
'edition',
'gold',
'HD',
'arcade',
'anthology',
''
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
];

function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

$(document).ready(function(){
	$('#generate').on('click',function(e){
		e.preventDefault();

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
		$('#generated').html(str);
	});
});
