import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "./components/Header";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";

export const Home = () => {
  const { user, singOutGoogle } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      singOutGoogle();
      return navigate("/");
    }
  }, [user]);
  const pages = [
    { name: "Informações principais", path: "/informacao-principal" },
    { name: "Botões", path: "/botoes" },
  ];

  const handleGoPAge = (path: string) => {
    navigate(path);
  };
  return (
    <>
      <Box my={4}>
        <Heading textAlign={"center"} size={"md"}>
          Bem vindo, {user?.name}
        </Heading>
      </Box>
      <Text mt={4} textAlign={"center"}>
        Cadastros de informações
      </Text>
      <Container maxW="md">
        <Stack mt={4} gap={1}>
          {pages.map((item) => (
            <Button key={item.path} onClick={() => handleGoPAge(item.path)}>
              {item.name}
            </Button>
          ))}
        </Stack>
      </Container>
    </>
  );
};
