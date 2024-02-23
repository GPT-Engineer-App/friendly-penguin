import { Box, Button, Container, FormControl, FormLabel, Input, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://backengine-staging-61io.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "You are now logged in",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Failed",
          description: data.error || "An error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Cannot connect to the API",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://backengine-staging-61io.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        toast({
          title: "Signup Successful",
          description: "You can now login",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const data = await response.json();
        toast({
          title: "Signup Failed",
          description: data.error || "An error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Cannot connect to the API",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1">Welcome to Interactive API</Heading>
        <Text>Use the form below to log in or sign up.</Text>

        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <Button leftIcon={<FaSignInAlt />} colorScheme="blue" isLoading={isLoading} onClick={handleLogin}>
          Login
        </Button>

        <Button leftIcon={<FaUserPlus />} colorScheme="green" isLoading={isLoading} onClick={handleSignup}>
          Signup
        </Button>

        <Box>
          <Text fontSize="lg" mb={2}>
            Service Status:
          </Text>
          {/* Healthcheck Button */}
          <Button
            onClick={async () => {
              try {
                const response = await fetch("https://backengine-staging-61io.fly.dev/healthcheck");
                if (response.ok) {
                  toast({
                    title: "Service Online",
                    description: "The backend service is running",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: "Service Offline",
                    description: "The backend service is not available",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              } catch (error) {
                toast({
                  title: "Network Error",
                  description: "Cannot connect to the API",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              }
            }}
          >
            Check Health
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
