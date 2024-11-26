import Image from "next/image"
import phoneNumbers from "@/config/config"
import VykupArticle from "@/components/Articles/VykupArticle";

export const metadata = {
	title: "Срочный выкуп авто в Минске и Минской области | Автосалон «AvtoCar»",
	description: "ᐈ ⭐ Выкупим ваш автомобиль ⚡ Бесплатный выезд оценщика ⚡ Купим авто в любом состоянии ➤➤➤ По рыночной стоимости. ☎️ (33) 355-88-55 Автосалон «АвтоКар» ⚡ 30 минут осмотр и оформление документов ⭐ Процедура обмена очень проста 🔥 Оплата на месте ➤➤➤ Звоните прямо сейчас!",
	keywords: "АвтоКар, AvtoCar",
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/vykup-avto/`
	},
	ogTitle: 'Срочный выкуп авто в Минске и Минской области | Автосалон «AvtoCar»',
	ogDescription: 'ᐈ ⭐ Выкупим ваш автомобиль ⚡ Бесплатный выезд оценщика ⚡ Купим авто в любом состоянии ➤➤➤ По рыночной стоимости. ☎️ (33) 355-88-55 ⚡ 30 минут осмотр и оформление документов ⭐ Процедура обмена очень проста 🔥 Оплата на месте ➤➤➤ Звоните прямо сейчас!',
	twitterTitle: 'Срочный выкуп авто в Минске и Минской области | Автосалон «AvtoCar»',
	twitterDescription: 'ᐈ ⭐ Выкупим ваш автомобиль ⚡ Бесплатный выезд оценщика ⚡ Купим авто в любом состоянии ➤➤➤ По рыночной стоимости. ☎️ (33) 355-88-55 ⚡ 30 минут осмотр и оформление документов ⭐ Процедура обмена очень проста 🔥 Оплата на месте ➤➤➤ Звоните прямо сейчас!',
	twitterImage: 'public/fon/fon6.webp',
	ogType: 'website',
	ogUrl: '',
	twitterCard: 'public/fon/fon6.webp'
};




const page = () => {
	return (
		<main className='sd:pt-20 xz:pt-14 pb-12 min-h-screen'>
			<div className='w-full bg-cover fon bg-center' />
			<section className={`relative -mt-2`}>
				<div className='container mx-auto'>
					<div className={`bg-[url('/fon/fon12.webp')] xz:bg-[-250px] sd:bg-center bg-blue-700 bg-cover rounded-3xl sd:pt-10 xz:pt-10 sd:pb-32 xz:pb-20 sd:px-8 xz:px-3 relative`}>
						{/* <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl -z-0"></div> */}
						<div className='z-10'>
							<Image
								src='/logo/logo.webp'
								alt='Логотип - авто в кредит и лизинг'
								width={230} height={230}
								className="sd:w-56 xz:w-36"
							/>
						</div>
						<div className='sd:mt-10 xz:mt-6'>
							<h1 className='sd:text-7xl xz:text-2xl xy:text-3xl font-bold uppercase text-white'>
								<span className="text-primary">
									Срочный
								</span>{' '}<span className="">выкуп</span> <span className="block xz:mt-2 xy:mt-4 sd:mt-7">  <span className="text-[#0000FF] bg-[#D0D0D2] rounded-3xl py-1 px-2">автомобилей</span></span>
							</h1>
							<div className='sd:mt-20 xz:mt-7 pr-10'>
								<p className='text-shadow sd:text-3xl xz:text-lg uppercase font-semibold text-white xz:mb-8 sd:mb-0 blink-animation'>
									Предложим самую лучшую цену
								</p>
							</div>


							<div className='flex sd:flex-row xz:flex-col justify-between sd:items-end xz:items-center sd:space-y-0 xz:space-y-8 mt-8'>
								<div className='xz:text-base xy:text-2xl'>
									<div className='flex mt-3'>
										<Image src='/svg/check.svg' alt='Бесплатный выезд оценщика' width={25} height={25} />
										<p className='text-white ml-3 font-light'>
											Бесплатный выезд <span className="font-bold uppercase">оценщика</span>
										</p>
									</div>

									<div className='flex mt-3'>
										<Image src='/svg/check.svg' alt='Купим авто в любом состоянии' width={25} height={25} />
										<p className='text-white ml-3 font-light'>
											Купим авто в любом <span className="font-bold uppercase">состоянии</span>
										</p>
									</div>

									<div className='flex mt-3'>
										<Image src='/svg/check.svg' alt='Выкуп авто по реальной рыночной стоимости' width={25} height={25} />
										<p className='text-white ml-3 font-light'>
											По реальной рыночной <span className="font-bold uppercase">стоимости</span>
										</p>
									</div>

									<div className='flex mt-3'>
										<Image src='/svg/check.svg' alt='Полная выплата стоимости на месте' width={25} height={25} />
										<p className='text-white ml-3 font-light'>
											Полная выплата стоимости <span className="font-bold uppercase">на месте</span>
										</p>
									</div>
								</div>
								<div className="dropdown dropdown-top sd:dropdown-end xz:dropdown-content text-white">
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
							</div>
						</div>
					</div>
				</div>

				<div className='container mx-auto'>
					<VykupArticle />
				</div>


			</section>
		</main>
	)
}

export default page