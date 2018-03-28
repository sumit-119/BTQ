import { Product } from './../Models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[];
  filteredProducts: Product[] = [];
  category: string;
  constructor(route: ActivatedRoute, private productService: ProductService) { 
    productService.getAll().subscribe(products => {
      this.products = products;

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category)
      : this.products;
    });
  });
  }

}
