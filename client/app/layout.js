import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import QueryProvider from "@/app/components/QueryProvider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <QueryProvider>
        {children}
      </QueryProvider>
        </body>
    </html>
  );
}
