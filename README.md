<!-- @format -->

# PostFlow: A Modern Social Feed Application

!PostFlow Screenshot

PostFlow is a full-stack social feed application built with Next.js and Material-UI. It provides a dynamic and interactive platform for users to view, create, and engage with posts and comments. The application is designed to be performant and user-friendly, featuring a clean interface with both light and dark modes.

---

🌐 **Live Demo:** [PostFlow on Vercel](https://post-flow-social-application-kag353ml5.vercel.app/)  

📂 **Repository:** [GitHub Repo](https://github.com/Marwanatef96/PostFlow-Social-Application)  

📑 **API Documentation:** [Postman Docs](https://documenter.getpostman.com/view/4696539/2s83zjqN3F)

---

## ✨ Features

-   **Full CRUD for Posts:** Authenticated users can Create, Read, Update, and Delete their own posts.
-   **Infinite Scrolling:** The main feed automatically loads more posts as the user scrolls down, providing a seamless browsing experience.
-   **User Authentication:** Secure login and registration functionality allows users to manage their own content.
-   **Interactive Comment System:** Users can view and add comments to posts. The system uses optimistic UI updates for a fast, responsive feel when submitting new comments.
-   **Light & Dark Mode:** A theme toggle in the navigation bar allows users to switch between light and dark modes, with preferences saved across sessions.
-   **Responsive Design:** The UI is fully responsive and optimized for a great experience on both desktop and mobile devices.
-   **Performance Optimizations:**
    -   **Dynamic Loading:** Components like authentication modals and comment sections are lazy-loaded to improve initial page load times.
    -   **Optimized Images:** Utilizes `next/image` for automatic image optimization, lazy loading, and modern format delivery (e.g., WebP).
    -   **Memoization:** Prevents unnecessary re-renders of components in lists.
-   **Form Handling & Validation:** Robust form management for user registration using `react-hook-form`.

## 🛠️ Tech Stack

-   **Framework:** Next.js 14 (with App Router)
-   **UI Library:** Material-UI (MUI)
-   **Data Fetching:** SWR for client-side data fetching, caching, and revalidation.
-   **Styling:** Global CSS with CSS Variables for theming, and CSS Modules for component-level styles.
-   **Form Management:** React Hook Form
-   **Deployment:** Ready for deployment on platforms like Vercel.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [Link to your GitHub repository]
    cd my-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the necessary environment variables. The application expects an API endpoint to fetch data from.

    ```env
    NEXT_PUBLIC_API_BASE_URL=http://your-api-endpoint.com/api
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open http://localhost:3000 with your browser to see the result.

## 📂 Project Structure

The project follows the standard Next.js App Router structure.

```
/app
├── api/                  # API Routes (Route Handlers)
├── components/           # Reusable React components
│   ├── Auth/             # Authentication components (LoginForm, RegisterModal)
│   ├── Post/             # Post-related components (PostCard, CommentSection)
│   ├── Skeletons/        # Loading skeletons for UI elements
│   └── core/             # Core layout components (Navbar, ThemeRegistry)
├── lib/                  # Core logic, hooks, and context
│   ├── ThemeContext.js   # Context for managing light/dark mode
│   └── hooks/            # Custom hooks for authentication and data fetching (SWR)
├── layout.js             # Root layout
└── page.js               # Main homepage
```

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.
#
