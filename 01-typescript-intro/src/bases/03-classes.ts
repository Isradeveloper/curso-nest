// export class Pokemon {
//   public id: number;
//   public name: string;

//   constructor(id: number, name: string) {
//     this.id = id;
//     this.name = name;
//     console.log("Constructor llamado");
//   }
// }

import axios from "axios";
import {
  Move,
  PokeapiResponse,
} from "../interfaces/pokeapi-response.interface";

export class Pokemon {
  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  constructor(public readonly id: number, public name: string) {
    console.log("Constructor llamado");
  }

  public scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name.toLowerCase()}`);
  }

  async getMoves(): Promise<Move[]> {
    const { data } = await axios.get<PokeapiResponse>(
      `https://pokeapi.co/api/v2/pokemon/${this.id}`,
    );
    return data.moves;
  }
}

export const charmander = new Pokemon(4, "Charmander");

console.log(await charmander.getMoves());
