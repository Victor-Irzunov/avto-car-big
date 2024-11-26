export const metadata = {
	title: "Каталог авто б/у для покупки в автосалоне в лизинг и кредит | Автосалон «АвтоКар»",
	description: "ᐈ ⭐ Автосалон: Кредит и лизинг на б/у авто ➤➤➤ До 10 лет. ☎️ (33) 355-88-55 Автосалон «АвтоКар» ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Офомление в день подачи  ⭐ Без взоса ✓ Без справок и поручителей.",
	keywords: "кредит на авто, лизинг авто, автосалон, кредит на покупку авто, автокредит, машина в лизинг, купить авто в лизинг, кредит на покупку авто бу, лизинг без первого взноса, кредит на авто бу, автолизинг",
	alternates: {
	  canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/auto/`
	},
	ogTitle: 'Автосалон | Лизинг | Кредит | Купить машину в лизинг',
	ogDescription: 'ᐈ ⭐ Автосалон: Кредит и лизинг на б/у авто ➤➤➤ До 10 лет. ☎️ (33) 355-88-55 ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Офомление в день подачи  ⭐ Без взоса ✓ Без справок и поручителей.',
	ogImage: 'public/logo/logo.webp',
	twitterTitle: 'Автосалон | Лизинг | Кредит | Купить машину в лизинг',
	twitterDescription: 'ᐈ ⭐ Автосалон: Кредит и лизинг на б/у авто ➤➤➤ До 10 лет. ☎️ (33) 355-88-55 ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Офомление в день подачи  ⭐ Без взоса ✓ Без справок и поручителей.',
	twitterImage: 'public/logo/logo.webp',
	ogType: 'website',
	ogUrl: '',
	twitterCard: 'public/logo/logo.webp'
 };
 

export default function Layout({ children }) {
	return (
		<>
			{children}
		</>
	);
}
