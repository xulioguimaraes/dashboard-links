import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsFillSendFill, BsPeopleFill } from "react-icons/bs";
import { CiGrid2H } from "react-icons/ci";
import { MdFormatAlignJustify } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
export const Home = () => {
  const { user, singOutGoogle } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

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
  const linkFromUser = `${import.meta.env.VITE_API_SITE_URL}/${user?.id}`;
  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = linkFromUser;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(textArea);
    toast({
      title: `Link copiado para a área de transferência!`,
      status: "success",
      isClosable: true,
      variant: "left-accent",
    });
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
      <Center mt={4} gap={2}>
        <Button
          as={"a"}
          href={linkFromUser}
          colorScheme="blue"
          leftIcon={<BsFillSendFill />}
        >
          Ir para pagina
        </Button>
        <IconButton onClick={copyToClipboard} aria-label={"Botão para copiar"}>
          <FaCopy />
        </IconButton>
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
            src={linkFromUser}
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
