import GalleryComponent from "@/components/GalleryComponent/GalleryComponent"
import phoneNumbers from "@/config/config"
import MapComp from "@/components/map/MapComp"
import { NextResponse } from 'next/server';


import { PrismaClient } from '@prisma/client';
import Link from "next/link"
import SimilarCars from "@/components/similarCars/SimilarCars"

const prisma = new PrismaClient();

async function getData(id) {
	try {
		const car = await prisma.car.findUnique({
			where: { id: parseInt(id, 10) },
			include: {
				brand: true,
				model: true,
				generation: true,
			},
		});

		if (!car) {
			return new NextResponse("Автомобиль не найден", { status: 404 });
		}

		return car
	} catch (error) {
		console.error("Ошибка при получении данных об автомобиле:", error);
		return new NextResponse("Ошибка при получении данных об автомобиле", { status: 500 });
	}
}

export async function generateMetadata({ params: id }) {
	const data = await getData(id.id);
	const id1 = id.id

	let title1
	let description1

	if (data) {
		title1 = `${data.title} купить в Минске: Лизинг и Кредит | Автосалон «AvtoCar»`,
			description1 = `ᐈ ⭐ ${data.title} в прекрасном состоянии. Автосалон: Кредит и лизинг на б/у авто ➤➤➤ До 10 лет. ☎️ (33) 355-88-55 ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Офомление в день подачи ⭐ Без взоса ✓ Без справок и поручителей 🔥 Звоните прямо сейчас!`
	}
	return {
		title: title1,
		description: description1,
		keywords: ``,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/${id1}/${data.titleLink}`,
		},
		og: {
			title: title1,
			description: description1,
			type: 'website',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/${id1}/${data.titleLink}`,
			image: 'public/fon/fon6.webp',
		},
	};
}

