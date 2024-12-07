"use client";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataCar } from '@/constans/CarData';
import qs from 'qs';
import { transliterate } from '@/transliterate/transliterate';

const engineOptions = ['Бензин', 'Дизель', 'Газ', 'Электро'];
const transmissionOptions = ['Автомат', 'Механика'];
const bodyTypeOptions = ['Седан', 'Универсал', 'Внедорожник', 'Минивэн', 'Хэтчбек', 'Микроавтобус', 'Купе', 'Кабриолет', 'Пикап', 'Другое'];
const driveOptions = ['Передний привод', 'Задний привод', 'Полный привод'];

const FormPodborAvto = () => {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [selectedDrive, setSelectedDrive] = useState('');

  const years = Array.from({ length: 2024 - 1990 + 1 }, (_, i) => 2024 - i);
  const prices = Array.from({ length: 200000 / 1000 }, (_, i) => (i + 1) * 1000);

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
    setSelectedGeneration('');
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
    setSelectedGeneration('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const brandPath = selectedBrand ? transliterate(selectedBrand).replace(/\s+/g, '-').toLowerCase() : '';
    const modelPath = selectedModel ? transliterate(selectedModel).replace(/\s+/g, '-').toLowerCase() : '';
    const basePath = selectedBrand ? `/auto/${brandPath}${selectedModel ? `/${modelPath}` : ''}` : '/auto';


    const query = {
      generation: selectedGeneration || undefined,
      yearFrom: yearFrom || undefined,
      yearTo: yearTo || undefined,
      priceFrom: priceFrom || undefined,
      priceTo: priceTo || undefined,
      currency,
      engine: selectedEngine || undefined,
      transmission: selectedTransmission || undefined,
      bodyType: selectedBodyType || undefined,
      drive: selectedDrive || undefined,
    };
    

    const queryString = qs.stringify(query, { skipNulls: true, addQueryPrefix: true });
    router.push(`${basePath}${queryString}`);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      {/* Выбор марки */}
      <div>
        <label className="label text-white">Марка</label>
        <select
          className="select select-bordered w-full bg-white text-black"
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          <option value="">Выберите марку</option>
          {DataCar.map((brand) => (
            <option key={brand.id} value={brand.brand}>
              {brand.brand}
            </option>
          ))}
        </select>
      </div>

      {/* Выбор модели */}
      <div>
        <label className="label text-white">Модель</label>
        <select
          className="select select-bordered w-full bg-white text-black"
          value={selectedModel}
          onChange={handleModelChange}
          disabled={!selectedBrand}
        >
          <option value="">Выберите модель</option>
          {selectedBrand &&
            DataCar.find((brand) => brand.brand === selectedBrand).type.map((model) => (
              <option key={model.id} value={model.model}>
                {model.model}
              </option>
            ))}
        </select>
      </div>

      {/* Поколение и годы */}
      <div className="col-span-2 flex gap-4">
        <div className="w-1/3">
          <label className="label text-white">Поколение</label>
          <select
            className="select select-bordered w-full bg-white text-black"
            value={selectedGeneration}
            onChange={(e) => setSelectedGeneration(e.target.value)}
            disabled={!selectedModel}
          >
            <option value="">Выберите поколение</option>
            {selectedBrand && selectedModel &&
              DataCar.find((brand) => brand.brand === selectedBrand)
                .type.find((model) => model.model === selectedModel)
                .generations.map((generation, idx) => (
                  <option key={idx} value={generation}>
                    {generation}
                  </option>
                ))}
          </select>
        </div>

        <div className="w-1/3">
          <label className="label text-white">Год от</label>
          <select className="select select-bordered w-full bg-white text-black" value={yearFrom} onChange={(e) => setYearFrom(e.target.value)}>
            <option value="">От</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          <label className="label text-white">Год до</label>
          <select className="select select-bordered w-full bg-white text-black" value={yearTo} onChange={(e) => setYearTo(e.target.value)}>
            <option value="">До</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>



      {/* Тип двигателя */}
      <div>
        <label className="label text-white">Тип двигателя</label>
        <select
          className="select select-bordered w-full bg-white text-black"
          value={selectedEngine}
          onChange={(e) => setSelectedEngine(e.target.value)}
        >
          <option value="">Выберите двигатель</option>
          {engineOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Тип трансмиссии */}
      <div>
        <label className="label text-white">Тип трансмиссии</label>
        <select
          className="select select-bordered w-full bg-white text-black"
          value={selectedTransmission}
          onChange={(e) => setSelectedTransmission(e.target.value)}
        >
          <option value="">Выберите трансмиссию</option>
          {transmissionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Тип кузова */}
      <div>
        <label className="label text-white">Тип кузова</label>
        <select
          className="select select-bordered w-full bg-white text-black"
          value={selectedBodyType}
          onChange={(e) => setSelectedBodyType(e.target.value)}
        >
          <option value="">Выберите кузов</option>
          {bodyTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Тип привода */}
      <div>
        <label className="label text-white">Тип привода</label>
        <select
          className="select select-bordered w-full bg-white text-black"
          value={selectedDrive}
          onChange={(e) => setSelectedDrive(e.target.value)}
        >
          <option value="">Выберите привод</option>
          {driveOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Цена */}
      <div className="col-span-2">
        <label className="label text-white">Цена</label>
        <div className="grid grid-cols-2 gap-4">
          <select className="select select-bordered w-full bg-white text-black" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)}>
            <option value="">От</option>
            {prices.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
          <select className="select select-bordered w-full bg-white text-black" value={priceTo} onChange={(e) => setPriceTo(e.target.value)}>
            <option value="">До</option>
            {prices.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>
      </div>


      {/* Валюта и кнопка поиска */}
      <div className="col-span-2 flex items-center">
        <select
          className="select select-bordered bg-white text-black w-1/3"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="BYN">BYN</option>
          <option value="USD">USD</option>
        </select>
        <button type="submit" className="ml-4 btn btn-primary bg-orange-500 text-white">
          <Image src='/svg/search-white2.svg' alt='Поиск авто' width={25} height={25} />
        </button>
      </div>
    </form>
  );
};

export default FormPodborAvto;
