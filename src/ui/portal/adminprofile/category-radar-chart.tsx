import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  ReferenceLine, // Asegúrate de importar ReferenceLine si lo estás usando
} from 'recharts';

interface ChartData {
  subject: string;
  A: number;
}

const Example: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://f7zj4mts9l.execute-api.eu-west-2.amazonaws.com/favorites');
        const favorites = response.data.filter((item: { category: string; }) => item.category === 'favorites');
        const watchLater = response.data.filter((item: { category: string; }) => item.category === 'watchlater');

        const favoritesCount = favorites.length;
        const watchLaterCount = watchLater.length;
        const totalCount = favoritesCount + watchLaterCount;

        const chartData: ChartData[] = [
          {
            subject: 'Favoritos',
            A: (favoritesCount / totalCount) * 100,
          },
          {
            subject: 'Ver más tarde',
            A: (watchLaterCount / totalCount) * 100,
          },
        ];

        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" /> {/* Esto mostrará las categorías: 'Favoritos' y 'Ver más tarde' */}
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Porcentaje" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
        <ReferenceLine y={50} stroke="red" />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default Example;
