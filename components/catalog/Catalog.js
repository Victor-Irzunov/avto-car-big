"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Catalog = ({ data, isAdmin }) => {

	const [visibleCars, setVisibleCars] = useState(6);

	const loadMoreCars = () => setVisibleCars((prevVisible) => prevVisible + 6);


	return (
		<div className="sd:container mx-auto">
			<div className='grid sd:grid-cols-3 xz:grid-cols-1 sd:gap-8 xz:gap-2 mt-9'>
				{data.slice(0, visibleCars).map((car) => (
					<article key={car.id} className="card bg-white rounded-3xl shadow-xl ">
						<figure className="relative w-full h-[250px] overflow-hidden rounded-t-3xl">
							{
								isAdmin ?
									<span className="absolute top-2 z-20 right-2 text-primary text-sm flex justify-center items-center bg-white p-1 rounded-full w-6 h-6">{car.id}</span>
									:
									null
							}
							<div className="carousel rounded-t-3xl w-full h-full">
								{JSON.parse(car.images).map((image, index) => (
									<div key={index} className="carousel-item w-full mx-0.5">
										<Image
											src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${image.original}`}
											alt={car.title}
											className="w-full h-full object-cover"
											width={250}
											height={250}
										/>
									</div>
								))}
							</div>
							<div className='absolute bottom-1 right-1'>
								<Image src='/svg/left-right.svg' alt='Рука и палец для фото влево и вправо' width={25} height={25} />
							</div>
						</figure>

						<div className="card-body sd:p-4 xz:p-2">
							<p className='text-info sd:text-lg xz:text-sm'>
								{car.priceUSD} USD <span className="font-semibold sd:text-xl xz:text-base">/ {car.priceBYN} BYN</span>
							</p>
							<h3 className="card-title text-secondary sd:text-base xz:text-base">
								{car.title}
							</h3>
							<ul className='text-[#333333] sd:text-sm xz:text-xs'>
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

			{visibleCars < data.length && (
				<div className="flex justify-center mt-8">
					<button onClick={loadMoreCars} className="btn btn-primary px-6 py-2 rounded-full">
						Ещё
					</button>
				</div>
			)}
		</div>
	);
};