export default async function page({ params: { id } }) {
	const data = await getData(id);

	if (!data) {
		return (
			<button className="btn">
				<span className="loading loading-spinner"></span>
				loading
			</button>
		)
	}

	return (
		<main className='py-20 min-h-screen'>
			<div className='w-full bg-cover fon bg-center' />
			<section className='relative'>
				<div className='container mx-auto'>

					<div className='grid sd:grid-cols-3 xz:grid-cols-1 gap-4'>

						<div className='sd:col-span-2 xz:col-span-1 bg-white/60 rounded-3xl sd:py-8 xz:py-5 sd:px-10 xz:px-2 text-secondary'>
							<h1 className='sd:text-3xl xz:text-xl font-semibold uppercase px-2'>
								Продажа {data.title}, {data.year}<span className="lowercase">г.</span>
							</h1>
							<GalleryComponent images={JSON.parse(data.images)} title={data.title} />

							<article className='sd:hidden xz:block mt-12'>
								<p className='text-3xl font-semibold text-secondary text-right'>
									{data.priceBYN} BYN
								</p>
								<p className='text-[#2D3192] text-right text-xl'>
									{data.priceUSD} USD
								</p>
								<h2 className='text-xl text-secondary font-semibold text-center mt-5'>
									Характеристики
								</h2>

								<ul className='text-[#333333] text-sm mt-4'>
									<li className='flex justify-between mb-1'>
										<span>Год</span>
										<span className="text-secondary">{data.year} г</span>
									</li>
									<li className='flex justify-between mb-1'>
										<span>Пробег</span>
										<span className="text-secondary">{data.mileage}</span>
									</li>
									<li className='flex justify-between mb-1'>
										<span>Тип двигателя</span>
										<span className="text-secondary">{data.engine}</span>
									</li>
									<li className='flex justify-between mb-1'>
										<span>Коробка передач</span>
										<span className="text-secondary">{data.transmission}</span>
									</li>
									<li className='flex justify-between mb-1'>
										<span>Объём двигателя</span>
										<span className="text-secondary">{data.engineCapacity}</span>
									</li>
									<li className='flex justify-between mb-1'>
										<span>Привод</span>
										<span className="text-secondary">{data.drive}</span>
									</li>
								</ul>
							</article>

							<article className='sd:mt-12 xz:mt-7'>
								<h2 className='sd:text-2xl xz:text-lg font-semibold'>
									Описание
								</h2>
								<div className='space-y-2 mt-3 sd:text-base xz:text-sm'>
									{data.description.split('.').map((sentence, index) => (
										sentence.trim() && (
											<p key={index} className='leading-relaxed'>
												{sentence.trim()}.
											</p>
										)
									))}
								</div>

								<div className='grid sd:grid-cols-3 xz:grid-cols-1 gap-8 mt-8'>

									<p className='text-[10px]'>
										ООО «АнтВентГолд». УНП: 193614538. г. Минск,
										ул. пер. С. Ковалевской, д.54 к.1 каб.303-106
									</p>

									<div className='xz:w-full sd:w-auto flex sd:flex-row xz:flex-col justify-end sd:space-x-4 xz:space-x-0 sd:space-y-0 xz:space-y-3 col-span-2'>
										<a href={`tel:${phoneNumbers.mainPhoneLink}`} className="btn btn-outline btn-secondary px-10 rounded-full">
											Позвонить
										</a>

										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/credit/${data.id}/${data.titleLink}`}
											className="xz:w-full sd:w-auto btn btn-primary text-secondary rounded-full text-lg"
										>
											Заявка на кредит
										</Link>
									</div>
								</div>
							</article>
						</div>

						<article className='bg-white/60 rounded-3xl sd:py-8 xz:py-5 sd:px-10 xz:px-2'>
							<div className=''>
								<div className='sd:block xz:hidden'>
									<p className='text-4xl font-semibold text-secondary text-right'>
										{data.priceBYN} BYN
									</p>
									<p className='text-[#2D3192] text-right text-xl'>
										{data.priceUSD} USD
									</p>
									<h2 className='text-xl text-secondary font-semibold text-center mt-5'>
										Характеристики
									</h2>

									<ul className='text-[#333333] text-sm mt-4'>
										<li className='flex justify-between mb-1'>
											<span>Год</span>
											<span className="text-secondary">{data.year} г</span>
										</li>
										<li className='flex justify-between mb-1'>
											<span>Пробег</span>
											<span className="text-secondary">{data.mileage}</span>
										</li>
										<li className='flex justify-between mb-1'>
											<span>Тип двигателя</span>
											<span className="text-secondary">{data.engine}</span>
										</li>
										<li className='flex justify-between mb-1'>
											<span>Коробка передач</span>
											<span className="text-secondary">{data.transmission}</span>
										</li>
										<li className='flex justify-between mb-1'>
											<span>Объём двигателя</span>
											<span className="text-secondary">{data.engineCapacity}</span>
										</li>
										<li className='flex justify-between mb-1'>
											<span>Привод</span>
											<span className="text-secondary">{data.drive}</span>
										</li>
									</ul>
								</div>

								<h3 className='text-xl text-secondary font-semibold text-center mt-3'>
									Комплектация
								</h3>

								<div className='mt-4 text-sm text-[#333333]'>
									<ul>
										<li className={`mb-2 ${data.salon ? 'block' : 'hidden'}`}>
											<span className="font-semibold">Салон:</span>
											<span className="text-xs block mt-1 text-secondary/70">
												{data.salon.split(',').join(' | ')}
											</span>
										</li>
										<li className={`mb-2 ${data.safety ? 'block' : 'hidden'}`}>
											<span className="font-semibold">Системы безопасности:</span>
											<span className="text-xs block mt-1 text-secondary/70">
												{data.safety.split(',').join(' | ')}
											</span>
										</li>
										<li className={`mb-2 ${data.airbags ? 'block' : 'hidden'}`}>
											<span className="font-semibold">Подушки:</span>
											<span className="text-xs block mt-1 text-secondary/70">
												{data.airbags.split(',').join(' | ')}
											</span>
										</li>
										<li className={`mb-2 ${data.assistance ? 'block' : 'hidden'}`}>
											<span className="font-semibold">Ассистенты:</span>
											<span className="text-xs block mt-1 text-secondary/70">
												{data.assistance.split(',').join(' | ')}
											</span>
										</li>
										<li className={`mb-2 ${data.exterior ? 'block' : 'hidden'}`}>
											<span className="font-semibold">Экстерьер:</span>
											<span className="text-xs block mt-1 text-secondary/70">
												{data.exterior.split(',').join(' | ')}
											</span>
										</li>
										<li className={`mb-2 ${data.interior ? 'block' : 'hidden'}`}>
											<span className="font-semibold">Интерьер:</span>
											<span className="text-xs block mt-1 text-secondary/70">
												{data.interior.split(',').join(' | ')}
											</span>
										</li>
										<li className={`mb-2 ${data.lights ? 'block' : 'hidden'}`}>
											<span className="font-semibold">Фары:</span>
											<span className="text-xs block mt-1 text-secondary/70">
												{data.lights.split(',').join(' | ')}
											</span>
										</li>
										<li className={`mb-2 ${data.climate ? 'block' : 'hidden'}`}>
											<span className="font-semibold">Климат:</span>
											<span className="text-xs block mt-1 text-secondary/70">

												{data.climate.split(',').join(' | ')}
											</span>
										</li>
										<li className={`mb-2 ${data.heating ? 'block' : 'hidden'}`}>
											<span className="font-semibold">Обогрев:</span>
											<span className="text-xs block mt-1 text-secondary/70">
												{data.heating.split(',').join(' | ')}
											</span>
										</li>
										<li className={`mb-2 ${data.multimedia ? 'block' : 'hidden'}`}>
											<span className="font-semibold">Мультимедиа:</span>
											<span className="text-xs block mt-1 text-secondary/70">
												{data.multimedia.split(',').join(' | ')}
											</span>
										</li>
										<li className={`mb-2 ${data.comfort ? 'block' : 'hidden'}`}>
											<span className="font-semibold">Комфорт:</span>
											<span className="text-xs block mt-1 text-secondary/70">
												{data.comfort.split(',').join(' | ')}
											</span>
										</li>
									</ul>
								</div>
							</div>

						</article>
					</div>


					<div className='bg-white/60 rounded-3xl sd:py-8 xz:py-5 sd:px-10 xz:px-2 text-secondary mt-14'>
						<h3 className='sd:text-3xl xz:text-xl font-semibold text-center'>
							Похожие автомобили
						</h3>

						<SimilarCars price={data.priceUSD} id={data.id} />
					</div>

					<MapComp />
				</div>
			</section>
		</main>
	)
}