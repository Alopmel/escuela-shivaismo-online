import Image from "next/image";
import UpdateProfileForm from "@/ui/profile-settings/update-profile-form";
import UpdatePasswordForm from "@/ui/profile-settings/update-password-form";
import UpdateEmailForm from "@/ui/profile-settings/update-email-form";

export default function Profile() {
  return (
    <>
      <h1 className="mt-28 md:mt-32 text-[31px] md:text-[41px] ml-12 md:ml-20 text-white">
          Modifica tus datos
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mr-4 ml-4 mt-2 md:ml-20">
          <UpdateProfileForm />
          <UpdatePasswordForm />
          <UpdateEmailForm />
      </div>
    </>
  );
}