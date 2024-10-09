'use client';

import React from 'react';
import { Box } from '@mui/material';
import CategoryPieChart from './category-pie-chart'; // Asegúrate de importar el componente correcto
import CategoryChart from './category-chart'; // Asegúrate de importar el componente correcto
import CategoryRadarChart from './category-radar-chart';

const AdminChart: React.FC = () => {
  return (
    <Box
      sx={{
        width: '85%',
        margin: '0 auto',
        maxWidth: '1200px',
        p: 3,
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <CategoryPieChart />
      <CategoryChart />
    </Box>
  );
};

export default AdminChart;
