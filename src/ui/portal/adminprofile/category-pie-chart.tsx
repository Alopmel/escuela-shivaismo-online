'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Box, Typography } from '@mui/material';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

interface Video {
  lastModified: string;
  category: string;
  videoId: string;
  eTag: string;
  id: string;
  totalViews: number;
  title: string;
}

const CategoryPieChart: React.FC = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://n8rv8ni618.execute-api.eu-west-2.amazonaws.com/clases');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const videos: Video[] = await response.json();

        const categoryViews: { [key: string]: number } = {};
        let totalViews = 0;

        videos.forEach(video => {
          if (!categoryViews[video.category]) {
            categoryViews[video.category] = 0;
          }
          categoryViews[video.category] += video.totalViews;
          totalViews += video.totalViews;
        });

        const formattedData = Object.keys(categoryViews).map(category => ({
          name: category,
          value: (categoryViews[category] / totalViews) * 100, // Calcula el porcentaje
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#00d1d1', '#8884d8', '#ff6666', '#ffc658', '#82ca9d', '#d0ed57'];

  return (
    <Box
      sx={{
        width: '85%',
        margin: '0 auto',
        maxWidth: '1200px',
        p: 3,
        height: '480px',
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
        Porcentaje de Visitas por Categoría
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CategoryPieChart;
