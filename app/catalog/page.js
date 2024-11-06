import { PrismaClient } from '@prisma/client';
import PageComponent from "@/components/Comp/PageComponent";

const prisma = new PrismaClient();

async function getData() {
	console.log('Запрос в каталоге')
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

export const metadata = {
	title: "Купить авто c пробегом в Минске | Лизинг и Кредит | Каталог автосалона «AvtoCar»",
	description: "ᐈ ⭐ Автомобили с пробегом в самом крупном автосалоне Минска ⚡ Кредит и лизинг на б/у авто ➤➤➤ До 10 лет. ☎️ (33) 355-88-55 ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Только проверенные авто ⭐ Без взоса ✓ Без справок и поручителей ✓ Звоните прямо сейчас!",
	keywords: "",
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/`
	},
	ogTitle: 'Купить авто c пробегом в Минске | Лизинг и Кредит | Каталог автосалона «AvtoCar»',
	ogDescription: 'ᐈ ⭐ Автомобили с пробегом в самом крупном автосалоне Минска ⚡ Кредит и лизинг на б/у авто ➤➤➤ До 10 лет. ☎️ (33) 355-88-55 ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Только проверенные авто ⭐ Без взоса ✓ Без справок и поручителей ✓ Звоните прямо сейчас!',
	twitterTitle: 'Купить авто c пробегом в Минске | Лизинг и Кредит | Каталог автосалона «AvtoCar»',
	twitterDescription: 'ᐈ ⭐ Автомобили с пробегом в самом крупном автосалоне Минска ⚡ Кредит и лизинг на б/у авто ➤➤➤ До 10 лет. ☎️ (33) 355-88-55 ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Только проверенные авто ⭐ Без взоса ✓ Без справок и поручителей ✓ Звоните прямо сейчас!',
	twitterImage: 'public/fon/fon6.webp',
	ogType: 'website',
	ogUrl: '',
	twitterCard: 'public/fon/fon6.webp'
};


export default async function Page() {
	const data = await getData();

	return <PageComponent data={data} />;

}
