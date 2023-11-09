import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import { Box, Button, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import imageHome from "../../images/login.png";
import { FcLink } from "react-icons/fc";
export const Login = () => {
  const { user, singInWithGoogle } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      toast({
        title: `Bem vindo, ${user.name}`,
        status: "success",
        variant: "left-accent",
        isClosable: true,
      });

      return navigate("/home");
    }
  }, [user]);
  const handleLogin = () => {
    if (!user) {
      return singInWithGoogle();
    }
  };

  return (
    <Stack w={"100%"} height={"100vh"} justify={"center"} align={"center"}>
      <Stack direction={"row"}>
        <Box maxH={"460px"} display={["none", "none", "flex"]}>
          <img
            style={{
              maxHeight: "560px",
              objectFit: "cover",
              overflow: "visible",
            }}
            src={imageHome}
          />
        </Box>
        <Box
          p={6}
          maxW={"380px"}
          shadow={"2xl"}
          ml={[0, 0, 6]}
          borderRadius={"lg"}
        >
          <Box w={"full"} display={"flex"} justifyContent={"center"}>
            <FcLink fontSize={"60px"} />
          </Box>
          <Stack justify={"center"} alignItems={"center"}>
            <Heading fontSize={"2xl"}>Links</Heading>
            <Text textAlign={"center"} mt={4} mb={8}>
              Bem vindo a Links, aqui você pode criar uma pagina para colocar no
              bio do seu instagram contendo a 5 botões para o redirecionamento
              do seu conteudo.
            </Text>
            <Text fontSize={"sm"} textAlign={"center"}>
              Faça o login usando sua conta Google e aproveite
            </Text>
          </Stack>
          <Stack pt={20}>
            <Button
              isDisabled={!!user}
              borderRadius={"full"}
              width={"full"}
              leftIcon={<FaGoogle />}
              colorScheme="blue"
              onClick={handleLogin}
            >
              Fazer Login
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};
