"use client"
import Image from "next/image";
import Link from "next/link";
import phoneNumbers from "@/config/config";
import { observer } from "mobx-react-lite";
import { MyContext } from "@/contexts/MyContextProvider";
import { useContext } from "react";

const Footer = observer(() => {
	const { user } = useContext(MyContext)

	return (
		<footer className={`pt-10 pb-2 relative bg-[#2D3192] text-[#12142B]`} id='contacts'>
			<div className='container mx-auto'>

				<aside className='grid sd:grid-cols-4 xz:grid-cols-1 gap-4'>

					<div className='flex flex-col justify-between'>
						<div className=''>
							<Image
								src='/logo/logo3.webp'
								alt='Логотип автосалона - продажа авто в кредит и лизинг'
								width={150} height={150}
								className=""
							/>
						</div>
						{/* <p className='text-xs'>
							ООО «АВТОКАРГРУПП» УНП 193846922, г. Минск, ул. пер. С.Ковалевской, д.54 к.1 каб.303-127
						</p> */}
						
					</div>

					<div className=''>
						<p className='text-xl'>
							Разделы
						</p>
						<ul className="mt-1 grid grid-cols-1 xz:grid-cols-2 sd:grid-cols-1 gap-2">
							<li className=''>
								<Link
									href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
									className="hover:text-primary"
								>
									Автомобили
								</Link>
							</li>
							<li className=''>
								<Link
									href={`${process.env.NEXT_PUBLIC_BASE_URL}/vykup-avto/`}
									className="hover:text-primary"
								>
									Выкуп авто
								</Link>
							</li>
							<li className=''>
								<Link
									href={`${process.env.NEXT_PUBLIC_BASE_URL}/komissionnaya-prodazha/`}
									className="hover:text-primary"
								>
									Комиссионная продажа
								</Link>
							</li>
							<li className=''>
								<Link
									href={`${process.env.NEXT_PUBLIC_BASE_URL}/credit/`}
									className="hover:text-primary"
								>
									Кредит
								</Link>
							</li>
							<li className=''>
								<Link
									href={`${process.env.NEXT_PUBLIC_BASE_URL}/lizing/`}
									className="hover:text-primary"
								>
									Лизинг
								</Link>
							</li>
							<li className=''>
								<Link
									href={`${process.env.NEXT_PUBLIC_BASE_URL}/obmen/`}
									className="hover:text-primary"
								>
									Обмен
								</Link>
							</li>
							<li className=''>
								<Link
									href={`${process.env.NEXT_PUBLIC_BASE_URL}/prigon-iz-es/`}
									className="hover:text-primary"
								>
									Пригон из ЕС
								</Link>
							</li>
							{/* <li className=''>
								<Link
									href={`${process.env.NEXT_PUBLIC_BASE_URL}/traid-in/`}
									className="hover:text-primary"
								>
									Traid-in
								</Link>
							</li> */}
							<li className=''>
								{
									user.userData?.isAdmin ?
										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/super-admin/`}
											className="cursor-pointer hover:text-primary"
										>
											<p className=''>
												Админ панель
											</p>
										</Link>
										:
										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/login/`}
											className="cursor-pointer hover:text-primary"
										>
											<Image src='/svg/entrance.svg' alt='Вход' width={25} height={25} />
										</Link>
								}

							</li>
						</ul>
					</div>


					<div className='sd:mt-0 xz:mt-4'>
						<div className=''>
							<p className='text-xl'>
								Адрес
							</p>
							<p className='mt-1'>
								Минск, ул. Куйбышева 40, Паркинг 4 этаж
							</p>
						</div>
						<div className='mt-4'>
							<p className='text-xl'>
								Почта
							</p>
							<p className='mt-1'>
								Avg30@bk.ru
							</p>
						</div>
					</div>

					<div className='sd:mt-0 xz:mt-4'>
						<div className=''>
							<p className='text-xl'>
								Время
							</p>
							<p className='mt-1'>
								С 10:00-20:00 Без выходных
							</p>
						</div>
						<div className='mt-4'>
							<p className='text-xl'>
								Телефон
							</p>
							<a href={`tel:${phoneNumbers.mainPhoneLink}`} className='mt-1 block'>
								{phoneNumbers.mainPhone} A1
							</a>
							<a href={`tel:${phoneNumbers.secondaryPhoneLink}`} className='mt-2 block'>
								{phoneNumbers.secondaryPhone} МТС
							</a>
							<a href={`tel:${phoneNumbers.thirdPhoneLink}`} className='mt-2 block'>
								{phoneNumbers.thirdPhone} МТС
							</a>
						</div>
					</div>
				</aside>
				<aside className='mt-8'>
					<p className='text-xs'>
						ООО «АВТОКАРГРУПП» УНП 193846922, г. Минск, ул. пер. С.Ковалевской, д.54 к.1 каб.303-127
					</p>
					<div className='text-[10px] sd:mt-0 xz:mt-4'>
						<p className=''>
							Банк: ЗАО «Альфа-Банк»,
						</p>
						<p className=''>
							г. Минск, ул. Сурганова, 43-47
						</p>
						<p className=''>
							БИК банка: ALFABY2X
						</p>
						<p className=''>
							р/с: BY40 ALFA 3012 2G50 3400 1027 0000
						</p>
					</div>
				</aside>
			</div>
			<aside className="border-t border-gray-800 pt-1 mt-6">
				<div className='container mx-auto text-center '>
					<p className='text-blue-950 text-[10px]' >
						Copyright © 2024 | Разработка и Продвижение
						<a href='https://vi-tech.by' target='_blank' rel="noreferrer" className=''> VI:TECH</a>.
						{' '}Информация на сайте не является публичной офертой и предоставляется исключительно в информационных целях.
					</p>
				</div>
			</aside>
		</footer>
	)
})

export default Footer