'use client';

import { Button } from '@/components/ui/button';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      HomePage
      <Button onClick={() => console.log('clicked')}>Button</Button>
    </div>
  );
};

export default HomePage;
