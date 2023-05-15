import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../Redux/Authentication/actions';
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
    Toast,
    useToast,
} from '@chakra-ui/react';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
    const [data, setData] = useState();

    const userData = useSelector((store) => {
        return store
    })

    const routeNavigate = () => {
        navigate("/login")
    }

    const successToast = (text, status) => {
        toast({
            title: `${text}`,
            status: status,
            isClosable: true,
            position: "top"
        })
    }

    const loginHandler = () => {
        let userData = {
            email: email,
            password: password,
        }
        dispatch(signup(userData, successToast, routeNavigate));

    }

    const handleGoogle = () => {
        window.location.href = 'http://localhost:8800/auth/google';
    }

    const getData=()=>{
        axios.get(`http://localhost:8800/auth/google/callback`).then((res) => {
            // console.log("loginUserData", res)
            data=res.data.profile
            successToast(res.data, "success")
        }).catch((error) => {
            successToast(error.name, "error")
            // console.log("error", error)
        })
    }

    // useEffect(()=>{
    //     getData();
    //     if (window.location.search.includes('code')) {
    //         getData();
    //       }
    // },[])
    

    return (
        <div>
            <Flex
                width={"100%"}
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} width={"40%"} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Register Here</Heading>
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
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Button onClick={routeNavigate}><Link color={'blue.400'}>Login</Link></Button>
                                </Text>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Login with google <Button onClick={handleGoogle}><FcGoogle /></Button>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </div>
    )
}

export default Login