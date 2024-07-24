import React, { ReactNode } from "react";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// import React, { ReactNode } from "react";

// interface LayoutProps {
//   children: ReactNode;
//   title: string;
// }

// const Layout: React.FC<LayoutProps> = ({ children, title }) => {
//   return (
//     <html lang="en">
//       <body>
//         <main className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="w-full max-w-md p-8 bg-white shadow-md rounded-btn">
//             {children}
//           </div>
//         </main>
//       </body>
//     </html>
//   );
// };

// export default Layout;

// import React, { ReactNode } from "react";
// import Head from "next/head";

// interface PageLayoutProps {
//   children: ReactNode;
//   title: string;
// }

// const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
//   return (
//     <>
//       <Head>
//         <title>{title} | Dev Links</title>
//       </Head>
//       <div className="text-center mb-8">
//         <h1 className="text-heading-m font-bold mb-2">{title}</h1>
//         {children}
//       </div>
//     </>
//   );
// };

// export default PageLayout;
