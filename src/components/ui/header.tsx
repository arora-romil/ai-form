import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "./button";
import Image from "next/image";
import Link from "next/link";
import { ThemeChange } from "./ThemeChange";
import { LayoutDashboard } from "lucide-react";
import { LogOut } from "lucide-react";

type Props = {};

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">
        <LogOut className="md:hidden" />
        <span className="hidden md:block">Sign out</span>
      </Button>
    </form>
  );
}

const Header = async (props: Props) => {
  const session = await auth();

  return (
    <header className="border bottom-1">
      <nav className="border-gray-200 px-4 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/">
            <h1 className="md:text-2xl lg:text-2xl">AI Form Builder</h1>
          </Link>
          <div className="flex items-center gap-1 md:gap-1 lg:gap-4">
            <ThemeChange />
            <Link href="/view-forms">
              <Button variant="outline">
                <span className="hidden md:inline">Dashboard</span>{" "}
                <LayoutDashboard className="md:hidden" />
              </Button>
            </Link>
            {session?.user.name && session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={32}
                height={32}
                className="rounded-full hidden md:block"
              />
            )}
            <SignOut />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
