import CreditArticle from "@/components/Articles/CreditArticle";
import FormCredit from "@/components/Form/FormCredit";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCarData(id) {
	try {
		const car = await prisma.car.findUnique({
			where: { id: parseInt(id, 10) },
			include: {
				brand: true,
				model: true,
				generation: true,
			},
		});
		return car;
	} catch (error) {
		console.error("Ошибка при получении данных об автомобиле:", error);
		return null;
	}
}

export async function generateMetadata({ params: id }) {
	console.log("🚀 🚀 🚀  _ generateMetadata _ id:", id)
	const data = await getCarData(id.id);
	const id1 =  id.id

	let title1
	let description1

	if (data) {
		title1 = `${data.title} купить в кредит: выгодный автокредит в Минске`,
			description1 = `ᐈ ⭐ ${data.title} в кредит ⚡ Автокредит на выгодных условиях ⚡ кредит на ${data.title} бу ➤➤➤ До 10 лет. ☎️ (33) 355-88-55 ⚡ Большой выбор автомобилей ⚡ Помощь в выборе авто ⭐ Офомление в день подачи ⭐ Без взоса ✓ Без справок и поручителей. ✓ Звоните прямо сейчас!`
	}
	return {
		title: title1,
		description: description1,
		keywords: ``,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/credit/${id1}/${data.titleLink}`,
		},
		og: {
			title: title1,
			description: description1,
			type: 'website',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/credit/${id1}/${data.titleLink}`,
			image: 'public/logo/logo.webp',
		},
	};
}


const CreditPage = async ({ params: { id } }) => {
	const carData = await getCarData(id);

	if (!carData) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<button className="btn btn-square">
					<span className="loading loading-spinner"></span>
				</button>
				<p className="text-lg font-semibold">Загрузка данных об автомобиле...</p>
			</div>
		);
	}

	return (
		<main className='pt-20 pb-20 min-h-screen relative'>
			<div className='w-full bg-cover fon bg-center' />
			<section className='relative'>
				<div className='container mx-auto'>
					<h1 className='sd:text-5xl xz:text-3xl font-semibold text-white text-center'>
						Кредит на {carData.title}, {carData.year} г.
					</h1>

					<div className='mt-8'>
						<FormCredit carData={carData} />
					</div>

				</div>
				<div className='mt-24'>
					<CreditArticle />
				</div>
			</section>
		</main>
	);
};

export default CreditPage;
