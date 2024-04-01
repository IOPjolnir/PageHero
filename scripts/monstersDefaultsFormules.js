export default function monsterDefaults(type, lvl) {
	lvl = Math.floor(lvl);
	const result = {};
	switch (type) {
		case "robber":
			result.healtPoints = 3 + lvl;
			result.minDamage = 1;
			result.maxDamage = Math.floor(1 + lvl / 2);
			result.missChance = 0;
			break;
		case "axeman":
			result.healtPoints = 2 + lvl;
			result.minDamage = 1 + Math.floor(lvl / 4);
			result.maxDamage = 2 + Math.floor(lvl / 4);
			result.missChance = 5;
			break;
		case "snake":
			const snakeMissChance = 3 + lvl * 2;
			result.healtPoints = 2 + lvl;
			result.minDamage = 1;
			result.maxDamage = 1 + Math.floor(lvl / 3);
			result.missChance = snakeMissChance > 80 ? 80 : snakeMissChance;
			break;
		case "titan":
			result.healtPoints = 3 + lvl * 2;
			result.minDamage = 0;
			result.maxDamage = 1 + Math.round(lvl / 3);
			result.missChance = 0;
			break;
		case "mage":
			result.healtPoints = 777;
			result.minDamage = 777;
			result.maxDamage = 777;
			result.missChance = 777;
			break;
		case "boss":
			result.healtPoints = 777;
			result.minDamage = 777;
			result.maxDamage = 777;
			result.missChance = 777;
			break;
	}
	return result;
}