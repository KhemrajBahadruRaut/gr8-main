// app/admin/layout.js
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="h-full overflow-hidden bg-gray-100">
      {children}
    </div>
  );
}
