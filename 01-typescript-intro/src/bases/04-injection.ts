import {
  HttpAdapter,
  PokeApiAdapter,
  PokeApiFetchAdapter,
} from "../api/pokeApi.adapter";
import { PokeapiResponse } from "../interfaces/pokeapi-response.interface";

export class Pokemon {
  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  constructor(
    public readonly id: number,
    public name: string,
    private readonly http: HttpAdapter,
  ) {
    console.log("Constructor llamado");
    // todo: Inyectar dependencias
  }

  public scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name.toLowerCase()}`);
  }

  async getMoves() {
    const data = await this.http.get<PokeapiResponse>(
      `https://pokeapi.co/api/v2/pokemon/${this.id}`,
    );
    return data.moves;
  }
}

const pokeApiAxios = new PokeApiAdapter();
const pokeApiFetch = new PokeApiFetchAdapter();

export const charmander = new Pokemon(4, "Charmander", pokeApiAxios);

console.log(await charmander.getMoves());
