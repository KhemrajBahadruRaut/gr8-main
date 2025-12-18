"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Admin_Main_Page from "./components/adminMainPage/Admin_Main_Page";

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost/gr8/api/auth/check.php", {
          credentials: "include",
        });

        if (res.ok) {
          setAuthenticated(true); 
        } else {
          router.replace("/admin/login"); 
        }
      } catch {
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!authenticated) return null; 

  return <Admin_Main_Page />; 
}
