import { Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";

export const IsLoadingForm = () => {
  return (
    <Stack
      borderRadius={"base"}
      border={"1px solid"}
      borderColor={"gray.300"}
      p={4}
    >
      <Skeleton
        startColor="blue.50"
        endColor="#1976d2"
        height="15px"
        w={"180px"}
      />
      <Stack gap={6} direction={"row"}>
        <SkeletonCircle startColor="blue.50" endColor="#1976d2" size="100" />

        <Stack width={"75%"}>
          <Skeleton startColor="blue.50" endColor="#1976d2" height="40px" />
          <Stack align={"center"} direction={"row"}>
            <Skeleton
              width={"220px"}
              startColor="blue.50"
              endColor="#1976d2"
              height="25px"
            />
            <Skeleton
              w={"100%"}
              startColor="blue.50"
              endColor="#1976d2"
              height="40px"
            />
          </Stack>
        </Stack>
      </Stack>
      <Skeleton startColor="blue.50" endColor="#1976d2" height="35px" />
      <Skeleton startColor="blue.50" endColor="#1976d2" height="80px" />
      <Skeleton startColor="blue.50" endColor="#1976d2" height="35px" />
      <Stack direction={"row"} justify={"space-between"}>
        <Skeleton
          startColor="blue.50"
          endColor="#1976d2"
          height="35px"
          width={"80px"}
        />

        <Skeleton
          startColor="blue.50"
          endColor="#1976d2"
          height="35px"
          width={"80px"}
        />
      </Stack>
    </Stack>
  );
};
