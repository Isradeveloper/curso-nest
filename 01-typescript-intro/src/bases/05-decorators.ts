class NewPokemon {
  constructor(public readonly id: number, public name: string) {}

  scream() {
    console.log(`NO QUIERO!!`);
  }

  speak() {
    console.log("no quiero hablar");
  }
}

const MyDecorator = () => {
  return (target: Function) => {
    
    // CAMBIA LA CLASE QUE SE VA A USAR
    return NewPokemon;
  };
};

@MyDecorator()
export class Pokemon {
  constructor(public readonly id: number, public name: string) {}

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}!`);
  }
}

export const charmander = new Pokemon(4, "charmander");

charmander.scream();
charmander.speak();
