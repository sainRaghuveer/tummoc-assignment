import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../Redux/Authentication/actions';
import { useNavigate, useLocation } from "react-router-dom";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    const successToast=(text, status)=>{
        toast({
            title: `${text}`,
            status: status,
            isClosable: true,
            position:"top"
          })
    };

    const routeNavigate=()=>{
        navigate("/home")
    }

    const userLoggedData=useSelector((store)=>{
        return store
    })

    const loginHandler = () => {
        let userData = {
            email: email,
            password: password,
        }

        dispatch(login(userData, successToast, routeNavigate));
    }

    return (
        <div>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} width={"40%"} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Login in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    onClick={loginHandler}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </div>
    )
}

export default Login