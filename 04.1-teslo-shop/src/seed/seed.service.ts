import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData, SeedProduct } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async runSeed() {
    await this.insertNewProducts();
    return { message: 'SEED EXECUTED' };
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises: Promise<
      | {
          images: string[];
          id: string;
          title: string;
          price: number;
          description: string;
          slug: string;
          stock: number;
          sizes: string[];
          gender: string;
          tags: string[];
        }
      | undefined
    >[] = [];

    products.forEach((product) => {
      insertPromises.push(this.productService.create(product));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
