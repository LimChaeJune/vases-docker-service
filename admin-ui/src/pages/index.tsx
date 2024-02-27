import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';

export const RootPage = () => {
  const [signup, setSignup] = useState(false);
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'100%'}
        height={'100%'}
        overflow={'hidden'}
        bg={'hsla(230, 0%, 96%, 1)'}
      >
        <Box
          boxShadow={'-5px -5px 10px #fff, 5px 5px 10px #babebc'}
          padding={'12px'}
          borderRadius={'12px'}
          display={'flex'}
          position={'relative'}
        >
          <Box
            display={'flex'}
            flexDir={'column'}
            gap={'20px'}
            justifyContent={'center'}
            alignItems={'center'}
            padding={'8px'}
          >
            <Heading>Sign In</Heading>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input type="email"></Input>
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password"></Input>
              <FormHelperText></FormHelperText>
            </FormControl>
            <Box display={'flex'} alignItems={'center'} gap={'4px'}>
              {/* <ButtonGroup
                size="sm"
                isAttached
                variant="outline"
                colorScheme="pink"
              >
                <IconButton aria-label="Add to friends" icon={<AddIcon />} />
              </ButtonGroup> */}
              <Button
                colorScheme="pink"
                size="sm"
                onClick={() => {
                  console.log('ttt');
                }}
              >
                SIGN IN
              </Button>
            </Box>
          </Box>

          <Box
            display={'flex'}
            flexDir={'column'}
            gap={'20px'}
            justifyContent={'center'}
            alignItems={'center'}
            padding={'8px'}
          >
            <Heading>Sign Up</Heading>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input type="email"></Input>
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password"></Input>
              <FormHelperText></FormHelperText>
            </FormControl>
            <Box display={'flex'} alignItems={'center'} gap={'4px'}>
              <Button
                size="sm"
                colorScheme="pink"
                onClick={() => {
                  console.log('회원가입 api ㄱㄱ');
                }}
              >
                SIGN UP
              </Button>
            </Box>
          </Box>
          <Box
            position={'absolute'}
            top={0}
            right={signup ? '50%' : '0'}
            bg={'#ff4b2b'}
            height={'100%'}
            width={'50%'}
            borderRadius={signup ? '12px 0px 0px 12px' : '0px 12px 12px 0px'}
            padding={'20px'}
            display={'flex'}
            flexDir={'column'}
            gap={'20px'}
            justifyContent={'center'}
            alignItems={'center'}
            transition={'all 0.5s'}
          >
            {!signup ? (
              <>
                <Heading color={'white'}>Welcome Back</Heading>
                <Box flex={1} />
                <Text color={'white'}>
                  To keep connected with us please login with your personal info
                </Text>
                <Box flex={1} />
                <Button
                  size="sm"
                  variant={'outline'}
                  colorScheme="pink"
                  onClick={() => {
                    setSignup(!signup);
                  }}
                >
                  SIGN UP
                </Button>
              </>
            ) : (
              <>
                <Heading color={'white'}>Welcome, Vases World</Heading>
                <Box flex={1} />
                <Text color={'white'}>
                  Enter your personal details and start journey with us
                </Text>
                <Box flex={1} />
                <Button
                  size="sm"
                  variant={'outline'}
                  colorScheme="pink"
                  onClick={() => {
                    setSignup(!signup);
                  }}
                >
                  SIGN IN
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
