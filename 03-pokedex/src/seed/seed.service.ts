import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly httpService: HttpService,

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany();

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1000',
    );

    const pokemonToInsert: { name: string; number: number }[] = [];

    // const insertPromisesArray = [];

    // data.results.forEach((result) => {
    //   const name = result.name;
    //   const number = +result.url.split('/').at(-2);

    //   insertPromisesArray.push(this.pokemonModel.create({ name, number }));
    // });

    // await Promise.all(insertPromisesArray);

    data.results.forEach((result) => {
      const name = result.name;
      const number = +result.url.split('/').at(-2);

      pokemonToInsert.push({ name, number });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return data.results;
  }
}
