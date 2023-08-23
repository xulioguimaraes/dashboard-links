import {
  FormControl,
  Heading,
  Input,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import AvatarInput from "../../../../components/AvatarInput/AvatarInput";
import { Label } from "../../../../components/Label/Label";

export const InfoMain = () => {
  return (
    <Stack borderRadius={"base"} border={"1px solid"} borderColor={"gray.300"} p={4}>
      <Heading fontWeight={"semibold"} size={"sm"}>
        Informações principais
      </Heading>

      <Stack direction={"row"} spacing={6}>
        <AvatarInput />
        <Stack w={"full"}>
          <FormControl>
            <Label label="Nome" />
            <Input size={"sm"} type="text" />
          </FormControl>
          <Stack direction={"row"} gap={4}>
            <FormControl
              w={"auto"}
              flexWrap={"nowrap"}
              whiteSpace={"nowrap"}
              display="flex"
              gap={3}
              alignItems="center"
            >
              <Switch id="username" />
              <Label htmlFor="username" label="Adicionar @?" />
            </FormControl>
            <FormControl w={"full"}>
              <Label label=" Seu principal @" />
              <Input size={"sm"} type="text" />
            </FormControl>
          </Stack>
        </Stack>
      </Stack>
      <FormControl>
        <Textarea placeholder="Resumo sobre sua pagina" />
      </FormControl>
      <FormControl>
        <Label label="Selecionar cor de fundo da pagina" />
        <Input type="color" size={"sm"} />
      </FormControl>
    </Stack>
  );
};
