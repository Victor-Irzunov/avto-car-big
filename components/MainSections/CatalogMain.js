import Image from "next/image";
import { DataCar } from "@/constans/CarData";
import Link from "next/link";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getData() {
	try {
		const data = await prisma.car.findMany({
			include: {
				brand: true,
				model: true,
				generation: true,
			},
		});
		if (!data || data.length === 0) {
			return [];
		} else if (!Array.isArray(data)) {
			return [data];
		}
		return data;
	} catch (error) {
		console.error("Ошибки при запросе:", error);
		throw error;
	}
}
export default async function CatalogMain() {
	const data = await getData()
	console.log("🚀 🚀 🚀  _ CatalogMain _ data:", data)

	return (
		<section className='sd:mt-16 xz:mt-10'>
			<div className='container mx-auto'>
				<div className=''>
					<h4 className='sd:block xz:hidden text-center text-5xl font-semibold uppercase text-[#12142B]'>
						Каталог Авто
					</h4>
					<div className='mt-6 xz:grid sd:hidden grid-cols-3 gap-1 px-3'>
						{DataCar.map((el) => (
							<div key={el.id} className=''>
								<h5 className='text-xs font-medium text-secondary'>{el.brand}</h5>
							</div>
						))}
					</div>
					<div className='grid sd:grid-cols-3 xz:grid-cols-1 sd:gap-8 xz:gap-4 mt-9'>
						{data.slice(0, 3).map((car) => (
							<article key={car.id} className="card bg-white rounded-3xl shadow-xl ">
								<figure className="relative w-full h-[250px] overflow-hidden rounded-t-3xl">
									<div className="carousel rounded-t-3xl w-full h-full">
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
									<div className='absolute bottom-1 right-1'>

										<Image src='/svg/left-right.svg' alt='Рука и палец для фото влево и вправо' width={25} height={25} className="opacity-90" />

									</div>
								</figure>
								<div className="card-body sd:p-4 xz:p-2">
									<p className='text-info sd:text-lg xz:text-sm'>
										{car.priceUSD} USD <span className="font-semibold sd:text-xl xz:text-base">/ {car.priceBYN} BYN</span>
									</p>
									<h5 className="card-title text-secondary sd:text-base xz:text-sm">
										{car.title}
									</h5>
									<ul className='text-[#333333] sd:text-sm xz:text-[10px]'>
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
										<Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/catalog/${car.id}/${car.titleLink}`}>
											<button className="btn sd:btn-lg xz:btn-sm btn-primary rounded-full sd:px-7 xz:px-2 sd:text-base xz:text-xs">
												Подробнее
											</button>
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>

				<div className='mt-8 flex justify-end'>
					<Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/catalog/`} className="text-[#4D4D4D] flex sd:text-xl xz:text-base">
						Перейти <Image src='/svg/arrow2.svg' alt="Перейти в каталог автомобилей" width={10} height={10} className="ml-1 pt-0.5" />
					</Link>
				</div>
			</div>
		</section>
	);
}

