import CreditArticle from "@/components/Articles/CreditArticle"
import LizingArticle from "@/components/Articles/LizingArticle";
import FormCreditNoCarData from "@/components/Form/FormCreditNoCarData"
import Partner from "@/components/Partner/Partner";
import PhoneBottom from "@/components/phoneBotton/PhoneBottom";

export const metadata = {
	title: "Лизинг авто в Минске | Купить авто б/у в лизинг | Физ лица | Без взноса",
	description: "ᐈ ⭐ Авто бу в лизинг для физ. лиц ⚡ Лизинг авто на выгодных условиях 🚘  Машина бу в лизинг ➤➤➤ До 7 лет. ☎️ (33) 355-88-55 ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Офомление в день подачи ⭐ Без взоса ✓ Без справок и поручителей. ✓ Звоните прямо сейчас!",
	keywords: "лизинг авто, авто в лизинг, машина в лизинг, купить авто в лизинг, купить машину в лизинг, лизинг для физических лиц, лизинг для физ лица, лизинг на авто, лизинг авто для физических лиц, лизинг для юридических лиц, автолизинг, авто в лизинг без первоначального взноса, лизинг авто для юридических лиц, лизинг машины это, лизинг авто это, авто в лизинг без первого взноса, каталог авто в лизинг, лизинг бу авто, лизинг авто без первоначального взноса, автобай лизинг, купить бу авто в лизинг, купить бу авто в лизинг без первоначального взноса, авто лизинг, бу авто в лизинг, лизинг для ип, калькулятор лизинга на авто, расчет лизинга на авто, лизинг авто калькулятор, расчет лизинга, лизинг грузовых автомобилей, взять машину в лизинг, купить авто в лизинг без первоначального взноса, взять авто в лизинг, калькулятор лизинга бу авто, лизинг машины, авто в лизинг для физических лиц, покупка авто в лизинг, авто в лизинг для юр лиц, авто в лизинг для ип, альфа лизинг авто с пробегом, калькулятор лизинга авто, калькулятор лизинг авто, новое авто в лизинг, лизинг на бу авто, лизинг бу авто для физических лиц, условия лизинга на авто, лизинг авто для ип, грузовое авто в лизинг, продажа авто в лизинг, альфа банк лизинг авто, авто с пробегом в лизинг, авто в лизинг условия, купить новое авто в лизинг, купить новый автомобиль в лизинг, лизинг или кредит на авто, лизинг на машину, выкуп лизинговых авто, купить машину в лизинг бу, avtolizing",
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/lizing/`
	},
	ogTitle: 'Купить авто б/у в лизинг в Минске | Выгодный лизинг на покупку',
	ogDescription: 'ᐈ ⭐ Авто бу в лизинг ⚡ Лизинг авто на выгодных условиях ⚡ Машина бу в лизинг ➤➤➤ До 7 лет. ☎️ (33) 355-88-55 ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Офомление в день подачи ⭐ Без взоса ✓ Без справок и поручителей. ✓ Звоните прямо сейчас!',
	twitterTitle: 'Купить авто б/у в лизинг в Минске | Выгодный лизинг на покупку',
	twitterDescription: 'ᐈ ⭐ Авто бу в лизинг ⚡ Лизинг авто на выгодных условиях ⚡ Машина бу в лизинг ➤➤➤ До 7 лет. ☎️ (33) 355-88-55 ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Офомление в день подачи ⭐ Без взоса ✓ Без справок и поручителей. ✓ Звоните прямо сейчас!',
	twitterImage: 'public/logo/logo.webp',
	ogType: 'website',
	ogUrl: '',
	twitterCard: 'public/logo/logo.webp'
};



const page = () => {
	return (
		<main className='sd:pt-20 xz:pt-36 pb-20 min-h-screen relative '>
			<div className='w-full bg-cover fon bg-center' />
			<section className='relative'>
				<div className='container mx-auto'>
					<h1 className='sd:text-5xl xz:text-4xl font-semibold text-white text-center'>
						Авто б/у в лизинг
					</h1>

					<h2 className='sd:text-xl xz:text-base mt-8 text-center'>
						Для физ. лиц без первого взноса
					</h2>

					<div className=''>
						<FormCreditNoCarData lizing title='Калькулятор лизинга' srok='Срок лизинга' title2='Лизинг' />
					</div>

				</div>
				<div className='mt-24'>
					<LizingArticle />
				</div>

				<div className='container mx-auto'>
					<Partner />
				</div>
			</section>
			<PhoneBottom />
		</main>
	)
}

export default page