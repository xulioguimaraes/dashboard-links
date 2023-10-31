import { Skeleton, Stack } from "@chakra-ui/react";

export const IsloadingButtons = () => {
  return (
    <Stack
      borderRadius={"base"}
      border={"1px solid"}
      borderColor={"gray.300"}
      p={4}
      gap={4}
    >
      <Skeleton startColor="blue.50" endColor="#1976d2" height="40px" />
      <Skeleton startColor="blue.50" endColor="#1976d2" height="40px" />
      <Stack direction={"row"}>
        <Skeleton
          w={"100%"}
          startColor="blue.50"
          endColor="#1976d2"
          height="40px"
        />
        <Skeleton
          w={"100%"}
          startColor="blue.50"
          endColor="#1976d2"
          height="40px"
        />
      </Stack>
    </Stack>
  );
};
