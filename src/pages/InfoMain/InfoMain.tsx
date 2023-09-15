import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Skeleton,
  SkeletonCircle,
  Stack,
  Switch,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import AvatarInput from "../../components/AvatarInput/AvatarInput";
import { Label } from "../../components/Label/Label";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { child, get, ref, set } from "firebase/database";
import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { IsLoadingForm } from "./components/IsLoadingForm";
const FILE = "/info-main";
const registerFormSchema = z.object({
  name: z.string().min(3, {
    message: "O usuário precisa ter pelo menos 3 letras.",
  }),
  addIstagram: z.boolean(),
  instagram: z.string(),
  resume: z.string().optional(),
  background: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export const InfoMain = () => {
  const [addIstagram, setAddInstagram] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      addIstagram: false,
      resume: "",
      background: "#fff",
      instagram: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const resetData = (data: RegisterFormData) => {
    setAddInstagram(!data.addIstagram);
    reset(data);
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
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate("/home");
  };
  function writeJob(data: RegisterFormData) {
    set(ref(database, "links/" + user?.id + "/" + FILE), data);
  }
  const handleRegister = async (data: RegisterFormData) => {
    if (!addIstagram && !data.instagram) {
      setError("instagram", { message: "Necessario preencher " });
      return;
    }
    try {
      writeJob(data);
      toast({
        title: `Alterações salvas com sucesso`,
        status: "success",
        variant: "left-accent",
        isClosable: true,
      });
      handleBackHome();
    } catch (error) {
      toast({
        title: `${error}`,
        status: "error",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <IsLoadingForm />
      ) : (
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
              Informações principais
            </Heading>

            <Stack direction={"row"} spacing={6}>
              <AvatarInput />
              <Stack w={"full"}>
                <FormControl
                  isDisabled={isSubmitting}
                  isRequired
                  isInvalid={!!errors.name}
                >
                  <Label label="Nome" />
                  <Input {...register("name")} size={"sm"} type="text" />
                  {!!errors.name && (
                    <FormErrorMessage fontSize={"xs"}>
                      {errors.name.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Stack direction={"row"} gap={4}>
                  <FormControl
                    w={"auto"}
                    flexWrap={"nowrap"}
                    whiteSpace={"nowrap"}
                    display="flex"
                    gap={3}
                    alignItems="center"
                    isDisabled={isSubmitting}
                  >
                    <Controller
                      control={control}
                      name="addIstagram"
                      render={({ field }) => (
                        <>
                          <Switch
                            {...field}
                            id="username"
                            isChecked={field.value}
                            value={field.value ? "true" : "false"}
                            onChange={(e) => {
                              field.onChange(e);
                              setAddInstagram((old) => !old);
                            }}
                          />
                          <Label htmlFor="username" label="Adicionar @?" />
                        </>
                      )}
                    />
                  </FormControl>
                  <FormControl
                    w={"full"}
                    isDisabled={addIstagram || isSubmitting}
                    isRequired={!addIstagram}
                    isInvalid={!!errors.instagram}
                  >
                    <Label label=" Seu principal @" />
                    <Input
                      {...register("instagram", {
                        required: !addIstagram,
                      })}
                      size={"sm"}
                      type="text"
                    />
                    {!!errors.instagram && (
                      <FormErrorMessage fontSize={"xs"}>
                        {errors.instagram.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Stack>
              </Stack>
            </Stack>
            <FormControl isDisabled={isSubmitting}>
              <Label label="Resumo" />
              <Textarea
                {...register("resume")}
                placeholder="Resumo sobre sua pagina"
              />
            </FormControl>
            <FormControl isDisabled={isSubmitting}>
              <Label label="Selecionar cor de fundo da pagina" />
              <Input {...register("background")} type="color" size={"sm"} />
            </FormControl>
            <Stack direction={"row"} justify={"space-between"}>
              <Button isDisabled={isSubmitting} onClick={handleBackHome}>
                Voltar
              </Button>
              <Button
                onClick={handleSubmit(handleRegister)}
                type="submit"
                variant={"solid"}
                colorScheme="blue"
                isDisabled={isSubmitting}
              >
                Salvar
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};
