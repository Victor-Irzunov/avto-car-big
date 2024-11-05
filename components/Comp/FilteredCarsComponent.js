"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllFilterCars } from '@/http/adminAPI';
import { Catalog } from '../catalog/Catalog';

export default function FilteredCarsComponent({ brand, model }) {
  const searchParams = useSearchParams();
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchFilteredCars = async () => {
      const queryParams = {
        brand: brand || null,
        model: model || null,
        generation: searchParams.get('generation') || null,
        yearFrom: searchParams.get('yearFrom') || null,
        yearTo: searchParams.get('yearTo') || null,
        priceFrom: searchParams.get('priceFrom') || null,
        priceTo: searchParams.get('priceTo') || null,
        currency: searchParams.get('currency') || null,
      };

      try {
        const cars = await getAllFilterCars(queryParams);
        setFilteredCars(cars);
      } catch (error) {
        console.error("Ошибка загрузки отфильтрованных автомобилей:", error);
      }
    };

    fetchFilteredCars();
  }, [searchParams, brand, model]);

  return <Catalog data={filteredCars} />;
}
