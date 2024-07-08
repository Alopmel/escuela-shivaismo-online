// import Navbar from "@/ui/portal/navbar/navbar";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div>
//       <Navbar />
//       <div>{children}</div>
//     </div>
//   );
// }

import HeaderMobile from "@/ui/portal/userprofile/header-mobile"
import SideNav from "@/ui/portal/userprofile/side-nav";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1">
        <HeaderMobile />
        {children}  
      </main>
    </div>
  );
}