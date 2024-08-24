import ImageSlideshow from "@/components/slideShow";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="flex flex-col md:flex-row gap-8 md:gap-12 mx-auto my-8 md:my-12 w-[95%] md:w-[90%] max-w-[75rem]">
        <div className="w-full md:w-[50%] lg:w-[30rem] h-[20rem] md:h-[25rem] lg:mr-14">
          <ImageSlideshow />
        </div>
        <div className="w-full md:w-[50%] flex flex-col justify-center">
          <div className="text-h1Text text-xl md:text-2xl text-balance">
            <h1 className="text-3xl md:text-4xl font-bold font-bodyFont mt-4 mb-6 md:mt-0 md:mb-9 tracking-[0.25rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
              Bringing Global Delights to Your Doorstep
            </h1>
            <p className="mb-6 md:mb-9">
              Discover flavors that take you around the world, one delicious
              dish at a time.
            </p>
          </div>
          <div className="text-xl md:text-2xl flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-9">
            <Link
              href="/community"
              className="inline-block text-food_yellow hover:text-orange-300"
            >
              Join the Community
            </Link>
            <Link
              href="/meals"
              className="inline-block w-max py-2 px-4 rounded-lg bg-gradient-to-r from-food_red to-food_yellow text-white font-bold no-underline hover:from-red-500 hover:to-orange-500"
            >
              Explore Meals
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="flex flex-col text-pText text-xl md:text-2xl max-w-[50rem] w-[95%] md:w-[90%] mx-auto my-8 text-center">
          <h2 className="text-2xl md:text-3xl mb-4">How it works</h2>
          <p className="mb-4">
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className="flex flex-col text-pText text-xl md:text-2xl max-w-[50rem] w-[95%] md:w-[90%] mx-auto my-8 text-center">
          <h2 className="text-2xl md:text-3xl mb-4">Why NextLevel Food?</h2>
          <p className="mb-4">
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
