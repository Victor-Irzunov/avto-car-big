import About from "@/components/MainSections/About";
import phoneNumbers from "@/config/config";
import Otzyvy from "@/components/MainSections/Otzyvy";
import PodborAvto from "@/components/MainSections/PodborAvto";
import Works from "@/components/MainSections/Works";
import MapComp from "@/components/map/MapComp";
import Image from "next/image";


export default function Home() {
  return (
    <main className="min-h-svh">
      <div className='w-full bg-cover fon bg-center' />
      <section className={`sd:block xz:hidden relative -mt-2`}>
        <div className='container mx-auto'>
          <div className={`bg-[url('/fon/fon2.webp')] bg-cover rounded-3xl pt-24 pb-32 px-8`}>
            <div className=''>
              <Image
                src='/logo/logo.webp'
                alt='Логотип - авто в кредит и лизинг'
                width={230} height={230}
              />
            </div>
            <div className='mt-20'>
              <h1 className='text-7xl font-bold uppercase text-white'>
                <span className="text-primary">
                  Авто
                </span>{' '}<span className="">в Лизинг </span> <span className="block mt-7">и  <span className="text-[#0000FF] bg-[#D0D0D2] rounded-3xl py-1 px-2">кредит</span></span>
              </h1>
              <div className='flex sd:flex-row xz:flex-col justify-between mt-20 pr-10'>
                <p className='text-xl uppercase font-semibold text-white'>
                  Официальное кредитование через банк
                </p>
                <a href={`tel:${phoneNumbers.mainPhoneLink}`} className="btn text-lg px-10 rounded-full bg-[#D0D0D2] border-none text-[#636363]">
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PodborAvto />

      <Works />

      <About />

      <Otzyvy />

      <MapComp />
    </main>
  );
}
