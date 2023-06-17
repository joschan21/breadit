import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* feed */}

        {/* subreddit info */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <Icons.home className="w-4 h-4" />
              Home
            </p>
          </div>

          <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zin-500">
                Your personal reddit homepage. Come here to check in with your
                favourite communites.
              </p>
            </div>

            <Link
              href="/r/create"
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
            >
              Create a Community
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
