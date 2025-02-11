// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }

  attack() {
    return this.strength;
  }

  receiveDamage(damage) {
    this.health -= damage;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
  }

  receiveDamage(damage) {
    this.health -= damage;

    if (this.health > 0) {
      return `${this.name} has received ${damage} points of damage`;
    } else {
      return `${this.name} has died in act of combat`;
    }
  }

  battleCry() {
    return 'Odin Owns You All!';
  }
}

// Saxon
class Saxon extends Soldier {
  receiveDamage(damage) {
    this.health -= damage;
    if (this.health > 0) {
      return `A Saxon has received ${damage} points of damage`;
    } else {
      return `A Saxon has died in combat`;
    }
  }
}

// War
class War {
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = [];
  }

  addViking(viking) {
    this.vikingArmy.push(viking);
  }
  addSaxon(saxon) {
    this.saxonArmy.push(saxon);
  }

  vikingAttack() {
    const viking =
      this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
    const saxon =
      this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    const result = saxon.receiveDamage(viking.strength);
    if (saxon.health <= 0) {
      this.saxonArmy.splice(this.saxonArmy.indexOf(saxon), 1);
    }
    return result;
  }

  saxonAttack() {
    const viking =
      this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
    const saxon =
      this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    const result = viking.receiveDamage(saxon.strength);
    if (viking.health <= 0) {
      this.vikingArmy.splice(this.vikingArmy.indexOf(viking), 1);
    }
    return result;
  }

  showStatus() {
    if (!this.saxonArmy.length) {
      return 'Vikings have won the war of the century!';
    } else if (!this.vikingArmy.length) {
      return 'Saxons have fought for their lives and survived another day...';
    } else {
      return 'Vikings and Saxons are still in the thick of battle.';
    }
  }

  attack(army) {
    const viking =
      this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
    const saxon =
      this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    const result =
      army === 'viking'
        ? saxon.receiveDamage(viking.strength)
        : viking.receiveDamage(saxon.strength);
    if (viking.health <= 0) {
      this.vikingArmy.splice(this.vikingArmy.indexOf(viking), 1);
    } else if (saxon.health <= 0) {
      this.saxonArmy.splice(this.saxonArmy.indexOf(saxon), 1);
    }
    return result;
  }
}

const viking = new Viking('Harald', 100, 50);
const saxon = new Saxon(40, 20);
const war = new War();
war.addViking(viking);
war.addSaxon(saxon);

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}
