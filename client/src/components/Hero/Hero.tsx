import Typewriter from "typewriter-effect";
import hero from "../../assets/hero/hero-svg.svg";
import SearchBar from "./SearchBar";

export default function Hero() {
  const heroText = [
    "for your passion",
    "for your career",
    "that inspire you",
    "for new perspectives",
    "for your success",
  ];

  return (
    <div
      id="hero"
      className="mt-8 flex min-h-screen flex-col px-2 md:mt-0 md:flex-row  md:px-0"
    >
      <div id="hero-left" className="flex w-full items-center ">
        <div id="hero-items" className="md:ml-10">
          <h1 className="px-2 font-oswald text-3xl font-bold md:mr-10 md:px-0 lg:text-4xl xl:mr-40 xl:text-5xl">
            Find professional Mentors{" "}
            <Typewriter
              options={{
                strings: heroText,
                autoStart: true,
                loop: true,
                deleteSpeed: 20,
                delay: 20,
              }}
            />
          </h1>
          <SearchBar />
        </div>
      </div>
      <div id="hero-right" className="flex w-full">
        <img className="min-w-full" src={hero} alt="" />
      </div>
    </div>
  );
}
