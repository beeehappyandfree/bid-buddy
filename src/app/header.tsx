import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out"

export async function Header() {
    const session = await auth();
    return (
        <div className="bg-gray-100 py-4">
            <div className="container flex justify-between items-center">
                <div className="flex items-center gap-12">
                    <Link href="/" className="hover:underline flex items-center gap-2">
                        <Image src="/logo.png"
                            width="50"
                            height="50"
                            alt="Logo"
                        />
                        BidBuddy.com
                    </Link>
                    <div>
                        <Link href="/items/create" className="hover:underline flex items-center gap-2">
                            Auction  Item
                        </Link>
                    </div>
                </div>
                <div className="items-center gap-4 flex">
                    <div>
                        {session?.user?.name}
                    </div>
                    <div>
                        {session ? <SignOut /> : <SignIn />}
                    </div>
                </div>
            </div>
        </div>
    )
}