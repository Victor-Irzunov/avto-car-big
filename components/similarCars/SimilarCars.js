import Image from "next/image";
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getData(price, id) {
  try {
    // Рассчитываем диапазон цен для поиска похожих автомобилей
    const minPrice = price * 0.7;
    const maxPrice = price * 1.3;

    // Получаем автомобили, цена которых попадает в указанный диапазон
    const cars = await prisma.car.findMany({
      where: {
        priceUSD: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    });

    if (!cars || cars.length === 0) {
      return new NextResponse("Автомобили похожие по цене не найдены", { status: 404 });
    }

    return cars;
  } catch (error) {
    console.error("Ошибка при получении данных об автомобилях:", error);
    return new NextResponse("Ошибка при получении данных об автомобилях", { status: 500 });
  }
}

const SimilarCars = async ({ price, id }) => {
  const data = await getData(price, id);

  if (!data) {
    return (
      <button className="btn">
        <span className="loading loading-spinner"></span>
        loading
      </button>
    );
  }

  return (
    <section className=''>
      <div className='container mx-auto overflow-x-hidden'>
        {/* <div className='grid sd:grid-cols-3 xz:grid-cols-2 sd:gap-8 xz:gap-2 mt-9'> */}
        <div className='carousel mt-9'>
          {data.map((car) => (
            // <article key={car.id} className="card bg-white rounded-2xl shadow-xl">
            <article key={car.id} className="carousel-item sd:w-1/3 xz:w-1/3 sd:mx-3 xz:mx-1 card bg-white rounded-2xl shadow-xl">
              <figure className="relative w-full sd:h-[250px] xz:h-[150px] overflow-hidden rounded-t-2xl">
                <div className="carousel rounded-t-2xl w-full h-full">
                  {JSON.parse(car.images).map((image, index) => (
                    <div key={index} className="carousel-item w-full mx-0.5">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${image.original}`}
                        alt={car.title}
                        className="w-full h-full object-cover"
                        // objectFit="cover"
                        width={250}
                        height={250}
                      />
                    </div>
                  ))}
                </div>
              </figure>
              <div className="card-body sd:p-4 xz:p-2">
                <p className='text-info sd:text-lg xz:text-sm'>
                  {car.priceUSD} USD <span className="font-semibold sd:text-xl xz:text-base">/ {car.priceBYN} BYN</span>
                </p>
                <h5 className="card-title text-secondary sd:text-base xz:text-sm">
                  {car.title}
                </h5>
                <ul className='text-[#333333] sd:text-sm xz:text-[9px] xy:text-[10px]'>
                  <li className='flex justify-between mb-1'>
                    <span>Год</span>
                    <span>{car.year} г</span>
                  </li>
                  <li className='flex justify-between mb-1'>
                    <span>Пробег</span>
                    <span>{car.mileage}</span>
                  </li>
                  <li className='flex justify-between mb-1'>
                    <span>Тип двигателя</span>
                    <span>{car.engine}</span>
                  </li>
                  <li className='flex justify-between mb-1'>
                    <span>Коробка передач</span>
                    <span>{car.transmission}</span>
                  </li>
                </ul>
                <div className="card-actions justify-between sd:px-0 xy:px-2">
                  <a href="tel:8029" className="btn btn-circle sd:btn-lg xz:btn-sm btn-outline btn-secondary">
                    <Image src='/svg/phone1.svg' alt='Телефон' width={25} height={25} className="sd:w-9 xz:w-5" />
                  </a>
                  <button className="btn sd:btn-lg xz:btn-sm btn-primary rounded-full sd:px-7 xz:px-2 sd:text-base xz:text-xs">
                    Подробнее
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SimilarCars;
