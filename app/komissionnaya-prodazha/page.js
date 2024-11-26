import Image from "next/image"
import phoneNumbers from "@/config/config"
import Partner from "@/components/Partner/Partner"
import BtnComp from "@/components/btn/BtnComp";
import KomissionnayaProdazhaArticle from "@/components/Articles/KomissionnayaProdazhaArticle";

export const metadata = {
	title: "Продать авто в Минске: Комиссионная продажа автомобиля по выгодным ценам | AvtoCar",
	description: "ᐈ ⭐ Комиссионная продажа автомобиля в Минске ⚡ Продать авто выгодной и быстро ⚡ Продадим ваш автомобиль 🚘 быстро ➤➤➤ Быстрая оценка. ☎️ (33) 355-88-55 Автосалон «АвтоКар» ⚡ Любое состояние авто ⭐ подготовим к продаже, сделаем мойку кузова, чернение резины, отбеливание дисков 🔥 Звоните прямо сейчас!",
	keywords: "",
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/komissionnaya-prodazha/`
	},
	ogTitle: 'Продать авто в Минске: Комиссионная продажа автомобиля по выгодным ценам | AvtoCar',
	ogDescription: 'ᐈ ⭐ Комиссионная продажа автомобиля в Минске ⚡ Продать авто выгодной и быстро ⚡ Продадим ваш автомобиль 🚘 быстро ➤➤➤ Быстрая оценка. ☎️ (33) 355-88-55 ⚡ Любое состояние авто ⭐ подготовим к продаже, сделаем мойку кузова, чернение резины, отбеливание дисков 🔥 Звоните прямо сейчас!',
	twitterTitle: 'Продать авто в Минске: Комиссионная продажа автомобиля по выгодным ценам | AvtoCar',
	twitterDescription: 'ᐈ ⭐ Комиссионная продажа автомобиля в Минске ⚡ Продать авто выгодной и быстро ⚡ Продадим ваш автомобиль 🚘 быстро ➤➤➤ Быстрая оценка. ☎️ (33) 355-88-55 ⚡ Любое состояние авто ⭐ подготовим к продаже, сделаем мойку кузова, чернение резины, отбеливание дисков 🔥 Звоните прямо сейчас!',
	twitterImage: 'public/logo/logo.webp',
	ogType: 'website',
	ogUrl: '',
	twitterCard: 'public/logo/logo.webp'
};




const page = () => {
	return (
		<main className='sd:pt-20 xz:pt-14 pb-12 min-h-screen'>
			<div className='w-full bg-cover fon bg-center' />
			<section className={`relative -mt-2`}>
				<div className='container mx-auto
				'>

					<div className="relative bg-[url('/fon/fon7.webp')] bg-cover sd:bg-center xz:bg-[-200px] rounded-3xl sd:pt-10 xz:pt-10 sd:pb-20 xz:pb-10 sd:px-8 xz:px-3">
						{/* Полупрозрачный слой затемнения */}
						<div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl -z-0"></div>

						{/* Основное содержимое */}
						<div className="relative z-10">
							<div>
								<Image
									src='/logo/logo.webp'
									alt='Логотип - авто в кредит и лизинг'
									width={230} height={230}
								/>
							</div>
							<div className="mt-10">
								<h1 className="sd:text-7xl xz:text-3xl font-bold uppercase text-white">
									<span className="text-primary">Комиссионная</span> <span>продажа</span>
									<span className="block sd:mt-7 xz:mt-3">
										<span className="text-[#0000FF] bg-[#D0D0D2] rounded-3xl py-1 px-2">авто</span>
									</span>
								</h1>
								<div className="flex sd:flex-row xz:flex-col justify-between sd:mt-20 xz:mt-7 pr-10">
									<p className="sd:text-xl xz:text-sm uppercase font-semibold text-white xz:mb-8 sd:mb-0">
										Каждый год мы находим новых владельцев для более чем 1000 автомобилей и поможем продать ваш.
									</p>

								</div>
							</div>
						</div>

						<div className='grid sd:grid-cols-2 xz:grid-cols-1 pl-1 sd:gap-6 xz:gap-3 mt-14 z-10 relative'>
							<div className='flex items-start'>
								<Image src='/svg/check.svg' alt='Полимерная покраска дисков' width={20} height={20} />
								<p className='text-white ml-3 font-light'>
									Предпродажная <span className="font-bold uppercase">подготовка</span>
								</p>
							</div>

							<div className='flex items-start'>
								<Image src='/svg/check.svg' alt='Аргонная сварка дисков' width={20} height={20} />
								<p className='text-white ml-3 font-light'>
									Большая <span className="font-bold uppercase">проходимость</span>
								</p>
							</div>

							<div className='flex items-start'>
								<Image src='/svg/check.svg' alt='Профессиональная пескоструйка дисков' width={20} height={20} />
								<p className='text-white ml-3 font-light'>
									Правильное <span className="font-bold uppercase">ценообразование</span>
								</p>
							</div>

							<div className='flex items-start'>
								<Image src='/svg/check.svg' alt='Правка и раскатка дисков' width={20} height={20} />
								<p className='text-white ml-3 font-light'>
									Охраняемые <span className="font-bold uppercase">крытые парковки</span>
								</p>
							</div>
						</div>

						<div className='mt-12 flex sd:flex-row xz:flex-col sd:items-center xz:items-stretch relative z-10 sd:space-x-4 sd:space-y-0 xz:space-y-4'>

							<div className="dropdown dropdown-top text-white">
								<button tabIndex={0} className="btn text-lg px-10 w-full rounded-full bg-[#D0D0D2] border-none text-[#636363]">
									Позвонить
								</button>
								<div tabIndex={0} className={`dropdown-content bg-[#2D3192] z-30 px-6 py-8 shadow-slate-400 w-[300px] text-center rounded-xl`}>
									<div className=''>
										<Image src='/logo/logo2.webp' alt='Логотип - продажа авто в кредит и лизинг' width={120} height={120} className="mx-auto" />
									</div>
									<p className='text-xl'>
										Мы в Минске
									</p>
									<div className='mt-5'>
										<Image src='/svg/location-white.svg' alt='Адрес автосалона' width={30} height={30} className="mx-auto mb-2" />
										<a href="https://yandex.by/maps/-/CDdkfUlz" target="_blank" className="mt-2 text-sm">
											Минск, ул. Куйбышева 40, <br />
											Паркинг 4 этаж
										</a>
									</div>
									<div className='mt-5'>
										<Image src='/svg/phone-white.svg' alt='Телефон автосалона' width={25} height={25} className="mx-auto mb-2" />
										<a href={`tel:${phoneNumbers.secondaryPhoneLink}`} className='font-light'>
											{phoneNumbers.secondaryPhone} МТС
										</a>
										<a href={`tel:${phoneNumbers.mainPhoneLink}`} className='font-light mt-2 block'>
											{phoneNumbers.mainPhone} A1
										</a>
									</div>
								</div>
							</div>
							<BtnComp title='Получить консультацию' index={299} wFull />
						</div>
					</div>

				</div>

				<div className='container mx-auto'>
					<KomissionnayaProdazhaArticle />
				</div>

				<div className='container mx-auto mt-10 bg-blue-800/50 py-16 sd:px-8 xz:px-4 rounded-3xl'>
					<h3 className='sd:text-5xl xz:text-3xl font-semibold text-white'>
						Этапы приема авто на комиссию
					</h3>
					<div className='grid sd:grid-cols-2 xz:grid-cols-1 gap-0 sd:mt-12 xz:mt-8'>

						<div className='sd:border-r xz:border-r-0 border-b border-[#555555] border-dashed p-3'>
							<div className='flex items-center justify-between'>
								<div className='bg-primary rounded-2xl p-2 flex justify-center items-center'>
									<Image src='/svg/phone-white.svg' alt='Звоните или приезжаете' width={30} height={30} />
								</div>
								<div className=''>
									<p className='text text-4xl font-bold'>
										01
									</p>
								</div>
							</div>
							<p className='sd:text-xl xz:text-xl text-white mt-2 font-semibold'>
								Звоните или приезжаете
							</p>
							<p className='text-[#a7a7a7] mt-2 text-sm'>
								Менеджер проконсультирует Вас по комиссионной продаже.
							</p>
						</div>

						<div className='border-b border-[#555555] border-dashed p-3'>
							<div className='flex items-center justify-between'>
								<div className='bg-primary rounded-2xl p-2 flex justify-center items-center'>
									<Image src='/svg/car.svg' alt='Приезжаете на авто' width={30} height={30} />
								</div>
								<div className=''>
									<p className='text text-4xl font-extrabold'>
										02
									</p>
								</div>
							</div>
							<p className='sd:text-xl xz:text-xl text-white mt-2 font-semibold'>
								Приезжаете на авто
							</p>
							<p className='text-[#a7a7a7] mt-2 text-sm'>
								Вы привозите свой автомобиль в наш автосалон
							</p>
						</div>


						<div className='xz:border-b sd:border-b-0 xz:border-r-0 sd:border-r border-[#555555] border-dashed p-3'>
							<div className='flex items-center justify-between'>
								<div className='bg-primary rounded-2xl p-2 flex justify-center items-center'>
									<Image src='/svg/pricePrice.svg' alt='Оцениваем стоимость авто' width={30} height={30} />
								</div>
								<div className=''>
									<p className='text text-4xl font-extrabold'>
										03
									</p>
								</div>
							</div>
							<p className='text-xl text-white mt-2 font-semibold'>
								Оцениваем стоимость
							</p>
							<p className='text-[#a7a7a7] mt-2 text-sm'>
								Проводим осмотр Вашего автомобиля и даем рекомендации по цене
							</p>
						</div>

						<div className='p-3'>
							<div className='flex items-center justify-between'>
								<div className='bg-primary rounded-2xl p-2 flex justify-center items-center'>
									<Image src='/svg/dogovor.svg' alt='Заключаем договор' width={30} height={30} />
								</div>
								<div className=''>
									<p className='text text-4xl font-extrabold'>
										04
									</p>
								</div>
							</div>
							<p className='text-xl text-white mt-2 font-semibold'>
								Заключаем договор
							</p>
							<p className='text-[#a7a7a7] mt-2 text-sm'>
								Оформляем все необходимые документы в течении 20-30 минут. Необходим собственник авто или доверенность
							</p>
						</div>

						<div className='p-3 border-t xz:border-r-0 sd:border-r border-[#555555] border-dashed'>
							<div className='flex items-center justify-between'>
								<div className='bg-primary rounded-2xl p-2 flex justify-center items-center'>
									<Image src='/svg/carSales.svg' alt='Для юридических лиц ремонт' width={30} height={30} />
								</div>
								<div className=''>
									<p className='text text-4xl font-extrabold'>
										05
									</p>
								</div>
							</div>
							<p className='text-xl text-white mt-2 font-semibold'>
								Продаем авто
							</p>
							<p className='text-[#a7a7a7] mt-2 text-sm'>
								Ваш автомобиль продается за короткий срок благодаря нашей клиентской базе и эффективной рекламе на всех площадках Минска и Беларуси
							</p>
						</div>
						<div className='p-3 border-t border-[#555555] border-dashed'>
							<div className='flex items-center justify-between'>
								<div className='bg-primary rounded-2xl p-2 flex justify-center items-center'>
									<Image src='/svg/payment.svg' alt='Выплачиваем деньги за продажу авто' width={30} height={30} />
								</div>
								<div className=''>
									<p className='text text-4xl font-extrabold'>
										06
									</p>
								</div>
							</div>
							<p className='text-xl text-white mt-2 font-semibold'>
								Выплачиваем деньги
							</p>
							<p className='text-[#a7a7a7] mt-2 text-sm'>
								После продажи авто, мы связываемся с Вами, чтобы договориться о переводе денег за автомобиль на банковский счет
							</p>
						</div>
					</div>
					<div className='mt-8 z-20'>
						<BtnComp title='Узнать подробнее' index={358} red />
					</div>
				</div>

				<div className='container mx-auto mt-10 bg-white py-16 sd:px-8 xz:px-4 rounded-3xl text-secondary'>
					<div className='grid sd:grid-cols-2 xz:grid-cols-1 gap-8'>

						<div className=''>
							<h4 className='sd:text-5Необходимые документыxl xz:text-3xl font-semibold'>
								Необходимые документы
							</h4>
							<div className='mt-8'>
								<div className='flex items-center'>
									<Image src='/svg/passport.svg' alt='Паспорт' width={50} height={50} />
									<p className='ml-2'>
										Паспорт (вид на жительство)
									</p>
								</div>
								<div className='flex items-center mt-4'>
									<Image src='/svg/techPassport.svg' alt='Техпаспорт транспортного средства' width={50} height={50} />
									<p className='ml-2'>
										Техпаспорт транспортного средства
									</p>
								</div>
								<div className='flex items-center mt-4'>
									<Image src='/svg/attention.svg' alt='Автомобиль должен быть снят с учета ГАИ' width={50} height={50} />
									<p className='ml-2'>
										<span className="font-semibold text-primary">Важно!</span> Автомобиль должен быть снят с учета ГАИ
									</p>
								</div>
							</div>
						</div>

						<div className=''>
							<h5 className='sd:text-5Необходимо подготовить автоxl xz:text-3xl font-semibold'>
								Подготовка авто
							</h5>
							<div className='mt-8'>
								<div className='flex items-center'>
									<Image src='/svg/fuel.svg' alt='Заправить минимум полбака топлива' width={50} height={50} />
									<p className='ml-2'>
										Заправить минимум полбака топлива
									</p>
								</div>
								<div className='flex items-center mt-4'>
									<Image src='/svg/jewelry.svg' alt='Достать все ценные вещи из автомобиля' width={50} height={50} />
									<p className='ml-2'>
										Достать все ценные вещи из автомобиля
									</p>
								</div>
								<div className='flex items-center mt-4'>
									<Image src='/svg/сarRepair.svg' alt='Возможен небольшой согласованный ремонт' width={50} height={50} />
									<p className='ml-2'>
										Возможен небольшой согласованный ремонт
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='container mx-auto'>
					<Partner />
				</div>
			</section>
		</main>
	)
}

export default page