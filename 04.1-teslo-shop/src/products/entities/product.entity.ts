import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';
import { ProductImage } from './';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '12345678-1234-1234-1234-123456789012',
    description: 'Product ID',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Product title',
    required: true,
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    description: 'Product price',
    required: true,
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    description: 'Product description',
    required: false,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    description: 'Product slug',
    required: true,
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    description: 'Product stock',
    required: true,
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    description: 'Product sizes',
    required: true,
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    description: 'Product gender',
    required: true,
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    description: 'Product tags',
    required: false,
  })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @ApiProperty({
    description: 'Product images',
    required: false,
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
