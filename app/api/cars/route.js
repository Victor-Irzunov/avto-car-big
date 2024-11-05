import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

const prisma = new PrismaClient();


export async function POST(req) {
  try {
    const formData = await req.formData();
    const brandName = formData.get('brand');
    const modelName = formData.get('model');
    const generationName = formData.get('generation');

    // Получаем или создаем бренд, модель и поколение
    const brand = await prisma.brand.upsert({
      where: { name: brandName },
      update: {},
      create: { name: brandName },
    });
    
    let model = await prisma.model.findFirst({
      where: { name: modelName, brandId: brand.id },
    });
    if (!model) {
      model = await prisma.model.create({
        data: {
          name: modelName,
          brandId: brand.id,
        },
      });
    }

    let generation = await prisma.generation.findFirst({
      where: { name: generationName, modelId: model.id },
    });
    if (!generation) {
      generation = await prisma.generation.create({
        data: {
          name: generationName,
          modelId: model.id,
        },
      });
    }

    // Собираем данные автомобиля из formData
    const title = formData.get('title');
    const priceUSD = parseInt(formData.get('priceUSD'), 10);
    const priceBYN = parseInt(formData.get('priceBYN'), 10);
    const year = parseInt(formData.get('year'), 10);
    const engine = formData.get('engine');
    const transmission = formData.get('transmission');
    const bodyType = formData.get('bodyType');
    const drive = formData.get('drive');
    const description = formData.get('description');
    const salon = formData.get('salon');
    const material = formData.get('material');
    const titleLink = formData.get('titleLink');
    const engineCapacity = formData.get('engineCapacity');
    const mileage = formData.get('mileage');

    const climate = JSON.parse(formData.get('climate') || '[]').join(', ');
    const safety = JSON.parse(formData.get('safety') || '[]').join(', ');
    const airbags = JSON.parse(formData.get('airbags') || '[]').join(', ');
    const assistance = JSON.parse(formData.get('assistance') || '[]').join(', ');
    const exterior = JSON.parse(formData.get('exterior') || '[]').join(', ');
    const interior = JSON.parse(formData.get('interior') || '[]').join(', ');
    const lights = JSON.parse(formData.get('lights') || '[]').join(', ');
    const heating = JSON.parse(formData.get('heating') || '[]').join(', ');
    const multimedia = JSON.parse(formData.get('multimedia') || '[]').join(', ');
    const comfort = JSON.parse(formData.get('comfort') || '[]').join(', ');

    // Обрабатываем изображения
    const originalImages = formData.getAll('originalImages');
    const thumbnailImages = formData.getAll('thumbnailImages');
    const images = [];

    for (let i = 0; i < originalImages.length; i++) {
      const originalFile = originalImages[i];
      const thumbnailFile = thumbnailImages[i];

      if (originalFile instanceof File && thumbnailFile instanceof File) {
        const uniqueName = uuidv4();
        const originalName = `${uniqueName}.webp`;
        const thumbnailName = `thumb_${uniqueName}.webp`;

        const originalPath = path.join(process.cwd(), 'public/uploads', originalName);
        const thumbnailPath = path.join(process.cwd(), 'public/uploads', thumbnailName);

        await fs.writeFile(originalPath, Buffer.from(await originalFile.arrayBuffer()));
        await fs.writeFile(thumbnailPath, Buffer.from(await thumbnailFile.arrayBuffer()));

        images.push({
          original: originalName,
          thumbnail: thumbnailName,
        });
      }
    }

    // Создаем запись автомобиля и сохраняем изображения как JSON-строку
    const car = await prisma.car.create({
      data: {
        title,
        titleLink,
        mileage,
        engineCapacity,
        priceUSD,
        priceBYN,
        salon,
        year,
        engine,
        climate,
        material,
        transmission,
        bodyType,
        drive,
        description,
        brandId: brand.id,
        modelId: model.id,
        generationId: generation.id,
        images: JSON.stringify(images),  // Сохраняем изображения в виде JSON-строки
        safety,
        airbags,
        assistance,
        exterior,
        interior,
        lights,
        heating,
        multimedia,
        comfort,
      },
    });

    return NextResponse.json({ message: 'Машина успешно добавлена' });
  } catch (error) {
    console.error("Ошибка при обработке POST запроса:", error);
    return new NextResponse("Ошибка при добавлении машины", { status: 500 });
  }
}



