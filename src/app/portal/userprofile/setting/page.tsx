import Image from "next/image";
import UpdateProfileForm from "@/ui/profile-settings/update-profile-form";
import UpdatePasswordForm from "@/ui/profile-settings/update-password-form";
import UpdateEmailForm from "@/ui/profile-settings/update-email-form";

export default function Profile() {
  return (
    <main>
      <div className="flex flex-col items-center justify-start p-5 fixed left-0 top-0 z-1000 h-full bg-transparent">
        <Image src="/logo_login.png" alt="Logo" width={100} height={100} priority className="mb-8" />
      </div>
      <h1
          style={{
            marginTop: '71px',
            marginLeft:'93px',
            textAlign: 'center',
            color: 'rgb(251 251 251)',
            fontSize: 41,
          }}
      >
          Modifica tus datos
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mr-4 ml-32">
          <UpdateProfileForm />
          <UpdatePasswordForm />
          <UpdateEmailForm />
      </div>
    </main>
  );
}