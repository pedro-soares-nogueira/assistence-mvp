import { handleSignIn, handleSignOut } from "@/actions";
import { auth, signIn, signOut } from "@/auth";

export default async function IsAuthenticatedButton() {
  const session = await auth();

  if (session?.user) {
    return (
      <form action={handleSignOut}>
        <button
          type="submit"
          className="flex items-center justify-center text-center bg-transparent font-bold text-[#222C60] rounded-[2px] py-[10px] px-[15px] text-sm"
        >
          Sair
        </button>
      </form>
    );
  }

  return (
    <form action={handleSignIn}>
      <button
        type="submit"
        className="flex items-center justify-center text-center bg-transparent font-bold text-[#222C60] rounded-[2px] py-[10px] px-[15px] text-sm"
      >
        Entrar
      </button>
    </form>
  );
}