export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      include: {
        brand: true,
        model: true,
        generation: true,
      },
    });

    return NextResponse.json({ cars });
  } catch (error) {
    console.error("Ошибка при получении данных об автомобилях:", error);
    return new NextResponse("Ошибка при получении данных об автомобилях", { status: 500 });
  }
}



export async function PUT(req) {
	try {
		const formData = await req.formData();
		const carId = parseInt(formData.get('carId'), 10);

		// Проверка существования машины
		const existingCar = await prisma.car.findUnique({
			where: { id: carId },
		});

		if (!existingCar) {
			return new NextResponse("Машина не найдена", { status: 404 });
		}

		// Получаем существующие изображения и парсим их
		const existingImagesData = JSON.parse(formData.get('existingImages') || '[]');

		// Сбор новых изображений из formData
		const newImages = [];
		const originalImages = formData.getAll('originalImages');
		const thumbnailImages = formData.getAll('thumbnailImages');

		for (let i = 0; i < originalImages.length; i++) {
			const originalFile = originalImages[i];
			const thumbnailFile = thumbnailImages[i];
			const uniqueName = uuidv4();

			if (originalFile instanceof File && thumbnailFile instanceof File) {
				const originalName = `${uniqueName}.webp`;
				const thumbnailName = `thumb_${uniqueName}.webp`;
				const originalPath = path.join(process.cwd(), 'public/uploads', originalName);
				const thumbnailPath = path.join(process.cwd(), 'public/uploads', thumbnailName);

				await fs.writeFile(originalPath, Buffer.from(await originalFile.arrayBuffer()));
				await fs.writeFile(thumbnailPath, Buffer.from(await thumbnailFile.arrayBuffer()));

				newImages.push({
					original: originalName,
					thumbnail: thumbnailName,
				});
			}
		}

		// Объединяем существующие изображения и новые для обновления
		const allImages = [...existingImagesData, ...newImages];

		// Обновляем данные автомобиля, включая объединенные изображения
		await prisma.car.update({
			where: { id: carId },
			data: {
				title: formData.get('title'),
				titleLink: formData.get('titleLink'),
				mileage: formData.get('mileage'),
				engineCapacity: formData.get('engineCapacity'),
				priceUSD: parseInt(formData.get('priceUSD'), 10),
				priceBYN: parseInt(formData.get('priceBYN'), 10),
				salon: formData.get('salon'),
				year: parseInt(formData.get('year'), 10),
				engine: formData.get('engine'),
				transmission: formData.get('transmission'),
				bodyType: formData.get('bodyType'),
				drive: formData.get('drive'),
				description: formData.get('description'),
				material: formData.get('material'),
				climate: formData.get('climate'),
				safety: formData.get('safety'),
				airbags: formData.get('airbags'),
				assistance: formData.get('assistance'),
				exterior: formData.get('exterior'),
				interior: formData.get('interior'),
				lights: formData.get('lights'),
				heating: formData.get('heating'),
				multimedia: formData.get('multimedia'),
				comfort: formData.get('comfort'),
				images: JSON.stringify(allImages), // Преобразуем объединенные изображения в JSON
			},
		});

		return NextResponse.json({ message: 'Машина успешно обновлена' });
	} catch (error) {
		console.error("Ошибка при обработке PUT запроса:", error);
		return new NextResponse("Ошибка при обновлении машины", { status: 500 });
	}
}







