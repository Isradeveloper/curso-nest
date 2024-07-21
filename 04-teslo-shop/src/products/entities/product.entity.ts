import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('float', { default: 0 })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('text', { unique: true })
  slug: string;

  @Column('int', { default: 0 })
  stock: number;

  @Column('text', { array: true })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .normalize('NFD') // Normaliza caracteres a su forma descompuesta
      .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos (acentos)
      .toLowerCase()
      .trim() // Elimina espacios en blanco al principio y al final
      .replace(/[^a-z0-9 ]/g, '') // Elimina caracteres que no sean letras, números ni espacios
      .replaceAll(' ', '_'); // Reemplaza espacios con guiones bajos
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .normalize('NFD') // Normaliza caracteres a su forma descompuesta
      .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos (acentos)
      .toLowerCase()
      .trim() // Elimina espacios en blanco al principio y al final
      .replace(/[^a-z0-9 ]/g, '') // Elimina caracteres que no sean letras, números ni espacios
      .replaceAll(' ', '_'); // Reemplaza espacios con guiones bajos
  }
}
