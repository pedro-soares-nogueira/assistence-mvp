import { auth, signIn, signOut } from "@/auth";

export default async function IsAuthenticatedButton() {
  const session = await auth();

  if (session?.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          type="submit"
          className="flex items-center justify-center text-center bg-red-600 font-bold text-white rounded-[2px] py-[10px] px-[15px] text-sm"
        >
          Sair
        </button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="flex items-center justify-center text-center bg-green-600 font-bold text-white rounded-[2px] py-[10px] px-[15px] text-sm"
      >
        Entrar
      </button>
    </form>
  );
}
