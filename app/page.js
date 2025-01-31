"use client"
import About from "@/components/MainSections/About";
import Otzyvy from "@/components/MainSections/Otzyvy";
import PodborAvto from "@/components/MainSections/PodborAvto";
import Works from "@/components/MainSections/Works";
import MapComp from "@/components/map/MapComp";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-svh">
      <div className='w-full bg-cover fon bg-center' />
      <section className={`relative mt-6 mb-8`}>
        <div className="sd:container mx-auto mb-10">
          <div
            className={`relative bg-[url('/fon/fon-catalog.webp')] bg-cover bg-center rounded-3xl sd:pt-12 xz:pt-6 pb-10 px-8 before:absolute before:inset-0 before:bg-black before:opacity-40 before:rounded-3xl`}
          >
            <div className="relative z-10">
              <Image
                src="/logo/logo.webp"
                alt="Логотип - авто в кредит и лизинг"
                width={230} height={230}
                className="sd:w-[230px] xz:w-[150px]"
              />
            </div>
            <div className="relative z-10 mt-6 text-center">
              <h1 className='sd:text-7xl xz:text-3xl font-bold uppercase text-white'>
                <span className="text-primary">
                  Авто
                </span>{' '}<span className="">в Лизинг </span> <span className="block sd:mt-6 xz:mt-2">и  <span className="text-[#0000FF] bg-[#D0D0D2] rounded-3xl py-1 px-2">кредит</span></span>
              </h1>
              <h2 className="sd:text-4xl xz:text-xl mt-8 uppercase text-white text-shadow">
                <span className="">
                  Выкупаем и продаем автомобили в кредит и лизинг в Беларуси
                </span>{' '}
                <span className="block mt-3">
                  Комиссионная продажа. Свой паркинг.
                </span>
              </h2>

              <p className="sd:block xz:hidden mt-7">
                Добро пожаловать в автохаус **АвтоКар.by** – компанию, где рады каждому автовладельцу и его автомобилю! Приглашаем вас посетить наш офис и выставочный паркинг с автомобилями в наличии по адресу: г. Минск, ул. Куйбышева, 40 (Паркинг, 4 этаж). Время работы: с 10:00 до 20:00. Воскресенье — выходной. Всегда рады видеть вас!
              </p>

              <div className='grid sd:grid-cols-3 xz:grid-cols-1 gap-6 mt-8'>

                <div className=''>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/catalog/`}
                    className=""
                  >
                    <button className="btn btn-primary btn-circle w-full text-white text-lg">
                      Каталог автомобилей
                    </button>
                  </Link>
                </div>

                <div className='relative'>
                  <Image
                    src='/svg/percentage2.svg'
                    alt=' Кредитный калькулятор'
                    width={40} height={40}
                    className="absolute -top-4 right-0"
                  />
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/credit/`}
                    className=""
                  >
                    <button className="btn bg-white border-white hover:bg-slate-100 btn-circle w-full text-black text-lg">
                      Кредитный калькулятор
                    </button>
                  </Link>
                </div>

                <div className=''>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/lizing/`}
                    className=""
                  >
                    <button className="btn btn-primary btn-circle w-full text-white text-lg">
                      Лизинговый калькулятор
                    </button>
                  </Link>
                </div>

              </div>

              <p className='sd:text-xl xz:text-base uppercase font-semibold text-white sd:mt-16 xz:mt-6'>
                Официальное кредитование через банк
              </p>
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
