import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from 'src/app/model/hero.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: Product[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getAllProducts()
  }

  private readonly LOCAL_API = "http://localhost:8080";


  private getAllProducts() {
    return this.httpClient.get(`${this.LOCAL_API}/api/v1/products`).subscribe(
      (response: Product[]) => {
        this.products = response
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    );
  }

  product : Product = new Product()
  onSubmitToSaveProduct(product: Product) {
    console.log(product);
    // document.getElementById('add')
    return this.httpClient.post(`${this.LOCAL_API}/api/v1/products`, product).subscribe(
      (response: Product) => {
        this.getAllProducts()
        console.log("Saved product response: ", response);
        this.getAllProducts()
      }, (error) => {
        console.log(error);
      }
    );
  }


  onClickToViewProduct(product: Product) {
    console.log(product);
    return this.httpClient.post(`${this.LOCAL_API}/api/v1/products`, product).subscribe(
      (response: Product) => {
        this.getAllProducts()
        console.log("Saved product response: ", response);
        this.getAllProducts()
      }, (error) => {
        console.log(error);
      }
    );
  }

  editProduct : Product = new Product()
  onClickToUpdateProduct(product: Product) {
    console.log(product);
    return this.httpClient.put(`${this.LOCAL_API}/api/v1/products`, product).subscribe(
      (response: Product) => {
        this.getAllProducts()
        console.log("Saved product response: ", response);
        this.getAllProducts()
      }, (error) => {
        console.log(error);
      }
    );
  }

  public onOpenModal(product: Product, mode: string) {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'create-modal') {
      button.setAttribute('data-target', '#create-modal');
      console.log("click");
    }
    if (mode === 'view-modal') {
      button.setAttribute('data-target', '#view-modal');
    }
    if (mode === 'update-modal') {
      console.log(product);
      
      this.editProduct = product
      button.setAttribute('data-target', '#update-modal');
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', 'crud-modal');
    }

    container.appendChild(button);
    button.click();

  }

}
