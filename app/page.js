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
                <div className="dropdown dropdown-top dropdown-end">
                  <button tabIndex={0} className="btn text-lg px-10 rounded-full bg-[#D0D0D2] border-none text-[#636363]">
                    Позвонить
                  </button>
                  <div tabIndex={0} className={`dropdown-content bg-[#2D3192] z-[1] px-6 py-8 shadow-slate-400 w-[300px] text-center rounded-xl`}>
                    <div className=''>
                      <Image src='/logo/logo2.webp' alt='Логотип - продажа авто в кредит и лизинг' width={120} height={120} className="mx-auto" />
                    </div>
                    <p className='text-xl'>
                      Мы в Минске
                    </p>
                    <div className='mt-5'>
                      <Image src='/svg/location-white.svg' alt='Адрес автосалона' width={30} height={30} className="mx-auto mb-2" />
                      <a href="https://yandex.by/maps/-/CDdkfUlz" target="_blank" className="mt-2 text-sm">
                        Минск, ул. Куйбышева 40, <br />
                        Паркинг 4 этаж
                      </a>
                    </div>
                    <div className='mt-5'>
                      <Image src='/svg/phone-white.svg' alt='Телефон автосалона' width={25} height={25} className="mx-auto mb-2" />
                      <a href={`tel:${phoneNumbers.secondaryPhoneLink}`} className='font-light'>
                        {phoneNumbers.secondaryPhone} МТС
                      </a>
                      <a href={`tel:${phoneNumbers.mainPhoneLink}`} className='font-light mt-2 block'>
                        {phoneNumbers.mainPhone} A1
                      </a>
                    </div>
                  </div>
                </div>
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
