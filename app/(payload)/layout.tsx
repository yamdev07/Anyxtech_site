import { redirect } from "next/navigation";

type Args = {
  children: React.ReactNode;
};

const Layout = ({ children }: Args) => {
  redirect("/dashboard/login");
};

export default Layout;
