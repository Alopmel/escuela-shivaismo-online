import { AdminDashboard } from "@/ui/portal/adminprofile/admin-dashboard";
import { roboto } from "@/app/fonts";
export default function Dashboard() {
    return (
        <div className={`flex justify-center items-center min-h-screen w-full ${roboto.className}`}>
            <AdminDashboard />
        </div>
    );
}