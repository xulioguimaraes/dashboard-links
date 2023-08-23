import { Input, Box, Image } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { CiUser } from "react-icons/ci";
const AvatarInput = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
      }
    }
  };

  return (
    <Box
      position="relative"
      display="inline-block"
      maxW={"fit-content"}
      maxHeight={"100px"}
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
      >
        {!!selectedImage ? (
          <Image
            src={selectedImage || "url_da_imagem_default"}
            boxSize="100px"
            borderRadius="full"
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
            alt="Avatar"
          />
        ) : (
          <Box p={2}>
            <CiUser fontSize={"80px"} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AvatarInput;
