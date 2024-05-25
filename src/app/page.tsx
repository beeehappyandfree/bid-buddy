import { database } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
;
import { auth } from "@/auth";


export default async function HomePage() {
  const allItem = await database.query.items.findMany();
  const session = await auth();
  console.log(allItem);
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h2 className="text-4xl font-bold">
        Items for Sale
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {allItem.map((item) => (
          <div key={item.id} className="border p-8 rounded-xl">
            {item.name}
            starting price: $ {item.startingPrice / 100}
          </div>
        ))}
      </div>


    </main>
  );
}
