```md
# E-Commerce API Documentation

This is the documentation for the E-Commerce API, which provides endpoints for managing products, categories, users, orders, and more.

## API Endpoints

### Auth Routes

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in with user credentials.
- `POST /api/auth/forgotPassword`: Send a reset password email.
- `POST /api/auth/verifyResetCode`: Verify the password reset code.
- `PUT /api/auth/resetPassword`: Reset the user's password.

### User Routes

- `POST /api/users`: Create a new user.
- `GET /api/users`: Get all users.
- `GET /api/users/:id`: Get a specific user by ID.
- `PUT /api/users/:id`: Update a specific user by ID.
- `DELETE /api/users/:id`: Delete a specific user by ID.
- `GET /api/users/getMe`: Get logged-in user data.
- `PUT /api/users/updateMe`: Update logged-in user data.
- `PUT /api/users/changeMyPassword`: Change logged-in user's password.
- `DELETE /api/users/deleteMe`: Delete logged-in user's account.

### Category Routes

- `POST /api/categories`: Create a new category.
- `GET /api/categories`: Get all categories.
- `GET /api/categories/:id`: Get a specific category by ID.
- `PUT /api/categories/:id`: Update a specific category by ID.
- `DELETE /api/categories/:id`: Delete a specific category by ID.

### Product Routes

- `POST /api/products`: Create a new product.
- `GET /api/products`: Get all products.
- `GET /api/products/:id`: Get a specific product by ID.
- `PUT /api/products/:id`: Update a specific product by ID.
- `DELETE /api/products/:id`: Delete a specific product by ID.

### Order Routes

- `POST /api/orders`: Create a new order.
- `GET /api/orders`: Get all orders.
- `GET /api/orders/:id`: Get a specific order by ID.
- `PUT /api/orders/:id`: Update a specific order by ID.
- `DELETE /api/orders/:id`: Delete a specific order by ID.

### Review Routes

- `POST /api/reviews`: Create a new review.
- `GET /api/reviews`: Get all reviews.
- `GET /api/reviews/:id`: Get a specific review by ID.
- `PUT /api/reviews/:id`: Update a specific review by ID.
- `DELETE /api/reviews/:id`: Delete a specific review by ID.

### Wishlist Routes

- `POST /api/wishlist`: Add a product to the user's wishlist.
- `DELETE /api/wishlist/:productId`: Remove a product from the user's wishlist.

### Address Routes

- `POST /api/address`: Add a new address for the user.
- `GET /api/address`: Get all addresses for the logged-in user.
- `DELETE /api/address/:addressId`: Remove a specific address for the user.

### Coupon Routes

- `GET /api/coupons`: Get all coupons.
- `POST /api/coupons`: Create a new coupon.
- `GET /api/coupons/:id`: Get a specific coupon by ID.
- `PUT /api/coupons/:id`: Update a specific coupon by ID.
- `DELETE /api/coupons/:id`: Delete a specific coupon by ID.

## Error Handling

The API returns standardized error responses in the following format:

```json
{
  "status": "error",
  "message": "Error message"
}

## Security

The API implements the following security measures:

- Rate limiting: Requests are limited to a certain number per IP address to prevent abuse.
- Data sanitization: User input is sanitized to prevent NoSQL query injection and cross-site scripting (XSS) attacks.
- HTTP parameter pollution (HPP) prevention: Parameters are filtered to prevent parameter pollution attacks.
- CORS: Cross-Origin Resource Sharing is enabled with appropriate access controls.
- API keys: Certain routes are protected and require valid API keys for authentication and authorization.

## Mail Service

The API utilizes a mail service to send password reset tokens and welcome emails to users upon registration. The service is configured with the following settings:

- Host: `<your-email-host>`
- Port: `<your-email-port>`
- Username: `<your-email-username>`
- Password: `<your-email-password>`

Make sure to replace `<your-email-host>`, `<your-email-port>`, `<your-email-username>`, and `<your-email-password>` with your actual email service settings.

