import Image from "next/image"
import phoneNumbers from "@/config/config"
import ObmenArticle from "@/components/Articles/ObmenArticle"
import Partner from "@/components/Partner/Partner"
import VykupArticle from "@/components/Articles/VykupArticle";
import PrigonIzEsArticle from "@/components/Articles/PrigonIzEsArticle";

export const metadata = {
	title: "Пригнать авто из Европы «под ключ» в Беларусь | Доставка в Минск",
	description: "ᐈ ⭐ Подбор и пригон авто из Европы ⚡ Доставка в Минск ⚡ Компания ➤➤➤ AvtoCar является экспертом по подбору и доставке автомобилей, ⭐ новых и с пробегом, ⚡ эксклюзивных или заказнных под ваши параметры из Европы 🔥 ⚡ Поиск, проверка и доставка автомобиля из любого региона Европы ⭐ Процедура очень проста 🔥 Автомобиль вы получаете у нас в автосалоне с полным пакетом документов для постановки ➤➤➤ Звоните прямо сейчас! ☎️ (33) 355-88-55",
	keywords: "",
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/prigon-iz-es/`
	},
	ogTitle: 'Пригнать авто из Европы «под ключ» в Беларусь | Доставка в Минск',
	ogDescription: 'ᐈ ⭐ Подбор и пригон авто из Европы ⚡ Доставка в Минск ⚡ Компания ➤➤➤ AvtoCar является экспертом по подбору и доставке автомобилей, ⭐ новых и с пробегом, ⚡ эксклюзивных или заказнных под ваши параметры из Европы 🔥 ⚡ Поиск, проверка и доставка автомобиля из любого региона Европы ⭐ Процедура очень проста 🔥 Автомобиль вы получаете у нас в автосалоне с полным пакетом документов для постановки ➤➤➤ Звоните прямо сейчас! ☎️ (33) 355-88-55',
	twitterTitle: 'Пригнать авто из Европы «под ключ» в Беларусь | Доставка в Минск',
	twitterDescription: 'ᐈ ⭐ Подбор и пригон авто из Европы ⚡ Доставка в Минск ⚡ Компания ➤➤➤ AvtoCar является экспертом по подбору и доставке автомобилей, ⭐ новых и с пробегом, ⚡ эксклюзивных или заказнных под ваши параметры из Европы 🔥 ⚡ Поиск, проверка и доставка автомобиля из любого региона Европы ⭐ Процедура очень проста 🔥 Автомобиль вы получаете у нас в автосалоне с полным пакетом документов для постановки ➤➤➤ Звоните прямо сейчас! ☎️ (33) 355-88-55',
	twitterImage: 'public/fon/fon6.webp',
	ogType: 'website',
	ogUrl: '',
	twitterCard: 'public/fon/fon6.webp'
};




const page = () => {
	return (
		<main className='sd:pt-20 xz:pt-14 pb-12 min-h-screen'>
			<div className='w-full bg-cover fon bg-center' />
			<section className="relative -mt-2">
				<div className='container mx-auto'>
					<div className="relative bg-[url('/fon/avto3.webp')] bg-cover bg-center rounded-3xl sd:pt-10 xz:pt-10 sd:pb-32 xz:pb-20 sd:px-8 xz:px-3">

						{/* Затемненный слой */}
						<div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl -z-0"></div>

						{/* Контент на переднем плане */}
						<div className="relative z-10">
							<Image
								src='/logo/logo.webp'
								alt='Логотип - автосалона AvtoCar'
								width={230}
								height={230}
								className="sd:w-56 xz:w-36"
							/>

							<div className='sd:mt-10 xz:mt-6'>
								<h1 className='text-shadow sd:text-7xl xz:text-xl xy:text-3xl font-bold uppercase text-white'>
									<span className="text-primary">Подбор</span>{' '}
									<span className=""> и доставка</span>
									<span className="block xz:mt-1 xy:mt-2 sd:mt-3">автомобилей из Европы</span>
								</h1>

								<div className='sd:mt-16 xz:mt-7 pr-10'>
									<p className='text-shadow sd:text-3xl uppercase xz:text-lg font-semibold text-white xz:mb-8 sd:mb-0 blink-animation'>
										Полный спектр услуг "под ключ"
									</p>
								</div>

								<div className='mt-8'>
									<div className='xz:text-base xy:text-2xl'>
										{[
											{ text: "Подбор автомобиля по ", boldText: "индивидуальным параметрам" },
											{ text: "Гарантированное ", boldText: "качество и проверка" },
											{ text: "Сотрудничество с официальными ", boldText: "дилерами и аукционами" },
											{ text: "Экспертиза в ", boldText: "европейском рынке" },
										].map(({ text, boldText }, index) => (
											<div className='flex mt-3' key={index}>
												<Image src='/svg/check.svg' alt={text} width={25} height={25} />
												<p className='text-white ml-3 font-light'>
													{text.replace(boldText, "")}
													<span className="font-bold uppercase">{boldText}</span>
												</p>
											</div>
										))}
									</div>
								</div>

								<div className='mt-9'>
									<a href={`tel:${phoneNumbers.mainPhoneLink}`} className="btn text-lg px-10 rounded-full bg-white border-none text-[#636363]">
										Позвонить
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='container mx-auto'>
					<PrigonIzEsArticle />
				</div>
			</section>
		</main>

	)
}

export default page