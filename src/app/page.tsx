import { redirect } from "next/navigation";

const AuthLayoutPage = () => {
  redirect("/auth/signin");
};

export default AuthLayoutPage;
