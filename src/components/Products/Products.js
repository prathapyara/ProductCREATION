import React from 'react';
import ProductItem from './ProductItem/ProductItem';
import './Products.css';


const Products = (props) => (
  <React.Fragment>
    <section className="products">
      {props.products.map((p) => (
        <ProductItem
          key={p._id}
          id={p._id}
          title={p.name}
          text={p.description}
          price={p.price}
          imageUrl={p.image}
          onDelete={props.onDeleteProduct}
        />
      ))}
    </section>
    <section className="pagination">
      <ul>
        {Array.from({ length: props.pageNumber }).map((_, index) => (
          <li key={index} onClick={() => props.onPageChange(index + 1)}>
            {index + 1}
          </li>
        ))}
      </ul>
    </section>
  </React.Fragment>
);

export default Products;
