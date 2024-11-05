"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DatePicker, ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/ru_RU';
import { sendOrderTelegram } from "@/http/telegramAPI";
import { dollarExchangeRate } from "@/Api-bank/api";

const getYearSuffix = (years) => {
	if (years <= 1) return 'год';
	if (years >= 2 && years <= 4) return 'года';
	return 'лет';
};

const FormCredit = ({ carData }) => {
	const [creditTerm, setCreditTerm] = useState(4);
	const [initialPayment, setInitialPayment] = useState('');
	const [officialSalary, setOfficialSalary] = useState('');
	const [currentCreditPayment, setCurrentCreditPayment] = useState('');
	const [childrenCount, setChildrenCount] = useState('');
	const [monthlyPayment, setMonthlyPayment] = useState('');
	const [dollar, serDollar] = useState(null)
	const [formData, setFormData] = useState({
		surname: '',
		phone: '',
		name: '',
		email: '',
		middleName: '',
		birthDate: '',
		gender: '',
		maritalStatus: '',
		conviction: '',
		driverLicense: '',
		incomeCertificate: '',
		jobExperience: '',
		jobPlace: ''
	});

	useEffect(() => {
		dollarExchangeRate().then(data => {
			serDollar(data.data.Cur_OfficialRate)
		})
	}, [])

	const priceBYN = parseFloat((carData.priceUSD * dollar).toFixed(0));

	// Функция для расчета ежемесячного платежа
	const calculateMonthlyPayment = () => {
		const loanAmount = carData.priceUSD - parseFloat(initialPayment || 0);
		const months = creditTerm * 12;
		if (months > 0) {
			const monthly = loanAmount / months;
			setMonthlyPayment(monthly.toFixed(2)); // округление до сотых
		} else {
			setMonthlyPayment(''); // если срок кредита не задан, очищаем значение
		}
	};

	useEffect(() => {
		if (carData.priceUSD && creditTerm) {
			calculateMonthlyPayment();
		}
	}, [carData.priceUSD, creditTerm, initialPayment]);

	const handleCreditTermChange = (e) => {
		setCreditTerm(parseInt(e.target.value, 10));
	};

	const handleChildrenCountChange = (e) => {
		setChildrenCount(e.target.value);
	};

	const handleDateChange = (date, dateString) => {
		setFormData((prevData) => ({
			...prevData,
			birthDate: dateString,
		}));
	};

	const handleChange = (e) => {
		if (e.target && e.target.name) {
			const { name, value } = e.target;
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const dataToSend = {
			...formData,
			creditTerm,
			initialPayment,
			officialSalary,
			currentCreditPayment,
			childrenCount,
			carId: carData.id,
			priceUSD: carData.priceUSD,
			carTitle: carData.title,
			carYear: carData.year,
			engineCapacity: carData.engineCapacity
		};

		let messageForm = `<b>Заказ с сайта Автосалона:</b>\n`;
		messageForm += `<b>Автомобиль:</b> ${carData.title}, ${carData.year} г.\n`;
		messageForm += `<b>id:</b> ${carData.id} \n`;
		messageForm += `<b>Цена:</b> ${carData.priceUSD} USD / ${carData.priceBYN} BYN\n`;
		messageForm += `<b>Объем двигателя:</b> ${carData.engineCapacity}\n`;
		messageForm += `<b>Тип двигателя:</b> ${carData.engine}\n`;
		messageForm += `<b>Коробка передач:</b> ${carData.transmission}\n`;
		messageForm += `<b>Привод:</b> ${carData.drive}\n\n`;

		// Данные клиента
		messageForm += `<b>Фамилия:</b> ${formData.surname || 'Не указано'}\n`;
		messageForm += `<b>Имя:</b> ${formData.name || 'Не указано'}\n`;
		messageForm += `<b>Отчество:</b> ${formData.middleName || 'Не указано'}\n`;
		messageForm += `<b>Телефон:</b> <a href='tel:${formData.phone}'>${formData.phone || 'Не указано'}</a>\n`;
		messageForm += `<b>E-mail:</b> ${formData.email || 'Не указано'}\n`;
		messageForm += `<b>Дата рождения:</b> ${formData.birthDate || 'Не указано'}\n\n`;

		// Дополнительные данные клиента
		messageForm += `<b>Пол:</b> ${formData.gender === 'male' ? 'Мужской' : formData.gender === 'female' ? 'Женский' : 'Не указано'}\n`;
		messageForm += `<b>Семейное положение:</b> ${formData.maritalStatus === 'married' ? 'В браке' : formData.maritalStatus === 'single' ? 'Холост/Не замужем' : 'Не указано'}\n`;
		messageForm += `<b>Судимость:</b> ${formData.conviction === 'yes' ? 'Есть' : formData.conviction === 'no' ? 'Нет' : 'Не указано'}\n`;
		messageForm += `<b>Количество детей до 18 лет:</b> ${childrenCount || 'Не указано'}\n`;
		messageForm += `<b>Наличие водительского удостоверения:</b> ${formData.driverLicense === 'yes' ? 'Есть' : formData.driverLicense === 'no' ? 'Нет' : 'Не указано'}\n`;
		messageForm += `<b>Наличие справки о доходах:</b> ${formData.incomeCertificate === 'yes' ? 'Есть' : formData.incomeCertificate === 'no' ? 'Нет' : 'Не указано'}\n`;
		messageForm += `<b>Место работы:</b> ${formData.jobPlace || 'Не указано'}\n`;
		messageForm += `<b>Стаж работы:</b> ${formData.jobExperience || 'Не указано'} лет\n\n`;

		// Финансовые данные
		messageForm += `<b>Срок кредитования:</b> ${creditTerm} ${getYearSuffix(creditTerm)}\n`;
		messageForm += `<b>Первоначальный взнос:</b> ${initialPayment || 'Не указано'} BYN\n`;
		messageForm += `<b>Официальная зарплата:</b> ${officialSalary || 'Не указано'} BYN\n`;
		messageForm += `<b>Платежи по действующему кредиту:</b> ${currentCreditPayment || 'Не указано'} BYN\n`;


		console.log("🚀 🚀 🚀  _ handleSubmit _ dataToSend:", dataToSend);

		sendOrderTelegram(messageForm)
			.then(data => {

			})

		try {
			const response = await fetch('/api/credit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataToSend),
			});

			if (response.ok) {
				alert("Данные успешно отправлены!");
			} else {
				alert("Ошибка при отправке данных.");
			}
		} catch (error) {
			alert("Ошибка: " + error.message);
		}
	};

	return (
		<div className="mt-10">
			<form onSubmit={handleSubmit} className=' text-white'>


				<div className='bg-blue-800/50 py-8 sd:px-8 xz:px-4 rounded-3xl'>
					<h2 className="text-center text-3xl font-semibold mb-6">Кредитный калькулятор</h2>
					{/* Right Side: Car Details */}
					<div className="sd:hidden xz:block space-y-4">
						<div className="card bg-gray-100 rounded-lg text-black">
							<figure className="relative">
								<div className="carousel w-full h-full">
									{JSON.parse(carData.images).map((image, index) => (
										<div key={index} className="carousel-item w-full mx-0.5">
											<Image
												src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${image.original}`}
												alt={carData.title}
												className="w-full h-full object-cover"
												// objectFit="cover"
												width={250}
												height={250}
											/>
										</div>
									))}
									<div className='absolute bottom-1 right-1'>
										<Image src='/svg/left-right.svg' alt='Рука и палец для фото влево и вправо' width={25} height={25} />
									</div>
								</div>
							</figure>
							<div className="py-4 px-2">
								<Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/catalog/${carData.id}/${carData.titleLink}`}>
									<h3 className="text-xl font-semibold text-secondary">
										{carData.title}
									</h3>
								</Link>
								<p className='text-primary sd:text-lg xz:text-sm'>
									{carData.priceUSD} USD <span className="font-semibold sd:text-xl xz:text-base">/ {priceBYN} BYN</span>
								</p>
								<ul className='text-[#333333] sd:text-sm xz:text-xs'>
									<li className='flex justify-between mb-1'>
										<span>Объём</span>
										<span className="text-secondary">{carData.engineCapacity}</span>
									</li>
									<li className='flex justify-between mb-1'>
										<span>Год</span>
										<span className="text-secondary">{carData.year}г.</span>
									</li>
									<li className='flex justify-between mb-1'>
										<span>Пробег</span>
										<span className="text-secondary">{carData.mileage}</span>
									</li>
									<li className='flex justify-between mb-1'>
										<span>Тип двигателя</span>
										<span className="text-secondary">{carData.engine}</span>
									</li>
									<li className='flex justify-between mb-1'>
										<span>Коробка передач</span>
										<span className="text-secondary">{carData.transmission}</span>
									</li>
									<li className='flex justify-between mb-1'>
										<span>Привод</span>
										<span className="text-secondary">{carData.drive}</span>
									</li>
								</ul>

							</div>
						</div>
					</div>

					{/* Поля формы */}
					<div className="sd:text-base xz:text-sm grid sd:grid-cols-3 xz:grid-cols-1 gap-4 sd:mt-0 xz:mt-7 relative">
						<div className="sd:col-span-2 xz:col-span-1 space-y-8">
							<div className="grid sd:grid-cols-2 xz:grid-cols-1 gap-4">
								<input type="text" name="surname"
									placeholder="Фамилия"
									className="input input-bordered w-full bg-white text-black rounded-full"
									onChange={handleChange}
								/>
								<input type="text" name="phone"
									placeholder="Телефон"
									className="input input-bordered w-full bg-white text-black rounded-full"
									onChange={handleChange}
								/>
								<input type="text"
									name="name"
									placeholder="Имя"
									className="input input-bordered w-full bg-white text-black rounded-full"
									onChange={handleChange}
								/>
								<input type="email"
									name="email"
									placeholder="E-mail"
									className="input input-bordered w-full bg-white text-black rounded-full"
									onChange={handleChange}
								/>
								<input type="text"
									name="middleName"
									placeholder="Отчество"
									className="input input-bordered w-full bg-white text-black rounded-full"
									onChange={handleChange}
								/>
								<ConfigProvider locale={locale}>
									<DatePicker
										onChange={handleDateChange}
										name="birthDate"
										placeholder="дд/мм/гггг"
										format="DD/MM/YYYY"
										className="input input-bordered w-full bg-white text-black rounded-full font-bold"
									/>
								</ConfigProvider>
								{/* <input type="date" name="birthDate" className="input input-bordered w-full bg-white text-black rounded-full" onChange={handleChange} /> */}
							</div>

							{/* Пол и семейное положение */}
							<div className="space-y-4">
								<div className='grid sd:grid-cols-2 xz:grid-cols-1 gap-4'>
									<div className='space-y-4'>
										<div className="flex flex-col space-y-3">
											<span>Пол:</span>
											<label className="flex items-center space-x-2">
												<input type="radio" name="gender" value="male" className="radio radio-primary" onChange={handleChange} />
												<span>Мужской</span>
											</label>
											<label className="flex items-center space-x-2">
												<input type="radio" name="gender" value="female" className="radio radio-primary" onChange={handleChange} />
												<span>Женский</span>
											</label>
										</div>
										<div className="flex flex-col space-y-3">
											<span>Семейное положение:</span>
											<label className="flex items-center space-x-2">
												<input type="radio" name="maritalStatus" value="married" className="radio radio-primary" onChange={handleChange} />
												<span>В браке</span>
											</label>
											<label className="flex items-center space-x-2">
												<input type="radio" name="maritalStatus" value="single" className="radio radio-primary" onChange={handleChange} />
												<span>Холост/Не замужем</span>
											</label>
										</div>
									</div>

									<div className=''>
										<div className="flex flex-col space-y-3">
											<span>Судимость:</span>
											<label className="flex items-center space-x-2">
												<input type="radio" name="conviction" value="no" className="radio radio-primary" onChange={handleChange} />
												<span>Нет</span>
											</label>
											<label className="flex items-center space-x-2">
												<input type="radio" name="conviction" value="yes" className="radio radio-primary" onChange={handleChange} />
												<span>Есть</span>
											</label>
										</div>

										<div className="flex flex-col space-y-3 mt-5">
											<span>Кол-во детей до 18 лет:</span>
											<input
												type="number"
												value={childrenCount}
												onChange={handleChildrenCountChange}
												className="input input-bordered bg-white text-black w-40 rounded-full"
											/>
										</div>
									</div>
								</div>

								<div className='grid sd:grid-cols-2 xz:grid-cols-1 gap-4'>
									<div className="flex flex-col  xz:space-y-3">
										<span>Наличие водительского удостоверения:</span>
										<label className="flex items-center space-x-2">
											<input type="radio" name="driverLicense" value="no" className="radio radio-primary" onChange={handleChange} />
											<span>Нет</span>
										</label>
										<label className="flex items-center space-x-2">
											<input type="radio" name="driverLicense" value="yes" className="radio radio-primary" onChange={handleChange} />
											<span>Есть</span>
										</label>
									</div>

									{/* Наличие справки о доходах */}
									<div className="flex flex-col  xz:space-y-3">
										<span>Наличие справки о доходах:</span>
										<label className="flex items-center space-x-2">
											<input type="radio" name="incomeCertificate" value="no" className="radio radio-primary" onChange={handleChange} />
											<span>Нет</span>
										</label>
										<label className="flex items-center space-x-2">
											<input type="radio" name="incomeCertificate" value="yes" className="radio radio-primary" onChange={handleChange} />
											<span>Есть</span>
										</label>
									</div>
								</div>
							</div>
							<div className='grid sd:grid-cols-2 xz:grid-cols-1 gap-4'>
								{/* Другие поля */}
								<input type="text" name="jobPlace" placeholder="Место работы" className="input input-bordered w-full bg-white text-black rounded-full" onChange={handleChange} />

								{/* Стаж работы */}
								<input type="number" name="jobExperience" placeholder="Стаж работы" className="input input-bordered w-full bg-white text-black rounded-full" onChange={handleChange} />
							</div>
							{/* Официальная зарплата и текущие кредитные платежи */}
							<div className="grid sd:grid-cols-2 xz:grid-cols-1 gap-4">
								<div className="flex flex-col items-center">
									<span>Официальная зарплата</span>
									<input
										type="number"
										value={officialSalary}
										onChange={(e) => setOfficialSalary(e.target.value)}
										className="input input-bordered w-full bg-white text-black rounded-full"
									/>
									<span className="ml-2">BYN</span>
								</div>
								<div className="flex flex-col items-center">
									<span>Платежи по действующему кредиту</span>
									<input
										type="number"
										value={currentCreditPayment}
										onChange={(e) => setCurrentCreditPayment(e.target.value)}
										className="input input-bordered w-full bg-white text-black rounded-full"
									/>
									<span className="ml-2">BYN</span>
								</div>
							</div>
						</div>

						{/* Right Side: Car Details */}
						<div className="sd:block xz:hidden space-y-4">
							<div className="card bg-gray-100 rounded-lg text-black sticky top-10">
								<figure className="relative">
									<div className="carousel w-full h-full">
										{JSON.parse(carData.images).map((image, index) => (
											<div key={index} className="carousel-item w-full mx-0.5">
												<Image
													src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${image.original}`}
													alt={carData.title}
													className="w-full h-full object-cover"
													// objectFit="cover"
													width={250}
													height={250}
												/>
											</div>
										))}
										<div className='absolute bottom-1 right-1'>
											<Image src='/svg/left-right.svg' alt='Рука и палец для фото влево и вправо' width={25} height={25} />
										</div>
									</div>
								</figure>
								<div className="py-4 px-2">
									<Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/catalog/${carData.id}/${carData.titleLink}`}>
										<h3 className="text-xl font-semibold text-secondary">
											{carData.title}
										</h3>
									</Link>
									<p className='text-primary sd:text-lg xz:text-sm'>
										{carData.priceUSD} USD <span className="font-semibold sd:text-xl xz:text-base">/ {priceBYN} BYN</span>
									</p>
									<ul className='text-[#333333] sd:text-sm xz:text-xs'>
										<li className='flex justify-between mb-1'>
											<span>Объём</span>
											<span className="text-secondary">{carData.engineCapacity}</span>
										</li>
										<li className='flex justify-between mb-1'>
											<span>Год</span>
											<span className="text-secondary">{carData.year}г.</span>
										</li>
										<li className='flex justify-between mb-1'>
											<span>Пробег</span>
											<span className="text-secondary">{carData.mileage}</span>
										</li>
										<li className='flex justify-between mb-1'>
											<span>Тип двигателя</span>
											<span className="text-secondary">{carData.engine}</span>
										</li>
										<li className='flex justify-between mb-1'>
											<span>Коробка передач</span>
											<span className="text-secondary">{carData.transmission}</span>
										</li>
										<li className='flex justify-between mb-1'>
											<span>Привод</span>
											<span className="text-secondary">{carData.drive}</span>
										</li>
									</ul>

								</div>
							</div>
						</div>
					</div>
				</div>


				<div className='grid sd:grid-cols-2 xz:grid-cols-1 gap-12 mt-10'>
					<div className='space-y-8'>
						<div className="space-x-4">
							<span>Срок кредитования</span>
							<div className='flex flex-col mt-3'>
								<input
									type="range"
									min={1}
									max="8"
									value={creditTerm}
									onChange={handleCreditTermChange}
									className="range"
									step="1"
								/>
								<div className="flex w-full justify-between px-2 text-xs">
									{Array.from({ length: 8 }).map((_, i) => (
										<span key={i}>|</span>
									))}
								</div>
							</div>
							<span className="text-primary">
								{creditTerm} {getYearSuffix(creditTerm)}
							</span>
						</div>
						<div>
							<span>Первоначальный взнос:</span>
							<div className="flex items-center mt-3">
								<input
									type="number"
									value={initialPayment}
									onChange={(e) => setInitialPayment(e.target.value)}
									className="input input-bordered bg-white text-black w-40 rounded-full"
								/>
								<span className="ml-2">BYN</span>
							</div>
						</div>
					</div>

					{/* Final Payment Details */}
					<div className="mt-4 space-y-6">
						<div className="flex sd:flex-row xz:flex-col sd:items-center xz:items-start">
							<span>Цена авто: </span>
							<span className="text-primary ml-2 font-semibold sd:text-xl xz:text-base">
								{carData.priceUSD} USD <span className="">/ {priceBYN} BYN</span></span>
						</div>
						<div>
							<span>Ежемесячный платеж:</span>
							<div className="flex items-center">
								<span className="text-primary font-bold text-lg">
									{monthlyPayment} USD / {parseFloat((monthlyPayment * dollar).toFixed(1))} BYN
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Отправка формы */}
				<button type="submit" className="btn btn-primary text-white rounded-full mt-12">Отправить заявку</button>
			</form >
		</div >
	);
};

export default FormCredit;
