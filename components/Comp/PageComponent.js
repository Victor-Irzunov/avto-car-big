"use client"
import { Catalog } from "@/components/catalog/Catalog";
import FormPodborAvto from "@/components/Form/FormPodborAvto";
import { DataCar } from "@/constans/CarData";
import { MyContext } from "@/contexts/MyContextProvider";
import { observer } from 'mobx-react-lite';
import Image from "next/image";
import Link from "next/link";
import { transliterate } from "@/transliterate/transliterate";
import { useContext } from "react";


const titleLink = (brandName) => {
	return transliterate(brandName).replace(/\s+/g, '-').toLowerCase();
};

const PageComponent = observer(({ data }) => {
	console.log("🚀 🚀 🚀  _ Каталог _ data:", data)
	console.log("🚀 🚀 🚀  _ Кол-во авто: ", data.length)
	const { user } = useContext(MyContext)

	return (
		<main className='sd:py-16 xz:py-8 min-h-svh'>
			<div className='w-full bg-cover fon bg-center' />
			<section className='relative'>
				<div className='container mx-auto'>
					<div className='mb-5'>
						<h1 className='sd:text-5xl xz:text-3xl font-semibold text-center'>
							Каталог авто
						</h1>
					</div>
				</div>
				<div className='sd:container mx-auto'>
					<div className='bg-white/85 rounded-3xl sd:py-8 xz:py-5 sd:px-10 xz:px-2'>
						<div className=''>
							<div className='bg-[#1B1464] rounded-3xl sd:px-7 xz:px-4 py-9'>
								<h2 className='sd:block xz:hidden sd:text-5xl xz:text-3xl font-semibold text-white'>
									Быстрый подбор авто
								</h2>
								<h2 className='sd:hidden xz:block sd:text-5xl xz:text-3xl font-semibold text-white'>
									Подбор авто
								</h2>

								<div className='mt-6'>
									<FormPodborAvto />
								</div>
							</div>
						</div>

						<div className='container mx-auto'>
							<div className='mt-6 grid sd:grid-cols-5 xz:grid-cols-3 gap-1 sd:px-3 xz:px-1.5 relative'>
								<div className='col-span-4 grid grid-cols-3'>
									{DataCar.map((brand) => (
										<div key={brand.id} className=''>
											<Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${titleLink(brand.brand)}/`} className='sd:text-base xz:text-sm font-medium text-secondary'>
												{brand.brand}
											</Link>
										</div>
									))}
								</div>
								<div className=''>
									<div className='sticky top-9 bg-neutral rounded-3xl py-5 px-5 max-h-32 sd:flex xz:hidden justify-center items-center'>
										<Image src='/logo/logo.webp' alt='Логотип автосалона' width={200} height={200} className="" />
									</div>
								</div>
							</div>

						</div>
						<Catalog data={data} isAdmin={user.userData?.isAdmin} />
					</div>
				</div>

			</section>
		</main>
	)
})

export default PageComponent;
