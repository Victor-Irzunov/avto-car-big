import { PrismaClient } from '@prisma/client';
import PageComponent from "@/components/Comp/PageComponent";

const prisma = new PrismaClient();

async function getData() {
	try {
		const data = await prisma.car.findMany({
			include: { brand: true, model: true, generation: true },
			orderBy: [{ vip: 'desc' }, { createdAt: 'desc' }],
		});
		return data || [];
	} catch (error) {
		console.error("Ошибки при запросе:", error);
		return [];
	}
}

export const metadata = {
	title: "Купить авто c пробегом в Минске | Лизинг и Кредит | Каталог автосалона «AvtoCar»",
	description: "ᐈ ⭐ Автомобили с пробегом в самом крупном автосалоне Минска ⚡ Кредит и лизинг на б/у авто ➤➤➤ До 10 лет. ☎️ (33) 355-88-55 Автосалон «АвтоКар» ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Только проверенные авто ⭐ Без взоса ✓ Без справок и поручителей ✓ Звоните прямо сейчас!",
	alternates: { canonical: `/catalog/` },
	openGraph: {
		title: 'Купить авто c пробегом в Минске | Лизинг и Кредит | Каталог автосалона «AvtoCar»',
		description: 'ᐈ ⭐ Автомобили с пробегом в самом крупном автосалоне Минска ⚡ Кредит и лизинг на б/у авто ➤➤➤ До 10 лет.',
		type: 'website',
		images: ['/fon/fon6.webp'],
	},
};

// ISR
export async function generateStaticParams() { return []; }
export default async function Page() {
	const data = await getData();
	return <PageComponent data={data} />;
}
export const revalidate = 30;
