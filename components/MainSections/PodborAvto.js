import Image from "next/image"
import FormPodborAvto from "../Form/FormPodborAvto"
import CatalogMain from "./CatalogMain"


const PodborAvto = () => {
	return (
		<section className='sd:mt-0 xz:mt-10 relative'>
			<div className='container mx-auto'>
				<div className='bg-white/60 rounded-3xl sd:py-16 xz:py-5 sd:px-10 xz:px-2'>
					<h2 className='sd:block xz:hidden text-3xl font-semibold text-[#12142B] text-center uppercase'>
						Поможем подобрать автомобиль как у нас на площадке так и за её пределами
					</h2>
					<div className='grid sd:grid-cols-2 xz:grid-cols-1 gap-4 sd:mt-8 xz:mt-0'>
						<div className='bg-[#1B1464] rounded-3xl sd:px-7 xz:px-4 py-9'>
							<h3 className='sd:block xz:hidden sd:text-5xl xz:text-3xl font-semibold text-white'>
								Быстрый подбор авто
							</h3>
							<h3 className='sd:hidden xz:block sd:text-5xl xz:text-3xl font-semibold text-white'>
								Подбор авто
							</h3>

							<div className='mt-6'>
								<FormPodborAvto />
							</div>
						</div>
						<div className='sd:grid xz:hidden sd:grid-cols-3 xz:grid-cols-1 gap-4'>

							<div className='bg-white rounded-3xl p-3'>
								<h3 className='text-3xl font-semibold text-neutral'>
									Кредит
								</h3>
								<div className='flex justify-end mt-3'>
									<Image src='/img/1.webp' alt='Кредит' width={80} height={80} />
								</div>
							</div>

							<div className='bg-[#2D3192] rounded-3xl p-3'>
								<h3 className='text-3xl font-semibold text-white'>
									Лизинг
								</h3>
								<div className='flex justify-end mt-3'>
									<Image src='/img/2.webp' alt='Лизинг' width={80} height={80} />
								</div>
							</div>

							<div className='bg-white rounded-3xl p-3'>
								<h3 className='text-3xl font-semibold text-neutral'>
									Traid-in
								</h3>
								<div className='flex justify-end mt-3'>
									<Image src='/img/3.webp' alt='Traid-in' width={100} height={100} />
								</div>
							</div>
							<div className='bg-[#2D3192] rounded-3xl p-3'>
								<h3 className='text-3xl font-semibold text-white'>
									Выкуп авто
								</h3>
								<div className='flex justify-end mt-3'>
									<Image src='/img/4.webp' alt='Выкуп авто' width={90} height={90} />
								</div>
							</div>
							<div className='bg-[#1B1464] rounded-3xl p-3 col-span-2'>
								<h3 className='text-3xl font-semibold text-white'>
									Комиссионная продажа
								</h3>
								<div className='flex justify-end mt-3'>
									<Image src='/img/5.webp' alt='Комиссионная продажа' width={90} height={90} />
								</div>
							</div>

							<div className='bg-white rounded-3xl p-3 col-span-2'>
								<h3 className='text-3xl font-semibold text-neutral'>
									Пригон авто из Европы
								</h3>
								<div className='flex justify-end mt-3'>
									<Image src='/img/6.webp' alt='Пригон авто из Европы' width={90} height={90} />
								</div>
							</div>
							<div className='bg-[#2D3192] rounded-3xl p-3'>
								<h3 className='text-3xl font-semibold text-white'>
									Обмен
								</h3>
								<div className='flex justify-end mt-8'>
									<Image src='/img/2.webp' alt='Обмен' width={80} height={80} />
								</div>
							</div>
						</div>
					</div>

					<CatalogMain />
				</div>
			</div>
		</section>
	)
}

export default PodborAvto