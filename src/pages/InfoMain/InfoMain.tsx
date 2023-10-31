import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
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
import { ChangeEvent, useEffect, useState } from "react";
import { child, get, ref, set } from "firebase/database";
import { database, storage } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import {
  ref as refStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { IsLoadingForm } from "./components/IsLoadingForm";
const FOLDER = "/info-main";
const registerFormSchema = z.object({
  name: z.string().min(3, {
    message: "O usuário precisa ter pelo menos 3 letras.",
  }),
  addIstagram: z.boolean(),
  instagram: z.string(),
  resume: z.string().optional(),
  background: z.string().optional(),
  colorTextName: z.string().optional(),
  colorTextInstagram: z.string().optional(),
  colorTextResume: z.string().optional(),
  urlImage: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
function isURL(string: string | undefined | null) {
  if (!string) {
    return false;
  }
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // Protocolo (opcional)
      "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" + // Domínio
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // Ou endereço IP
      "(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*" + // Porta e caminho (opcional)
      "(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?" + // Consulta (opcional)
      "(\\#[-a-zA-Z\\d_]*)?$",
    "i"
  ); // Fragmento (opcional)

  return urlPattern.test(string);
}

export const InfoMain = () => {
  const [addIstagram, setAddInstagram] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nameImage, setNameImage] = useState<string>("");
  const [progress, setProgress] = useState(0);
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
      background: "#FFFFFF",
      colorTextName: "",
      colorTextInstagram: "",
      colorTextResume: "",
      instagram: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const resetData = (data: RegisterFormData) => {
    if (isURL(data?.urlImage)) {
      setSelectedImage(String(data.urlImage));
    }
    setAddInstagram(!data.addIstagram);
    reset(data);
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      get(child(ref(database), "links/" + user?.id + FOLDER))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let info = snapshot.val() as RegisterFormData;
            resetData(info);
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
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file) {
        const nameFromImage = `images-link/${user?.id}-${file.name}`;
        const storageRef = refStorage(storage, nameFromImage);

        const metadata = {
          contentType: file.type,
        };
        const blob = new Blob([file], { type: file.type });
        const uploadImage = uploadBytesResumable(storageRef, blob, metadata);
        uploadImage.on("state_changed", (snapShot) => {
          const progressFile =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;

          setProgress(progressFile);
        });

        const storageRef2 = refStorage(storage, nameFromImage);
        getDownloadURL(storageRef2)
          .then((url) => {
            // O URL da imagem está disponível aqui

            if (isURL(url)) {
              setSelectedImage(url);
              setNameImage(url);
            }
            // Faça algo com o URL, como exibi-lo na interface do usuário
          })
          .catch((error) => {
            console.error("Erro ao obter o URL da imagem:", error);
          });
      }
    }
  };
  function writeJob(data: RegisterFormData) {
    set(ref(database, "links/" + user?.id + "/" + FOLDER), data);
  }
  const handleRegister = async (data: RegisterFormData) => {
    if (!addIstagram && !data.instagram) {
      setError("instagram", { message: "Necessario preencher " });
      return;
    }
    const formttedData = {
      ...data,
      urlImage: nameImage,
    };
    try {
      writeJob(formttedData);
      toast({
        title: `Alterações salvas com sucesso`,
        status: "success",
        variant: "left-accent",
        isClosable: true,
      });
      handleBackHome();
      setNameImage("");
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
            <Box display={"flex"} justifyContent={"center"}>
              <AvatarInput
                handleFileChange={handleFileChange}
                progress={progress}
                selectedImage={selectedImage}
              />
            </Box>
            <Stack direction={"row"} spacing={6}>
              <Stack direction={"row"} w={"full"}>
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
                <FormControl maxWidth={"90px"} isDisabled={isSubmitting}>
                  <Label label="Cor do Texto" />
                  <Input
                    {...register("colorTextName")}
                    type="color"
                    size={"sm"}
                  />
                </FormControl>
              </Stack>
            </Stack>
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
                <FormHelperText fontSize={"12px"}>
                  Não é necessário adicionar o "@"
                </FormHelperText>
              </FormControl>
              <FormControl maxWidth={"90px"} isDisabled={isSubmitting}>
                <Label label="Cor do Texto" />
                <Input
                  {...register("colorTextInstagram")}
                  type="color"
                  size={"sm"}
                />
              </FormControl>
            </Stack>
            <Stack direction={"row"}>
              <FormControl isDisabled={isSubmitting}>
                <Label label="Resumo" />
                <Textarea
                  {...register("resume")}
                  placeholder="Resumo sobre sua pagina"
                />
              </FormControl>
              <FormControl maxWidth={"90px"} isDisabled={isSubmitting}>
                <Label label="Cor do Texto" />
                <Input
                  {...register("colorTextResume")}
                  type="color"
                  size={"sm"}
                />
              </FormControl>
            </Stack>

            <FormControl isDisabled={isSubmitting}>
              <Label label="Selecionar cor de fundo da pagina" />
              <Input
                {...register("background")}
                defaultValue={"#FFFFFF"}
                type="color"
                size={"sm"}
              />
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
