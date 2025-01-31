"use client";
import Image from 'next/image';
import { useState } from 'react';
// import { Link as LinkScroll } from 'react-scroll';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import phoneNumbers from '@/config/config';
import RunningText from '../RunningText/RunningText';

export default function Header() {
	const pathname = usePathname()
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	const closeDrawer = () => {
		setDrawerOpen(false);
	};

	return (
		<header className="z-40 relative">
			<RunningText />
			<div className='sd:pt-6 xz:pt-4 days-one-regular sd:mt-4 xz:mt-5'>
				<div className="sd:container mx-auto">
					<div className="flex justify-between items-center sd:py-3 xz:py-1 bg-white/90 rounded-xl sd:px-8 xz:px-3">

						{/* Desktop Menu */}
						<nav className="xz:hidden sd:block w-full">
							{
								pathname !== '/thank-you/' && pathname !== '/politika/' &&
								<ul className="flex items-center justify-between w-full text-xl p-0 tracking-wider font-semibold text-secondary">
									<li className=''>
										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
											className="cursor-pointer hover:text-primary"
										>
											<div className='text-secondary sd:block xz:hidden items-center text-3xl leading-none uppercase'>
												<p className='mb-0 pb-0 h-4'>
													avto
												</p>
												<span className='font-bold text-4xl pt-0 mt-0 h-0'>
													car
												</span>
											</div>
										</Link>
									</li>
									<li>
										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/catalog/`}
											className="cursor-pointer hover:text-primary"
										>
											Автомобили
										</Link>
									</li>
									<li>
										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/credit/`}
											className="cursor-pointer hover:text-primary"
										>
											Кредит
										</Link>
									</li>
									<li>
										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/lizing/`}
											className="cursor-pointer hover:text-primary"
										>
											Лизинг
										</Link>
									</li>
									<li>
										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/obmen/`}
											className="cursor-pointer hover:text-primary"
										>
											Обмен
										</Link>
									</li>
									{/* <li>
									<Link
										href={`${process.env.NEXT_PUBLIC_BASE_URL}/traid-in/`}
										className="cursor-pointer hover:text-primary"
									>
										Traid-in
									</Link>
								</li> */}
									<li>
										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/komissionnaya-prodazha/`}
											className="cursor-pointer hover:text-primary"
											onClick={closeDrawer}
										>
											Комиссионная продажа
										</Link>
									</li>
								</ul>
							}
						</nav>
						<Link
							href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
							className=""
						>
							<div className="sd:hidden xz:inline-flex">
								<div className='text-secondary items-center text-xl leading-none uppercase'>
									<p className='mb-0 pb-0 h-3'>
										avto
									</p>
									<span className='font-bold text-2xl pt-0 mt-0 h-0'>
										car
									</span>
								</div>
							</div>
						</Link>

						{/* Mobil */}
						<div className="sd:hidden xz:block">
							<div className="pt-2">
								<button onClick={toggleDrawer} aria-label="Toggle menu">
									<Image src='/svg/menu.svg' alt='Кнопка меню' width={35} height={35} />
								</button>
								{/* Drawer Menu */}
								<div className={`
								fixed top-0 right-0 w-80 z-50 text-secondary bg-base-100 h-full transform
								${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
								 transition-transform duration-300 ease-in-out
								 `}>
									<ul className="menu p-3 relative text-white text-xl font-semibold">
										<li className="mb-4">
											<div className='text-white flex flex-col items-center text-xl leading-none uppercase absolute right-3'>
												<p className='mb-0 pb-0 h-3'>
													avto
												</p>
												<span className='font-bold text-2xl pt-0 mt-0 h-0'>
													car
												</span>
											</div>
										</li>
										<li className='pt-20 mb-2'>
											<Link
												href={`${process.env.NEXT_PUBLIC_BASE_URL}/catalog/`}
												className="hover:text-primary"
												onClick={closeDrawer}
											>
												Автомобили
											</Link>
										</li>
										<li className='mb-2'>
											<Link
												href={`${process.env.NEXT_PUBLIC_BASE_URL}/vykup-avto/`}
												className="hover:text-primary"
												onClick={closeDrawer}
											>
												Выкуп авто
											</Link>
										</li>
										<li className='mb-2'>
											<Link
												href={`${process.env.NEXT_PUBLIC_BASE_URL}/komissionnaya-prodazha/`}
												className="hover:text-primary"
												onClick={closeDrawer}
											>
												Комиссионная продажа
											</Link>
										</li>
										<li className='mb-2'>
											<Link
												href={`${process.env.NEXT_PUBLIC_BASE_URL}/credit/`}
												className="hover:text-primary"
												onClick={closeDrawer}
											>
												Кредит
											</Link>
										</li>
										<li className='mb-2'>
											<Link
												href={`${process.env.NEXT_PUBLIC_BASE_URL}/lizing/`}
												className="hover:text-primary"
												onClick={closeDrawer}
											>
												Лизинг
											</Link>
										</li>
										<li className='mb-2'>
											<Link
												href={`${process.env.NEXT_PUBLIC_BASE_URL}/obmen/`}
												className="hover:text-primary"
												onClick={closeDrawer}
											>
												Обмен
											</Link>
										</li>
										<li className='mb-2'>
											<Link
												href={`${process.env.NEXT_PUBLIC_BASE_URL}/prigon-iz-es/`}
												className="hover:text-primary"
												onClick={closeDrawer}
											>
												Пригон из ЕС
											</Link>
										</li>
										{/* <li className='mb-2'>
										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/traid-in/`}
											className="hover:text-primary"
											onClick={closeDrawer}
										>
											Traid-in
										</Link>
									</li> */}
									</ul>

									<div className='absolute bottom-10 left-5 text-white mt-4'>
										<div className='flex items-center space-x-1'>
											<Image src='/svg/location-white.svg' alt='Адрес автосалона' width={40} height={40} />
											<a href='https://yandex.by/maps/-/CDd7nHZo' target='_blank' className='font-semibold'>
												Минск, ул. Куйбышева, 40, Паркинг 4 этаж
											</a>
										</div>
										<div className='flex items-center space-x-2 mt-4 pl-1'>
											<Image src='/svg/phone-white.svg' alt='Телефон автосалона' width={25} height={25} />
											<div className=''>
												<a href={`tel:${phoneNumbers.mainPhoneLink}`} className='font-semibold block'>
													{phoneNumbers.mainPhone}
												</a>
												<a href={`tel:${phoneNumbers.secondaryPhoneLink}`} className='font-semibold block mt-3'>
													{phoneNumbers.secondaryPhone}
												</a>
											</div>
										</div>
									</div>
									<button onClick={closeDrawer} className="absolute top-4 left-4 text-4xl text-white">
										&times;
									</button>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</header>
	);
}
