'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { Tab, Tabs, Box, Typography } from '@mui/material';
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

interface CategoryData {
  category: string;
  titles: { title: string; totalViews: number }[];
}

const CategoryChart: React.FC = () => {
  const [data, setData] = useState<CategoryData[]>([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://n8rv8ni618.execute-api.eu-west-2.amazonaws.com/clases');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const videos: Video[] = await response.json();

        const groupedData: { [key: string]: { title: string; totalViews: number }[] } = {};

        videos.forEach(video => {
          if (!groupedData[video.category]) {
            groupedData[video.category] = [];
          }
          const formattedTitle = formatTitle(video.title);
          groupedData[video.category].push({ title: formattedTitle, totalViews: Math.min(video.totalViews, 10) });
        });

        const formattedData = Object.keys(groupedData).map(category => ({
          category,
          titles: groupedData[category],
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatTitle = (title: string): string => {
    const indexOfDot = title.indexOf('.');
    const trimmedTitle = indexOfDot !== -1 ? title.substring(indexOfDot + 1) : title;
    return trimmedTitle.length > 5 ? trimmedTitle.substring(0, 15) + '...' : trimmedTitle;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const currentCategory = data[value];

  return (
    <Box
      sx={{
        width: '85%',
        margin: '0 auto',
        maxWidth: '1200px',
        p: 3,
        height: '480px', // Height set to 480px
        overflow: 'hidden', // Prevent scrollbars
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" textColor="inherit">
        {data.map((category, index) => (
          <Tab
            key={index}
            label={category.category}
            sx={{
              fontWeight: 'bold', // Negrita
              color: 'white', // Color blanco
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ p: 3, height: '450px', overflowX: 'hidden' }}>
        {currentCategory && currentCategory.titles.length > 0 && (
          <>
            <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
              {currentCategory.category}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={currentCategory.titles}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="title"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12, fill: 'white' }}
                />
                <YAxis tick={{ fontSize: 12, fill: 'white' }} domain={[1, 10]} allowDecimals={false} />
                <Tooltip />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="totalViews" fill="#00d1d1" radius={[10, 10, 0, 0]} /> {/* Color y bordes redondeados */}
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CategoryChart;
