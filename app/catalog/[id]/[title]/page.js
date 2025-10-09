import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import phoneNumbers from '@/config/config';
import { prisma } from '@/lib/prisma';
import SimilarCars from '@/components/similarCars/SimilarCars';
import PhoneBottom from '@/components/phoneBotton/PhoneBottom';

// Клиентские виджеты
const GalleryComponent = dynamic(() => import('@/components/GalleryComponent/GalleryComponent'), { ssr: false });
const MapComp = dynamic(() => import('@/components/map/MapComp'), { ssr: false });

// --- Data layer ---
async function getData(id) {
  const car = await prisma.car.findUnique({
    where: { id: parseInt(id, 10) },
    include: { brand: true, model: true, generation: true },
  });
  if (!car) notFound();
  return car;
}

// Лёгкий запрос только для мета
async function getMeta(id) {
  const car = await prisma.car.findUnique({
    where: { id: parseInt(id, 10) },
    select: { title: true, titleLink: true },
  });
  if (!car) notFound();
  return car;
}

// --- SEO ---
export async function generateMetadata({ params }) {
  try {
    const car = await getMeta(params.id);
    const title = `${car.title} купить в Минске: Лизинг и Кредит | Автосалон «AvtoCar»`;
    const description = `ᐈ ⭐ ${car.title} в прекрасном состоянии. Кредит и лизинг на б/у авто. Звоните!`;
    const canonical = `/catalog/${params.id}/${car.titleLink}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: 'website',
        images: ['/fon/fon6.webp'],
      },
    };
  } catch {
    return { title: 'Автомобиль не найден', robots: { index: false } };
  }
}

// --- Page ---
export default async function Page({ params, searchParams }) {
  const data = await getData(params.id);

  // Если slug не совпал — редиректим на канонический URL
  if (params.title && params.title !== data.titleLink) {
    redirect(`/catalog/${params.id}/${data.titleLink}`);
  }

  const lite = 'lite' in (searchParams || {});

  return (
    <main className='sd:py-20 xz:py-7 min-h-screen sd:mt-0 xz:mt-24'>
      <div className='w-full bg-cover fon bg-center' />
      <section className='relative'>
        <div className='container mx-auto'>
          <div className='grid sd:grid-cols-3 xz:grid-cols-1 gap-4'>

            {/* Левая (основная) колонка */}
            <div className='sd:col-span-2 xz:col-span-1 bg-white/85 rounded-3xl sd:py-8 xz:py-5 sd:px-10 xz:px-2 text-secondary'>
              <h1 className='sd:text-3xl xz:text-xl font-semibold uppercase px-2'>
                Продажа {data.title}, {data.year}
                <span className="lowercase">г.</span>
              </h1>
              <p className='pl-2 text-gray-400 text-xs uppercase'>id: {data.id}</p>

              <GalleryComponent images={JSON.parse(data.images)} title={data.title} />

              {/* Блок цены и кратких хар-к — для мобилы */}
              <article className='sd:hidden xz:block mt-12'>
                <div className="text-xs flex justify-end space-x-1.5 mb-1">
                  <div className='text-black flex space-x-1'>
                    <Image src="/svg/check.svg" alt="Лизинг" width={15} height={15} />
                    <p>Лизинг</p>
                  </div>
                  <div className='text-black flex space-x-1'>
                    <Image src="/svg/check.svg" alt="Кредит" width={15} height={15} />
                    <p>Кредит</p>
                  </div>
                </div>
                <p className='text-3xl font-semibold text-secondary text-right'>{data.priceBYN} BYN</p>
                <p className='text-[#2D3192] text-right text-xl'>{data.priceUSD} USD</p>

                <h2 className='text-xl text-secondary font-semibold text-center mt-5'>Характеристики</h2>
                <ul className='text-[#333333] text-sm mt-4'>
                  <li className='flex justify-between mb-1'><span>Год</span><span className="text-secondary">{data.year} г</span></li>
                  <li className='flex justify-between mb-1'><span>Пробег</span><span className="text-secondary">{data.mileage}</span></li>
                  <li className='flex justify-between mb-1'><span>Тип двигателя</span><span className="text-secondary">{data.engine}</span></li>
                  <li className='flex justify-between mb-1'><span>Коробка передач</span><span className="text-secondary">{data.transmission}</span></li>
                  <li className='flex justify-between mb-1'><span>Объём двигателя</span><span className="text-secondary">{data.engineCapacity}</span></li>
                  <li className='flex justify-between mb-1'><span>Привод</span><span className="text-secondary">{data.drive}</span></li>
                </ul>
              </article>

              {/* Описание и CTA */}
              <article className='sd:mt-12 xz:mt-7'>
                <h2 className='sd:text-2xl xz:text-lg font-semibold'>Описание</h2>
                <div className='space-y-2 mt-3 sd:text-base xz:text-sm'>
                  {data.description.split('.').map((s, i) =>
                    s.trim() ? <p key={i} className='leading-relaxed'>{s.trim()}.</p> : null
                  )}
                </div>

                <div className='grid sd:grid-cols-3 xz:grid-cols-1 gap-8 mt-8'>
                  <p className='text-[10px]'>
                    ООО «АнтВентГолд». УНП: 193614538. г. Минск,
                    ул. пер. С. Ковалевской, д.54 к.1 каб.303-106
                  </p>

                  <div className='xz:w-full sd:w-auto flex sd:flex-row xz:flex-col justify-end sd:space-x-4 xz:space-x-0 sd:space-y-0 xz:space-y-3 col-span-2'>
                    <div className="dropdown dropdown-top dropdown-end text-white">
                      <button tabIndex={0} className="btn btn-outline btn-secondary px-10 rounded-full w-full">
                        <svg className="w-6 h-6 animate-ringing" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.1-.23 11.36 11.36 0 003.55.57 1 1 0 011 1v3.55a1 1 0 01-1 1A19.94 19.94 0 012 4a1 1 0 011-1h3.55a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.23 1.1z"></path>
                        </svg>
                        Позвонить
                      </button>
                      <div tabIndex={0} className="dropdown-content bg-[#2D3192] z-[1] px-6 py-8 shadow-slate-400 w-[300px] text-center rounded-xl">
                        <div><Image src='/logo/logo2.webp' alt='Логотип - продажа авто в кредит и лизинг' width={120} height={120} className="mx-auto" /></div>
                        <p className='text-xl'>Мы в Минске</p>
                        <div className='mt-5'>
                          <Image src='/svg/location-white.svg' alt='Адрес автосалона' width={30} height={30} className="mx-auto mb-2" />
                          <a href="https://yandex.by/maps/-/CDdkfUlz" target="_blank" className="mt-2 text-sm">
                            Минск, ул. Куйбышева 40, <br />Паркинг 4 этаж
                          </a>
                        </div>
                        <div className='mt-5'>
                          <Image src='/svg/phone-white.svg' alt='Телефон автосалона' width={25} height={25} className="mx-auto mb-2" />
                          <a href={`tel:${phoneNumbers.secondaryPhoneLink}`} className='font-light'>{phoneNumbers.secondaryPhone} МТС</a>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/credit/${data.id}/${data.titleLink}`}
                      prefetch
                      className="relative overflow-hidden xz:w-full sd:w-auto btn btn-primary text-secondary rounded-full text-lg"
                    >
                      Заявка на кредит
                      <span className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/0 transform translate-x-full animate-slide"></span>
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            {/* Правая колонка */}
            <article className='bg-white/85 rounded-3xl sd:py-8 xz:py-5 sd:px-10 xz:px-2'>
              <div>
                <div className='sd:block xz:hidden'>
                  <div className="text-xs flex justify-end space-x-1.5 mb-1">
                    <div className='text-black flex space-x-1'>
                      <Image src="/svg/check.svg" alt="Лизинг" width={15} height={15} />
                      <p>Лизинг</p>
                    </div>
                    <div className='text-black flex space-x-1'>
                      <Image src="/svg/check.svg" alt="Кредит" width={15} height={15} />
                      <p>Кредит</p>{/* ← Исправлено: правильный закрывающий тег */}
                    </div>
                  </div>
                  <p className='text-4xl font-semibold text-secondary text-right'>{data.priceBYN} BYN</p>
                  <p className='text-[#2D3192] text-right text-xl'>{data.priceUSD} USD</p>
                  <h2 className='text-xl text-secondary font-semibold text-center mt-5'>Характеристики</h2>

                  <div className='mt-4'>
                    <ul className='text-[#333333] text-sm '>
                      <li className='flex justify-between mb-1'><span>Год</span><span className="text-secondary">{data.year} г</span></li>
                      <li className='flex justify-between mb-1'><span>Пробег</span><span className="text-secondary">{data.mileage}</span></li>
                      <li className='flex justify-between mb-1'><span>Тип двигателя</span><span className="text-secondary">{data.engine}</span></li>
                      <li className='flex justify-between mb-1'><span>Коробка передач</span><span className="text-secondary">{data.transmission}</span></li>
                      <li className='flex justify-between mb-1'><span>Объём двигателя</span><span className="text-secondary">{data.engineCapacity}</span></li>
                      <li className='flex justify-between mb-1'><span>Привод</span><span className="text-secondary">{data.drive}</span></li>
                    </ul>
                  </div>
                </div>

                <h3 className='text-xl text-secondary font-semibold text-center mt-3'>Комплектация</h3>

                <div className='mt-4 text-sm text-[#333333] flex flex-col justify-between'>
                  <ul>
                    <li className={`mb-2 ${data.salon ? 'block' : 'hidden'}`}>
                      <span className="font-semibold">Салон:</span>
                      <span className="text-xs block mt-1 text-secondary/70">{data.salon?.split(',').join(' | ')}</span>
                    </li>
                    <li className={`mb-2 ${data.safety ? 'block' : 'hidden'}`}>
                      <span className="font-semibold">Системы безопасности:</span>
                      <span className="text-xs block mt-1 text-secondary/70">{data.safety?.split(',').join(' | ')}</span>
                    </li>
                    <li className={`mb-2 ${data.airbags ? 'block' : 'hidden'}`}>
                      <span className="font-semibold">Подушки:</span>
                      <span className="text-xs block mt-1 text-secondary/70">{data.airbags?.split(',').join(' | ')}</span>
                    </li>
                    <li className={`mb-2 ${data.assistance ? 'block' : 'hidden'}`}>
                      <span className="font-semibold">Ассистенты:</span>
                      <span className="text-xs block mt-1 text-secondary/70">{data.assistance?.split(',').join(' | ')}</span>
                    </li>
                    <li className={`mb-2 ${data.exterior ? 'block' : 'hidden'}`}>
                      <span className="font-semibold">Экстерьер:</span>
                      <span className="text-xs block mt-1 text-secondary/70">{data.exterior?.split(',').join(' | ')}</span>
                    </li>
                    <li className={`mb-2 ${data.interior ? 'block' : 'hidden'}`}>
                      <span className="font-semibold">Интерьер:</span>
                      <span className="text-xs block mt-1 text-secondary/70">{data.interior?.split(',').join(' | ')}</span>
                    </li>
                    <li className={`mb-2 ${data.lights ? 'block' : 'hidden'}`}>
                      <span className="font-semibold">Фары:</span>
                      <span className="text-xs block mt-1 text-secondary/70">{data.lights?.split(',').join(' | ')}</span>
                    </li>
                    <li className={`mb-2 ${data.climate ? 'block' : 'hidden'}`}>
                      <span className="font-semibold">Климат:</span>
                      <span className="text-xs block mt-1 text-secondary/70">{data.climate?.split(',').join(' | ')}</span>
                    </li>
                    <li className={`mb-2 ${data.heating ? 'block' : 'hidden'}`}>
                      <span className="font-semibold">Обогрев:</span>
                      <span className="text-xs block mt-1 text-secondary/70">{data.heating?.split(',').join(' | ')}</span>
                    </li>
                    <li className={`mb-2 ${data.multimedia ? 'block' : 'hidden'}`}>
                      <span className="font-semibold">Мультимедиа:</span>
                      <span className="text-xs block mt-1 text-secondary/70">{data.multimedia?.split(',').join(' | ')}</span>
                    </li>
                    <li className={`mb-2 ${data.comfort ? 'block' : 'hidden'}`}>
                      <span className="font-semibold">Комфорт:</span>
                      <span className="text-xs block mt-1 text-secondary/70">{data.comfort?.split(',').join(' | ')}</span>
                    </li>
                  </ul>

                  <div className='py-2 flex flex-col items-center justify-center h-full bg-gray-50 rounded-full mt-3'>
                    <div className='flex items-center space-x-1'>
                      <Image src='/svg/check-green.svg' alt='Проверенный продавец' width={20} height={20} />
                      <p className='text-[#238657] text-sm'>Проверенный продавец</p>
                    </div>
                    <p className='text-[9px]'>автомобиль юридически чист</p>
                  </div>
                </div>
              </div>
            </article>

          </div>

          {!lite && (
            <div className='bg-white/85 rounded-3xl sd:py-8 xz:py-5 sd:px-10 xz:px-2 text-secondary mt-14'>
              <SimilarCars price={data.priceUSD} id={data.id} year={data.year} />
            </div>
          )}

          <MapComp />
        </div>
      </section>

      <PhoneBottom />
    </main>
  );
}

// ISR/SSG — перевыдача раз в минуту
export const revalidate = 60;
