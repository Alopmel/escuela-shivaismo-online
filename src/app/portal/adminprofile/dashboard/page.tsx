//import { AdminDashboard } from "@/ui/portal/adminprofile/admin-dashboard";
import { roboto } from "@/app/fonts";
import FileUpload from "@/ui/portal/adminprofile/FileUpload";
export default function Dashboard() {
    return (
        <div className={`flex justify-center items-center min-h-screen w-full ml-5 mr-5 mt-10 md:ml-20 md:mr-20 md:mt-40 ${roboto.className}`}>
            <FileUpload />
        </div>
    );
}
