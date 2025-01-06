
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const ProductCard = ({ product }) => {
  const imagePrefix = 'https://cdnaz.plotch.io/image/upload/w_300,h_300';
  return (
    <div className="product-card">
      <img
        src={`${imagePrefix}${product.imageUrl}`}
        alt={product.productName}
        className="product-image"
      />
      <h3>{product.productName}</h3>
      <p>Vendor: {product.vendorName}</p>
      <p>Price: ₹{product.discountedPrice}</p>
    </div>
  );
};

const LazyLoadingProductList = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true); 
  const [totalProducts, setTotalProducts] = useState(0); 

  const PRODUCTS_PER_VIEWPORT = 8;
  const INITIAL_FETCH_LIMIT = 48;

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(
        // 'https://api.jsonbin.io/v3/qs/677bd8a5ad19ca34f8e67639'
        'https://api.jsonbin.io/v3/b/677c28c9acd3cb34a8c51c84'
      );
      const newProducts = response.data.record.d.products;
      console.log('Fetched Products:', newProducts);

      // Track total number of products
      setTotalProducts(newProducts.length);

      // Set initial products with a limit
      const initialProducts = newProducts.slice(0, INITIAL_FETCH_LIMIT);
      setProducts(initialProducts);
      setVisibleProducts(initialProducts.slice(0, PRODUCTS_PER_VIEWPORT)); 

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Failed to load products. Please try again.');
      console.error('API Error:', err);
    }
  }, []);

  const loadMoreProducts = useCallback(() => {
    const nextOffset = offset + PRODUCTS_PER_VIEWPORT;

    if (nextOffset < totalProducts) {
      const newVisibleProducts = products.slice(0, nextOffset + PRODUCTS_PER_VIEWPORT);
      setVisibleProducts(newVisibleProducts);
      setOffset(nextOffset);
    console.log('Offset:', offset);
    console.log('Visible Products:', newVisibleProducts);
    } else {
      setHasMore(false); 
    }

    if (nextOffset >= products.length && hasMore) {
      fetchMoreProducts();
    }
  }, [offset, products, totalProducts, hasMore]);

  const fetchMoreProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://api.jsonbin.io/v3/b/677c28c9acd3cb34a8c51c84'
      );
      const newProducts = response.data.record.d.products;
      console.log('Fetched More Products:', newProducts);

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Failed to load more products. Please try again.');
      console.error('API Error:', err);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, [fetchProducts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreProducts(); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMoreProducts]);

  return (
    <div>
      <h1>Lazy Loading Product List</h1>
      <div className="product-grid">
        {visibleProducts.map((product, index) => (
          <ProductCard key={`${product.productId}-${index}`} product={product} />
        ))}
      </div>
      {loading && (
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {!hasMore && <p style={{ textAlign: 'center' }}>No more products available.</p>}
    </div>
  );
};

export default LazyLoadingProductList;
