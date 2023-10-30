import {
  Button,
  FormControl,
  Heading,
  IconButton,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Label } from "../../components/Label/Label";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { child, get, ref, set } from "firebase/database";
import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IsloadingButtons } from "./components/IsLoadingButtons/IsLoadingButtons";
interface IButtons {
  [uuid: string]: {
    name: string;
    link: string;
    backgroundButton?: string;
    colorTextButton?: string;
  };
}

const buttonSchema = z.object({
  name: z.string().min(3, {
    message: "O nome precisa ter pelo menos 3 letras.",
  }),
  link: z.string().refine((value) => (!!value ? true : false)), // Adicione as outras validações para as propriedades aqui
  backgroundButton: z.string().optional(),
  colorTextButton: z.string().optional(),
});
const registerFormSchema = z.object({
  buttons: z.record(buttonSchema), // Use z.record() para representar um objeto com chaves de string
});
type RegisterFormData = z.infer<typeof registerFormSchema>;
const FILE = "/buttons";

export const ButtonsPage = () => {
  const { user } = useAuth();

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitted },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/home");
  };
  const handleAddButton = () => {
    const buttonsTemp: IButtons = !!getValues("buttons")
      ? getValues("buttons")
      : {};

    if (Object.keys(buttonsTemp).length === 5) {
      toast({
        title: `Você atingiu o numero maximo de botões`,
        status: "error",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }
    const idButton = uuidv4();
    const buttonsAux = {
      ...buttonsTemp,
      [idButton]: {
        name: "",
        link: "",
        backgroudButton: "",
        colorTextButton: "",
      },
    };
    reset({
      buttons: buttonsAux,
    });
  };
  const handleRemoveButton = (id: string) => {
    const buttonsTemp: IButtons = getValues("buttons");
    const buttonsAux: IButtons = {};

    Object.keys(buttonsTemp).forEach((key) => {
      if (key !== id) {
        buttonsAux[key] = buttonsTemp[key];
      }
    });
    reset({
      buttons: buttonsAux,
    });
  };
  function writeJob(data: RegisterFormData) {
    const dataSend = data.buttons;

    set(ref(database, "links/" + user?.id + "/" + FILE), dataSend);
  }
  const handleRegister = async (data: RegisterFormData) => {
    try {
      writeJob(data);
      toast({
        title: `Alterações salvas com sucesso`,
        status: "success",
        isClosable: true,
        variant: "left-accent",
      });
      handleBackHome();
    } catch (error) {
      toast({
        title: `${error}`,
        variant: "left-accent",
        status: "error",
        isClosable: true,
      });
    }
  };
  const resetData = (data: RegisterFormData) => {
    reset({ buttons: data });
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      get(child(ref(database), "links/" + user?.id + FILE))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let info = snapshot.val() as RegisterFormData;
            resetData(info);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user]);
  return (
    <>
      <Stack
        borderRadius={"base"}
        border={"1px solid"}
        borderColor={"gray.300"}
        p={4}
        as={"form"}
        onSubmit={handleSubmit(handleRegister)}
      >
        <Heading fontWeight={"semibold"} size={"sm"}>
          Botões
        </Heading>
        <Stack direction={"row"} justify={"space-between"} align={"center"}>
          <Button
            onClick={handleAddButton}
            leftIcon={<RiAddLine />}
            colorScheme="whatsapp"
            //  isDisabled={isSubmitted || isLoading}
          >
            Adicionar Botão
          </Button>
          <Stack direction={"row"}>
            <Button
              //isDisabled={isSubmitted || isLoading}
              onClick={handleBackHome}
              leftIcon={<FaArrowLeft />}
            >
              Voltar
            </Button>
            <Button
              //         isDisabled={isSubmitted || isLoading}
              type="submit"
              colorScheme="blue"
              leftIcon={<FaSave />}
            >
              Salvar
            </Button>
          </Stack>
        </Stack>

        {isLoading ? (
          <IsloadingButtons />
        ) : (
          <>
            {!!getValues("buttons") &&
              Object.keys(getValues("buttons")).map((uuid) => (
                <Stack
                  key={uuid}
                  borderRadius={"base"}
                  border={"1px solid"}
                  borderColor={"gray.300"}
                  my={2}
                  p={4}
                  position={"relative"}
                >
                  <IconButton
                    top={0}
                    right={0}
                    onClick={() => handleRemoveButton(uuid)}
                    position={"absolute"}
                    size={"sm"}
                    aria-label={"close"}
                    variant={"ghost"}
                  >
                    <FaTrash />
                  </IconButton>
                  <FormControl
                    //       isDisabled={isSubmitted}
                    isInvalid={!!errors?.buttons?.[uuid]?.name}
                  >
                    <Label label="Nome" />
                    <Input {...register(`buttons.${uuid}.name`)} size={"sm"} />
                  </FormControl>
                  <FormControl
                    //         isDisabled={isSubmitted}
                    isInvalid={!!errors?.buttons?.[uuid]?.link}
                  >
                    <Label label="Link" />
                    <Input {...register(`buttons.${uuid}.link`)} size={"sm"} />
                  </FormControl>
                  <Stack direction={"row"}>
                    <FormControl
                    //  isDisabled={isSubmitted}
                    >
                      <Label label="Cor do botão" />
                      <Input
                        {...register(`buttons.${uuid}.backgroundButton`)}
                        type="color"
                        size={"sm"}
                      />
                    </FormControl>
                    <FormControl

                    //  isDisabled={isSubmitted}
                    >
                      <Label label="Cor do texto do botão" />
                      <Input
                        {...register(`buttons.${uuid}.colorTextButton`)}
                        type="color"
                        size={"sm"}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              ))}
          </>
        )}
      </Stack>
    </>
  );
};
