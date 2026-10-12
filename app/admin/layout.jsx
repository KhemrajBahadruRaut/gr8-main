// app/admin/layout.js
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="h-full overflow-hidden bg-gray-100">
      <AntdRegistry>{children}</AntdRegistry>
    </div>
  );
}
