import {
  Button,
  FormControl,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GrFormClose } from "react-icons/gr";
import { Label } from "../../components/Label/Label";

export const ButtonsPage = () => {
  return (
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
  );
};
