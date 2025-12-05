# 🛍️ MarketHub - Your One-Stop E-commerce Solution

<div align="center">
  <h1>🛍️ MarketHub</h1>
  <h3>Your One-Stop E-commerce Solution</h3>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
  ![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)
  
  > A modern, scalable, and performant e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and enhanced with Tailwind CSS for a beautiful, responsive design.
</div>

## ✨ Why MarketHub?

MarketHub is designed to provide a seamless shopping experience with powerful features for both customers and administrators. Whether you're building an online store or learning full-stack development, MarketHub offers a robust foundation with modern best practices.

### 🚀 Key Features

| Feature                  | Description                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------- |
| ⚡ **Lightning Fast**    | Built with Vite for instant hot module replacement and optimized production builds |
| 🎨 **Beautiful UI**      | Stunning, responsive design powered by Tailwind CSS                                |
| � **Secure**             | JWT authentication, protected routes, and secure payment processing                |
| 🛒 **Full E-commerce**   | Product catalog, search, filters, cart, and checkout                               |
| � **Mobile-First**       | Fully responsive design that works on all devices                                  |
| � **Admin Dashboard**    | Manage products, orders, and users with ease                                       |
| 🔄 **Real-time Updates** | Instant UI updates with Redux state management                                     |

## 🛠 Technology Stack

### Frontend

| Technology      | Purpose                                       |
| --------------- | --------------------------------------------- |
| React 18        | Frontend library for building user interfaces |
| Vite            | Next-generation frontend tooling              |
| Tailwind CSS    | Utility-first CSS framework                   |
| Redux Toolkit   | State management                              |
| React Router    | Navigation and routing                        |
| Axios           | HTTP client for API requests                  |
| React Icons     | Popular icon library                          |
| React Hot Toast | Beautiful toast notifications                 |

### Backend

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Node.js    | JavaScript runtime        |
| Express.js | Web application framework |
| MongoDB    | NoSQL database            |
| Mongoose   | MongoDB object modeling   |
| JWT        | Authentication tokens     |
| Bcrypt     | Password hashing          |
| Multer     | File uploads              |
| Nodemailer | Email notifications       |

### Payment & Deployment

| Service        | Purpose                   |
| -------------- | ------------------------- |
| Stripe         | Secure payment processing |
| MongoDB Atlas  | Cloud database hosting    |
| Vercel/Netlify | Frontend deployment       |
| Render/Railway | Backend deployment        |

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16+ recommended)
- **npm** (v8+ recommended) or **yarn**
- **MongoDB** (Atlas or local instance)
- **Stripe** account for payments
- **Git** for version control

### 1. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/David-mwendwa/MarketHub.git
cd MarketHub
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration
nano .env

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
# From project root
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## ⚙️ Environment Configuration

### Backend (`.env`)

Create a `.env` file in the `backend` directory with these variables:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/markethub
# For MongoDB Atlas use:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/markethub?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=30d
COOKIE_EXPIRE=30

# Stripe Payments
STRIPE_API_KEY=sk_test_your_stripe_secret_key
STRIPE_API_VERSION=2022-11-15

# Email Configuration (for password reset, etc.)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password  # Use App Password for Gmail
SMTP_FROM_EMAIL=noreply@markethub.com

# Frontend URL (for CORS and redirects)
FRONTEND_URL=http://localhost:3000
```

### Frontend (`.env`)

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5001/api/v1

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key

# Environment
VITE_NODE_ENV=development
```

## 🛠 Development

### Common Commands

#### Backend

```bash
# Run in development mode with hot-reload
npm run dev

# Run production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

#### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

### Database Seeding

```bash
# From backend directory
npm run seeder
# or with custom count
NODE_ENV=development node seeder.js --import [count]
```

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**

   - Ensure MongoDB is running locally or your Atlas connection string is correct
   - Check if your IP is whitelisted in MongoDB Atlas

2. **Missing Environment Variables**

   - Verify all required `.env` variables are set
   - Restart the server after making changes to `.env`

3. **Port Already in Use**

   - Check if another process is using port 3000 or 5001
   - Use `lsof -i :<port>` to find and kill the process

4. **Module Not Found**
   - Run `npm install` in both frontend and backend directories
   - Delete `node_modules` and `package-lock.json` then reinstall

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow existing code style and patterns
- Use meaningful commit messages
- Update documentation when necessary
- Add tests for new features

## 📂 Project Structure

```
MarketHub/
├── backend/                 # Backend server
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── .env                # Environment variables
│   └── server.js           # Server entry point
│
└── frontend/               # Frontend application
    ├── public/             # Static files
    ├── src/
    │   ├── assets/         # Images, fonts, etc.
    │   ├── components/     # Reusable UI components
    │   │   ├── cart/       # Cart components
    │   │   ├── layout/     # Layout components
    │   │   ├── product/    # Product components
    │   │   └── user/       # User components
    │   ├── redux/          # Redux store and slices
    │   ├── utils/          # Utility functions
    │   ├── App.jsx         # Main App component
    │   └── main.jsx        # Entry point
    ├── .env                # Frontend environment variables
    ├── index.html          # HTML template
    └── vite.config.js      # Vite configuration
```

## 📦 Available Scripts

### Backend

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seeder` - Seed database with sample data
- `npm test` - Run tests

### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔄 Deployment

### Backend Deployment

1. Set up a MongoDB Atlas database
2. Configure environment variables in production
3. Deploy to your preferred hosting (Heroku, Render, Railway, etc.)

### Frontend Deployment

1. Update `VITE_API_BASE_URL` in `.env` to your production API URL
2. Build the app: `npm run build`
3. Deploy the `dist` folder to your hosting (Vercel, Netlify, etc.)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React
- [Redux Toolkit](https://redux-toolkit.js.org/) - Official Redux toolset
- [Stripe](https://stripe.com/) - Online payment processing
- [MongoDB](https://www.mongodb.com/) - NoSQL database
