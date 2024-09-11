# Crave House

Crave House is a comprehensive web application for food enthusiasts, offering a community-driven recipe sharing platform, restaurant menu browsing, table reservations, and more. Built with modern web technologies, it provides a seamless experience for users to explore, share, and enjoy culinary delights.

## Features

- **Community Recipe Sharing**: Post and view recipes from users around the world
- **User Authentication**: Secure login system with Google Auth and email/password options
- **Menu Browsing**: Explore restaurant menu items and add them to your cart
- **Table Reservations**: Book tables at your favorite restaurants
- **Admin Dashboard**: Manage users, community members, subscriptions, feedback, reservations, and menu items
- **User Profiles**: Edit profiles, view bookmarks, and manage account settings
- **Social Features**: Invite friends, share recipes, and bookmark favorite dishes
- **Secure Payments**: Integrated Stripe payment system for smooth transactions

## Technologies Used

- **Frontend**:
  - Next.js (App Router)
  - TypeScript
  - Tailwind CSS
  - Redux (for state management)
  - shadcn/ui (for UI components)

- **Backend**:
  - Next.js API Routes
  - Prisma (ORM)
  - PostgreSQL (Database)
  - Supabase (for additional backend services)

- **Authentication**:
  - NextAuth.js
  - Google Authentication
  - bcrypt (for password hashing)

- **Payments**:
  - Stripe

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database
- Supabase account
- Google Cloud Console project (for Google Auth)
- Stripe account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/SyedHuzaifa417/crave-house.git
   cd crave-house
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   DATABASE_URL="your-postgresql-connection-string"
   NEXTAUTH_SECRET="your-nextauth-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
   ```

4. Set up the database:
   ```
   npx prisma migrate dev
   ```

5. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
crave-house/
├── app/
│   ├── api/
│   ├── (routes)/
│   └── layout.tsx
├── components/
├── lib/
├── prisma/
├── public/
├── styles/
├── types/
├── .env.local
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Stripe](https://stripe.com/)
- [NextAuth.js](https://next-auth.js.org/)
