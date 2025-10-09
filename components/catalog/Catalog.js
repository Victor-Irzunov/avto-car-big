// /components/catalog/Catalog.jsx — делаем «Подробнее» настоящей ссылкой
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import phoneNumbers from "@/config/config";

export const Catalog = ({ data, isAdmin }) => {
  const [visibleCars, setVisibleCars] = useState(6);
  const [openDropdown, setOpenDropdown] = useState(null);

  const loadMoreCars = () => setVisibleCars((v) => v + 6);
  const toggleDropdown = (carId) => setOpenDropdown(openDropdown === carId ? null : carId);

  return (
    <div className="sd:container mx-auto">
      <div className="grid sd:grid-cols-3 xz:grid-cols-1 sd:gap-8 xz:gap-2 mt-9">
        {data.slice(0, visibleCars).map((car) => (
          <article key={car.id} className="card bg-white rounded-3xl shadow-xl">
            <figure className="relative w-full h-[250px] overflow-hidden rounded-t-3xl">
              {isAdmin && (
                <span className="absolute top-2 z-20 right-2 text-primary text-[10px] flex justify-center items-center bg-white p-1 rounded-full w-6 h-6">
                  {car.id}
                </span>
              )}
              {car.vip && (
                <div className='absolute top-2 left-2 flex space-x-1'>
                  <Image src='/svg/fire.svg' alt='Горячее предложение' width={20} height={20} />
                </div>
              )}

              <div className="absolute bottom-1 left-1 flex space-x-1">
                <p className={`${car.vip ? 'block' : 'hidden'} uppercase text-[9px] text-primary bg-white py-0.5 px-1 rounded-sm`}>
                  рекомендуем
                </p>
                <div className='flex items-center space-x-1 bg-white py-0.5 px-1 rounded-sm'>
                  <Image src='/svg/check.svg' alt='Проведена диагностика' width={12} height={12} />
                  <p className='uppercase text-[9px] text-black'>диагностика</p>
                </div>
                <div className='flex items-center space-x-1 bg-white py-0.5 px-1 rounded-sm'>
                  <Image src='/svg/check.svg' alt='VIN' width={12} height={12} />
                  <p className='uppercase text-[9px] text-black'>VIN</p>
                </div>
              </div>

              <div className="carousel rounded-t-3xl w-full h-full">
                {JSON.parse(car.images).map((image, index) => (
                  <div key={index} className="carousel-item w-full mx-0.5">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${image.original}`}
                      alt={car.title}
                      className="w-full h-full object-cover"
                      width={250}
                      height={250}
                      unoptimized   // карточки тоже напрямую — быстрее и без ошибок
                    />
                  </div>
                ))}
              </div>

              <div className="absolute bottom-1 right-1">
                <Image src="/svg/left-right.svg" alt="Листайте фото" width={25} height={25} />
              </div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs flex space-x-1.5">
                <div className='text-black flex space-x-1'>
                  <Image src="/svg/check3.svg" alt="Лизинг" width={15} height={15} />
                  <p className='text-white'>Лизинг</p>
                </div>
                <div className='text-black flex space-x-1'>
                  <Image src="/svg/check3.svg" alt="Кредит" width={15} height={15} />
                  <p className='text-white'>Кредит</p>
                </div>
              </div>
            </figure>

            <div className="card-body sd:p-4 xz:p-2">
              <p className="text-info sd:text-lg xz:text-sm">
                <span className={`${car.vip ? 'text-primary' : ''}`}> {car.priceUSD} USD</span>{" "}
                <span className="font-semibold sd:text-xl xz:text-base">/ {car.priceBYN} BYN</span>
              </p>

              <h3 className="card-title text-secondary sd:text-base xz:text-base">{car.title}</h3>

              <ul className="text-[#333333] sd:text-sm xz:text-xs">
                <li className="flex justify-between mb-1"><span>Год</span><span>{car.year} г</span></li>
                <li className="flex justify-between mb-1"><span>Пробег</span><span>{car.mileage}</span></li>
                <li className="flex justify-between mb-1"><span>Тип двигателя</span><span>{car.engine}</span></li>
                <li className="flex justify-between mb-1"><span>Коробка передач</span><span>{car.transmission}</span></li>
              </ul>

              <div className="card-actions justify-between sd:px-0 xy:px-2">
                <div className="dropdown dropdown-top text-white">
                  <button
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); toggleDropdown(car.id); }}
                    className="btn btn-circle sd:btn-lg xz:btn-sm btn-outline btn-secondar phone-button"
                  >
                    <Image src="/svg/phone1.svg" alt="Телефон" width={25} height={25} className="sd:w-9 xz:w-5 sd:hover:invert animate-ringing2" />
                  </button>

                  {openDropdown === car.id && (
                    <div tabIndex={0} className="dropdown-content bg-[#2D3192] z-30 px-6 py-8 shadow-slate-400 w-[300px] text-center rounded-xl">
                      <div><Image src="/logo/logo2.webp" alt="Логотип" width={120} height={120} className="mx-auto" /></div>
                      <p className="text-xl">Мы в Минске</p>
                      <div className="mt-5">
                        <Image src="/svg/location-white.svg" alt="Адрес" width={30} height={30} className="mx-auto mb-2" />
                        <a href="https://yandex.by/maps/-/CDdkfUlz" target="_blank" className="mt-2 text-sm">
                          Минск, ул. Куйбышева 40, <br /> Паркинг 4 этаж
                        </a>
                      </div>
                      <div className="mt-5">
                        <Image src="/svg/phone-white.svg" alt="Телефон" width={25} height={25} className="mx-auto mb-2" />
                        <a href={`tel:${phoneNumbers.secondaryPhoneLink}`} className="font-light">{phoneNumbers.secondaryPhone} МТС</a>
                      </div>
                    </div>
                  )}
                </div>

                {/* ⬇️ Теперь «Подробнее» всегда ссылкой на канонический URL */}
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/catalog/${car.id}/${car.titleLink}`} className="btn sd:btn-lg xz:btn-sm btn-primary rounded-full sd:px-7 xz:px-2 sd:text-base xz:text-xs">
                  Подробнее
                </Link>
              </div>

              <div className='py-1.5 mt-1 flex flex-col items-center justify-center bg-gray-50 rounded-full'>
                <div className='flex items-center space-x-1'>
                  <Image src='/svg/check-green.svg' alt='Проверенный продавец' width={15} height={15} />
                  <p className='text-[#238657] text-xs'>Проверенный продавец</p>
                </div>
                <p className='text-[7px]'>автомобиль юридически чист</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleCars < data.length && (
        <div className="flex justify-center mt-8">
          <button onClick={loadMoreCars} className="btn btn-primary px-6 py-2 rounded-full">Ещё</button>
        </div>
      )}
    </div>
  );
};
