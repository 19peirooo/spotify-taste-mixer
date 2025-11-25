import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

export default function DashboardLayout({ children }) {

  return (
    <>
        <Header title="Dashboard"></Header>
        <NavBar></NavBar>
        { children }
    </>
  );
}
