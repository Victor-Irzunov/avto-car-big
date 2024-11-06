import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import CauruselSimilar from './CauruselSimilar';


const prisma = new PrismaClient();

async function getData(price, id) {
  try {
    const minPrice = price * 0.7;
    const maxPrice = price * 1.3;

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
    <section className='mt-8'>
      <div className='container mx-auto overflow-x-hidden'>
        <CauruselSimilar data={data} />
      </div>
    </section>
  );
}

export default SimilarCars;
