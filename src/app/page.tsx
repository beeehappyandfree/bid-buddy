import { database } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { revalidatePath } from "../../node_modules/next/cache";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth";


export default async function HomePage() {
  const allItem = await database.query.items.findMany();
  const session = await auth();
  
  return (
    <main className="container mx-auto py-12">
      { session ? <SignOut /> : <SignIn /> }
      
      { session?.user?.name }
      
      <form action={async (formData: FormData)=> {
        "use server";
        // const bid = formData.get("bid") as string;
        await database.insert(items).values({
          name: formData.get("name") as string,
          userId: session?.user?.id!
        });
        revalidatePath("/")
      }}>
        <Input name="name" placeholder="Place your item"/>
        <Button type="submit">Post Item</Button>
      </form>

      {allItem.map((item) => (
        <div key={item.id} className="text-cyan-400">
          {item.name}
        </div>
      ))}
      
    </main>
  );
}
