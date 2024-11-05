import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  const { brand, model, generation, yearFrom, yearTo, priceFrom, priceTo, currency } = await req.json();

  console.log('Данные с клиента:', brand, model, generation, yearFrom, yearTo, priceFrom, priceTo, currency);

  const formattedBrand = brand ? brand.replace(/-/g, ' ') : null;
  const formattedModel = model ? model.replace(/-/g, ' ') : null;
  const priceField = currency === 'USD' ? 'priceUSD' : 'priceBYN';

  // Условия запроса
  const queryConditions = [
    formattedBrand ? { brand: { name: formattedBrand } } : null,
    formattedModel ? { model: { name: formattedModel } } : null,
    generation ? { generation: { name: generation } } : null,
    (yearFrom || yearTo) ? {
      year: {
        ...(yearFrom ? { gte: parseInt(yearFrom, 10) } : {}),
        ...(yearTo ? { lte: parseInt(yearTo, 10) } : {}),
      },
    } : null,
    (priceFrom || priceTo) ? {
      [priceField]: {
        ...(priceFrom ? { gte: parseFloat(priceFrom) } : {}),
        ...(priceTo ? { lte: parseFloat(priceTo) } : {}),
      },
    } : null,
  ].filter(Boolean); // Удаляем пустые условия

  // Формируем запрос
  const query = {
    where: {
      AND: queryConditions
    },
  };

  console.log('Построенный запрос для поиска автомобилей:', JSON.stringify(query, null, 2));

  try {
    const cars = await prisma.car.findMany(query);
    console.log('Результат запроса:', cars);
    return NextResponse.json(cars);
  } catch (error) {
    console.error("Ошибка при фильтрации автомобилей:", error);
    return NextResponse.json({ error: "Ошибка при фильтрации автомобилей" }, { status: 500 });
  }
}
