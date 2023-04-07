import { Reggae_One } from "@next/font/google";

const reggaeone = Reggae_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 relative">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
            <a href="https://flowbite.com" className="flex items-center">
              <img
                src="http://gakujo.info/sozai/shinobi.png"
                className="mr-0 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className={reggaeone.className}>
                <p className="self-center text-3xl whitespace-nowrap text-gray-800">
                  ビガミ シート
                </p>
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <a
                href="#"
                className="bg-green text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 flex items-center"
              >
                <img
                  src="https://kohacu.com/wp-content/uploads/2020/10/kohacu.com_samune_003117.png"
                  className="mr-1 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
                <p className={reggaeone.className}>新規作成</p>
              </a>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            ></div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <div className="bg-[url('/images/bg.jpg')] h-screen">
      </div>
    </div>
  );
}
