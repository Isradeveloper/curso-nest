import { FindManyOptions, Repository } from 'typeorm';
import { PaginationDto } from '../dtos/pagination.dto';
import { PaginationResponse } from '../interfaces';
import { ConfigService } from '@nestjs/config';

export class PaginationClass<T> {
  private readonly urlBase: string;

  constructor(
    private readonly repository: Repository<T>,
    private readonly env: ConfigService,
    private readonly endpoint: string,
  ) {
    this.urlBase = `${this.env.get('urlBase')}${endpoint}`;
  }

  async getPaginatedByORM(
    paginationDto: PaginationDto,
    options?: FindManyOptions<T>,
  ): Promise<PaginationResponse<T>> {
    let next: string | null, previous: string | null, order: string;
    const { page = 1, pageSize = 2, sort } = paginationDto;

    const paginatedOptions: FindManyOptions<T> = {
      skip: (page - 1) * pageSize,
      take: pageSize,
    };

    const [results, totalCount] = await this.repository.findAndCount({
      ...options,
      ...paginatedOptions,
    });

    const pages = Math.ceil(totalCount / pageSize);

    if (page < pages) {
      next = `${this.urlBase}?page=${page + 1}&pageSize=${pageSize}`;
    }

    if (page > 1) {
      previous = `${this.urlBase}?page=${page - 1}&pageSize=${pageSize}`;
    }

    return {
      totalCount,
      count: results.length,
      next,
      previous,
      results,
    };
  }
}
