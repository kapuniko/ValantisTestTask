# Valantis Product List

This is a React application designed to showcase a simple product listing with filtering and pagination functionalities. The application fetches product data from an API endpoint, allowing users to filter products by price, brand, and name. Pagination is implemented to manage large datasets efficiently.

## Features

- **Product List**: Display a list of products retrieved from an API.
- **Pagination**: Navigate through the product list using pagination controls.
- **Price Filter**: Filter products by price. Users can specify a price and view products matching that price.
- **Loading Indicator**: Show a loading indicator while fetching data from the API.
- **Duplicate Product Handling**: Handle cases where the API returns duplicate products with the same ID.

## Technologies

- **React**: Frontend library for building user interfaces.
- **JavaScript (ES6+)**: Programming language for building the application logic.

## Installation

1. Clone the repository.
2. Navigate to the project directory `cd valantis`.
3. Install dependencies with `npm install`.
4. Start the development server with `npm run start`.
5. The application will in your web browser at `http://localhost:3000`.

## Usage

1. After loading the application, the list of products will be displayed.
2. Use the pagination buttons to navigate between pages of products.
3. Enter a price in the filter input field and click "Filter" to filter products by price.
4. Enter a brand in the filter input field and click "Filter" to filter products by brand.
5. Enter a name in the filter input field and click "Filter" to filter products by name.
   Notification: the name should have entire coincidence to be found
4. Clear the filter by removing the price value and clicking "Filter" again.