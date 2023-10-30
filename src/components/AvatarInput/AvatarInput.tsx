import { Input, Box, Image, Progress } from "@chakra-ui/react";
import { ChangeEvent } from "react";

import { CiUser } from "react-icons/ci";

interface IAvatarInput {
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedImage: string | null;
  progress: number;
}
const AvatarInput = ({
  handleFileChange,
  selectedImage,
  progress,
}: IAvatarInput) => {
  return (
    <Box
      position="relative"
      display="inline-block"
      maxW={"fit-content"}
      maxHeight={"150px"}
      borderRadius={"full"}
      color={"gray.500"}
      border={"1px solid"}
      _hover={{
        cursor: "pointer",
      }}
    >
      <Input
        type="file"
        id="avatar-input"
        accept="image/*"
        display="none"
        onChange={handleFileChange}
      />
      <Box
        _hover={{
          cursor: "pointer",
        }}
        as="label"
        htmlFor="avatar-input"
        overflow={"hidden"}
      >
        {!!selectedImage ? (
          <Image
            src={selectedImage || "url_da_imagem_default"}
            boxSize="150px"
            borderRadius="full"
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
            alt="Avatar"
            objectFit={"cover"}
          />
        ) : (
          <Box p={2}>
            <CiUser fontSize={"80px"} />
          </Box>
        )}
      </Box>
      {progress > 0 && progress < 100 && (
        <Progress value={progress} size="xs" colorScheme="pink" />
      )}
    </Box>
  );
};

export default AvatarInput;
