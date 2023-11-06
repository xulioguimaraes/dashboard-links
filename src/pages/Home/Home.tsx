import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  IconButton,
  useBreakpoint,
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
  const breakpoint = useBreakpoint();
  const isSm = breakpoint === "sm" || breakpoint === "base";
  useEffect(() => {
    if (!user) {
      singOutGoogle();
      return navigate("/");
    }
  }, [user]);
  const pages = [
    {
      name: "Dados básicos",
      path: "/informacao-principal",
      icon: <MdFormatAlignJustify />,
    },
    { name: "Links", path: "/botoes", icon: <CiGrid2H /> },
    { name: "Redes Sociais", path: "/redes-sociais", icon: <BsPeopleFill /> },
  ];

  const handleGoPage = (path: string) => {
    navigate(path);
  };
  const linkFromUser = `${import.meta.env.VITE_API_SITE_URL}${user?.id}`;
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
      <Center>
        <ButtonGroup
          variant="outline"
          w={["full", "auto"]}
          isAttached
          orientation={isSm ? "vertical" : "horizontal"}
        >
          {pages.map((item) => (
            <Button
              justifyContent={"flex-start"}
              key={item.path}
              colorScheme="blue"
              onClick={() => handleGoPage(item.path)}
              leftIcon={item.icon}
            >
              {item.name}
            </Button>
          ))}
        </ButtonGroup>
      </Center>

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

      <Center transform={"scale(0.9)"}>
        <Box width="375px" height="667px">
          <iframe
            title="Site emulado"
            src={linkFromUser}
            style={{
              width: "100%",
              height: "100%",
              zoom: "65%",
              transform: "scale(0.9)",
              border: "14px solid",
              borderRadius: "40px",
              color: "#3182ce",
            }}
          ></iframe>
        </Box>
      </Center>
    </>
  );
};
