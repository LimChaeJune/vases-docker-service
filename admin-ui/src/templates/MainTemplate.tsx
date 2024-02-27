import { Avatar, Box, Divider, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router';

export const MainTemplate = () => {
  console.log('tmeee');
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      height={'100%'}
      overflow={'hidden'}
    >
      <Box padding={'8px'} display={'flex'} alignItems={'center'}>
        <Heading size={'lg'}>Vases Admin Service</Heading>
        <Box flex={1}></Box>
        <Avatar name="SH KIM" size={'md'} />
      </Box>
      <Divider></Divider>
      <Box width={'100%'} height={'100%'} overflow={'hidden'} padding={'20px'}>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};
