import React, { Component } from 'react';
import axios from 'axios';

import Products from '../../components/Products/Products';

class ProductsPage extends Component {
  state = { isLoading: true, products: [] };
  componentDidMount() {
    this.fetchProduct();
  }

  productDeleteHandler = productId => {
    axios
      .delete('http://localhost:3100/products/' + productId)
      .then(result => {
       this.fetchProduct();
      })
      .catch(err => {
        this.props.onError(
          'Deleting the product failed. Please try again later'
        );
        console.log(err);
      });
  };

  fetchProduct=(index_pageNumber)=>{
    axios
      .get('http://localhost:3100/products',{params:{
        pageNumber:index_pageNumber || 1
      }})
      .then(productsResponse => {
        this.setState({ isLoading: false, products: productsResponse.data.products,pageNumber:productsResponse.data.pageNumbers});
      })
      .catch(err => {
        this.setState({ isLoading: false, products: [] });
        this.props.onError('Loading products failed. Please try again later');
        console.log(err);
      });
  }

  onPageChange=(index_pageNumber)=>{
    this.fetchProduct(index_pageNumber);
  }

  render() {
    let content = <p>Loading products...</p>;

    if (!this.state.isLoading && this.state.products.length > 0) {
      content = (
        <Products
          products={this.state.products}
          pageNumber={this.state.pageNumber}
          onDeleteProduct={this.productDeleteHandler}
          onPageChange={this.onPageChange}
        />
      );
    }
    if (!this.state.isLoading && this.state.products.length === 0) {
      content = <p>Found no products. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default ProductsPage;
