import Sidebar from "./_components/UserSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
