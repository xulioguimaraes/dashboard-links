import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "./components/Header";
import { TaskList } from "../../components/TaskList";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import AvatarInput from "../../components/AvatarInput/AvatarInput";
import { Label } from "../../components/Label/Label";
import { InfoMain } from "./components/InfoMain/InfoMain";
import { GrFormClose } from "react-icons/gr";
export const Home = () => {
  const { user, singOutGoogle } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      singOutGoogle();
      return navigate("/");
    }
  }, [user]);

  return (
    <Container>
      <Header />
      <Box my={4}>
        <Heading textAlign={"center"} size={"md"}>
          Bem vindo, {user?.name}
        </Heading>
      </Box>

      <InfoMain />

      <Stack
        borderRadius={"base"}
        border={"1px solid"}
        borderColor={"gray.300"}
        p={4}
      >
        <Heading fontWeight={"semibold"} size={"sm"}>
          Botões
        </Heading>
        <Stack align={"center"} direction={"row"}>
          <Text fontSize={"sm"}>Adicionar botões</Text>
          <Button size={"sm"}> Adicionar</Button>
        </Stack>

        <Stack
          borderRadius={"base"}
          border={"1px solid"}
          borderColor={"gray.300"}
          my={2}
          p={4}
        >
          <Stack direction={"row"} justify={"space-between"}>
            <Text>Novo Botão</Text>
            <IconButton size={"sm"} aria-label={"close"}>
              <GrFormClose />
            </IconButton>
          </Stack>
          <FormControl>
            <Label label="Nome" />
            <Input size={"sm"} />
          </FormControl>
          <FormControl>
            <Label label="Link" />
            <Input size={"sm"} />
          </FormControl>
          <Stack direction={"row"}>
            <FormControl>
              <Label label="Cor do botão" />
              <Input type="color" size={"sm"} />
            </FormControl>
            <FormControl>
              <Label label="Cor do texto do botão" />
              <Input type="color" size={"sm"} />
            </FormControl>
          </Stack>
          <Button>Salvar</Button>
        </Stack>
      </Stack>
    </Container>
  );
};
