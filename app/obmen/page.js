import Image from "next/image"
import phoneNumbers from "@/config/config"
import ObmenArticle from "@/components/Articles/ObmenArticle"
import Partner from "@/components/Partner/Partner"

export const metadata = {
	title: "Обмен авто в автосалоне «AvtoCar», trade-in в Минске",
	description: "ᐈ ⭐ Самый выгодный обмен авто в Минске ⚡ Оценим Ваш автомобиль по рыночной стоимости ⚡ Через час Вы уедете на новом автомобиле ➤➤➤ Возможна доплата в обе стороны, Вы нам или мы Вам. ☎️ (33) 355-88-55 ⚡ Оформим кредит на недостающую сумму за час ⭐ Процедура обмена очень проста 🔥 Звоните прямо сейчас!",
	keywords: "",
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/obmen/`
	},
	ogTitle: 'Обмен авто в автосалоне «AvtoCar», trade-in в Минске',
	ogDescription: 'ᐈ ⭐ Самый выгодный обмен авто в Минске ⚡ Оценим Ваш автомобиль по рыночной стоимости ⚡ Через час Вы уедете на новом автомобиле ➤➤➤ Возможна доплата в обе стороны, Вы нам или мы Вам. ☎️ (33) 355-88-55 ⚡ Оформим кредит на недостающую сумму за час ⭐ Процедура обмена очень проста 🔥 Звоните прямо сейчас!',
	twitterTitle: 'Обмен авто в автосалоне «AvtoCar», trade-in в Минске',
	twitterDescription: 'ᐈ ⭐ Самый выгодный обмен авто в Минске ⚡ Оценим Ваш автомобиль по рыночной стоимости ⚡ Через час Вы уедете на новом автомобиле ➤➤➤ Возможна доплата в обе стороны, Вы нам или мы Вам. ☎️ (33) 355-88-55 ⚡ Оформим кредит на недостающую сумму за час ⭐ Процедура обмена очень проста 🔥 Звоните прямо сейчас!',
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
				<div className='container mx-auto'>
					<div className={`bg-[url('/fon/fon3.webp')] bg-cover rounded-3xl sd:pt-24 xz:pt-10 sd:pb-32 xz:pb-10 sd:px-8 xz:px-3`}>
						<div className=''>
							<Image
								src='/logo/logo.webp'
								alt='Логотип - авто в кредит и лизинг'
								width={230} height={230}
							/>
						</div>
						<div className='mt-10'>
							<h1 className='sd:text-7xl xz:text-3xl font-bold uppercase text-white'>
								<span className="text-primary">
									Авто
								</span>{' '}<span className="">в обмен</span> <span className="block mt-7">и  <span className="text-[#0000FF] bg-[#D0D0D2] rounded-3xl py-1 px-2">Traid-in</span></span>
							</h1>
							<div className='flex sd:flex-row xz:flex-col justify-between sd:mt-20 xz:mt-7 pr-10'>
								<p className='sd:text-xl xz:text-sm uppercase font-semibold text-white xz:mb-8 sd:mb-0'>
									Пеменяйте свой автомобиль на выгодных условиях
								</p>
								<a href={`tel:${phoneNumbers.mainPhoneLink}`} className="btn text-lg px-10 rounded-full bg-[#D0D0D2] border-none text-[#636363]">
									Позвонить
								</a>
							</div>
						</div>
					</div>
				</div>

				

				<div className='sd:container mx-auto'>
					<ObmenArticle />
				</div>

				

				<div className='container mx-auto'>
					<Partner />
				</div>
			</section>
		</main>
	)
}

export default page