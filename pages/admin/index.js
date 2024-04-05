import { useEffect } from "react";
import { useRouter } from "next/router";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin"); // Redirect to AdminJS interface
  }, []);

  return null; // Render nothing on this page
};

export default AdminPage;
