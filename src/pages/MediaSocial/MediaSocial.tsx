import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  BsChevronDown,
  BsChevronUp,
  BsDiscord,
  BsInstagram,
  BsLinkedin,
  BsTwitch,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { z } from "zod";
import { Label } from "../../components/Label/Label";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { child, get, ref, set } from "firebase/database";
import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";

type SocialMediaKey =
  | "linkedin"
  | "facebook"
  | "instagram"
  | "discord"
  | "whatsapp"
  | "twitch"
  | "twitter";

interface SocialProps {
  name:
    | "linkedin"
    | "facebook"
    | "instagram"
    | "discord"
    | "whatsapp"
    | "twitch"
    | "twitter";

  icon: ReactNode;
  lable: string;
  color: string;
}
const estiloDoIcone = {
  background:
    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
  width: "50px", // Ajuste a largura e altura conforme necessário
  height: "50px",
  borderRadius: "26%", // Isso cria um ícone de forma circular
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const social: SocialProps[] = [
  {
    name: "linkedin",
    lable: "LinkedIn",
    color: "#0077B5",
    icon: <BsLinkedin fontSize={"40px"} />,
  },
  {
    name: "facebook",
    lable: "Facebook",
    color: "#1877F2",
    icon: <ImFacebook2 fontSize={"40px"} />,
  },
  {
    name: "instagram",
    lable: "Instagram",
    color: "white",

    icon: <BsInstagram fontSize={"40px"} />,
  },
  {
    name: "discord",
    lable: "Discord",
    color: "#7289DA",
    icon: <BsDiscord fontSize={"40px"} />,
  },
  {
    name: "whatsapp",
    lable: "WhatsApp",
    color: "#25D366",
    icon: <BsWhatsapp fontSize={"40px"} />,
  },
  {
    name: "twitch",
    lable: "Twitch",
    color: "#6441A5",
    icon: <BsTwitch fontSize={"40px"} />,
  },
  {
    name: "twitter",
    lable: "Twitter",
    color: "#1DA1F2",
    icon: <BsTwitter fontSize={"40px"} />,
  },
];

const socialMediaSchema = z.object({
  active: z.boolean(),
  link: z.string().optional(),
});
const registerFormSchema = z.object({
  linkedin: socialMediaSchema,
  facebook: socialMediaSchema,
  instagram: socialMediaSchema,
  discord: socialMediaSchema,
  whatsapp: socialMediaSchema,
  twitch: socialMediaSchema,
  twitter: socialMediaSchema,
});

type RegisterFormData = z.infer<typeof registerFormSchema>;
const FILE = "/social-media";

export const MediaSocial = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      linkedin: {
        active: false,
        link: "",
      },
      facebook: {
        active: false,
        link: "",
      },
      instagram: {
        active: false,
        link: "",
      },
      discord: {
        active: false,
        link: "",
      },
      whatsapp: {
        active: false,
        link: "",
      },
      twitch: {
        active: false,
        link: "",
      },
      twitter: {
        active: false,
        link: "",
      },
    },
    resolver: zodResolver(registerFormSchema),
  });
  const resetData = (data: RegisterFormData) => {
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
    let seedContinue = false;
    const socialMediaKeys: SocialMediaKey[] = [
      "linkedin",
      "facebook",
      "instagram",
      "discord",
      "whatsapp",
      "twitch",
      "twitter",
    ];
    socialMediaKeys.forEach((item: SocialMediaKey) => {
      if (!!data[item].active) {
        if (!data[item].link) {
          setError(`${item}.link`, {
            message: "Necessario preencher o link com um valor valido",
          });
          toast({
            title: social.find((ev) => ev.name === item)?.lable,
            description: "Prencha o link com uma URL valida",
            variant: "left-accent",
            status: "error",
            isClosable: true,
          });
          seedContinue = false;
        } else {
          seedContinue = true;
        }
      } else {
        seedContinue = true;
      }
    });
    if (!seedContinue) {
      return;
    }
    try {
      writeJob(data);
      toast({
        title: `Alterações salvas com sucesso`,
        variant: "left-accent",
        status: "success",
        isClosable: true,
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
  return (
    <Stack
      borderRadius={"base"}
      border={"1px solid"}
      borderColor={"gray.300"}
      p={4}
      as={"form"}
      onSubmit={handleSubmit(handleRegister)}
    >
      <Stack direction={"row"} justify={"space-between"}>
        <Button isDisabled={isSubmitting} onClick={handleBackHome}>
          Voltar
        </Button>
        <Button
          type="submit"
          variant={"solid"}
          colorScheme="blue"
          isDisabled={isSubmitting}
        >
          Salvar
        </Button>
      </Stack>
      {social.map((item) => {
        const active = getValues(`${item.name}.active`);

        const [open, setOpen] = useState(false);
        const [openMe, setOpenMe] = useState(false);
        return (
          <Stack
            borderRadius={"base"}
            border={"1px solid"}
            borderColor={"gray.300"}
            p={4}
            key={item.name}
          >
            <Button
              w={"full"}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              pr={2}
              variant={"ghost"}
              p={0}
              onClick={() => setOpen((old) => !old)}
            >
              <Stack direction={"row"} gap={2} align={"center"}>
                <Box
                  {...(item.name === "instagram" &&
                    active && {
                      style: estiloDoIcone,
                    })}
                  color={active ? item.color : "GrayText"}
                >
                  {item.icon}
                </Box>
                <Text>{item.lable}</Text>
              </Stack>
              <Center justifyContent={"space-between"} w={"130px"}>
                <FormControl
                  w={"auto"}
                  flexWrap={"nowrap"}
                  whiteSpace={"nowrap"}
                  pb={0}
                  display="flex"
                  gap={3}
                  alignItems="center"
                  isDisabled={isSubmitting}
                >
                  <Controller
                    control={control}
                    name={`${item.name}.active`}
                    render={({ field }) => (
                      <>
                        <Switch
                          {...field}
                          id={`${item.name}.active`}
                          defaultChecked={false}
                          defaultValue={"false"}
                          isChecked={!!field.value}
                          value={field.value ? "true" : "false"}
                          onChange={(e) => {
                            if (!field.value) {
                              setOpen(true);
                              setOpenMe(true);
                            } else {
                              setOpen(false);
                              setOpenMe(false);
                            }
                            field.onChange(e);
                          }}
                        />
                        <Label
                          htmlFor={`${item.name}.active`}
                          label={!!field.value ? "Ativo" : "Desativo"}
                        />
                      </>
                    )}
                  />
                </FormControl>
                {open ? (
                  <BsChevronUp fontWeight={"bold"} fontSize={"30px"} />
                ) : (
                  <BsChevronDown fontWeight={"bold"} fontSize={"30px"} />
                )}
              </Center>
            </Button>
            <Collapse in={open} unmountOnExit>
              <Divider />
              <Box pt={2} w={"100%"}>
                <FormControl
                  isDisabled={isSubmitting || !active || !openMe}
                  isInvalid={!!errors[item.name]?.link}
                >
                  <Label label="Link para direcionamento" />
                  <Input
                    {...register(`${item.name}.link`, {
                      required: !active,
                    })}
                    size={"sm"}
                  />
                  {!!errors[item.name]?.link && (
                    <FormErrorMessage fontSize={"xs"}>
                      {errors[item.name]?.link?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Box>
            </Collapse>
          </Stack>
        );
      })}
    </Stack>
  );
};
