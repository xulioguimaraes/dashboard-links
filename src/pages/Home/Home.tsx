import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { BsFillSendFill, BsPeopleFill } from "react-icons/bs";
import { CiGrid2H } from "react-icons/ci";
import { MdFormatAlignJustify } from "react-icons/md";
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
    {
      name: "Informações principais",
      path: "/informacao-principal",
      icon: <MdFormatAlignJustify />,
    },
    { name: "Botões", path: "/botoes", icon: <CiGrid2H /> },
    { name: "Redes Sociais", path: "/redes-sociais", icon: <BsPeopleFill /> },
  ];

  const handleGoPage = (path: string) => {
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
      <Stack
        w={"100%"}
        align={"center"}
        justify={"flex-start"}
        direction={"row"}
        mt={4}
        overflowX={"auto"}
      >
        {pages.map((item) => (
          <Button
            key={item.path}
            borderRadius="full"
            minW={"fit-content"}
            variant={"outline"}
            colorScheme="blue"
            onClick={() => handleGoPage(item.path)}
            leftIcon={item.icon}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
      <Center mt={4}>
        <Button
          as={"a"}
          href={`${import.meta.env.VITE_API_SITE_URL}/${user?.id}`}
          colorScheme="blue"
          leftIcon={<BsFillSendFill />}
        >
          Ir para pagina
        </Button>
      </Center>

      <Box
        transform={"scale(0.8)"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        w={"100%"}
      >
        <Box position={"relative"} width="375px" height="667px">
          <iframe
            title="Site emulado"
            src={`${import.meta.env.VITE_API_SITE_URL}/${user?.id}`}
            style={{
              width: "99%",
              height: "100%",
              zoom: "80%",
              transform: "scale(0.8)",
              border: "14px solid",
              borderRadius: "40px",
              color: "#3182ce",
            }}
          ></iframe>
        </Box>
      </Box>
    </>
  );
};
