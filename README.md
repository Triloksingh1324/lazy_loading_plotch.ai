
# Lazy Loading Product List - React

A React app that implements lazy loading for displaying products. New products are dynamically fetched as the user scrolls.


## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/lazy-loading-product-list.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd lazy-loading-product-list
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the app locally:**

   ```bash
   npm start
   ```

   This will start the app at `http://localhost:3000`.

## Functionality Breakdown

- **Lazy Loading:** Products are loaded incrementally as the user scrolls down the page.
- **Loader:** A spinner is shown while products are being fetched from the API.
- **Error Handling:** If an API request fails, a friendly error message is displayed.

## Code Explanation

### `ProductCard` Component

This component renders individual product details:
- Product image, name, vendor, and discounted price.

### `LazyLoadingProductList` Component

Handles fetching, displaying, and lazy loading products.

- **`useEffect` Hooks**:
  - Fetch products on component mount and whenever products are updated.
  - Setup a scroll event listener to detect when to load more products.

- **`useCallback` Hook**:
  - `fetchProducts`: Fetches products from the API.
  - `loadMoreProducts`: Loads more products when scrolling near the bottom of the page.

### Styling

- **Grid Layout:** Uses CSS Grid to display products in 4-column layout.
- **Hover Effect:** On hover, product cards scale up slightly for a modern interactive feel.
- **Loader:** Custom spinner displayed when products are being loaded.

## Technologies Used

- **React**: For building the UI.
- **Axios**: For API requests.
- **CSS**: For styling the product grid, hover effect, and loader.

Feel free to adjust this template to your needs! Let me know if you'd like further customization.