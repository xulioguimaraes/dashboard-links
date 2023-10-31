import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { FcLink } from "react-icons/fc";

export function Header() {
  const { user, singOutGoogle } = useAuth();

  return (
    <Stack justify={"space-between"} direction={"row"}>
      <Box display={"flex"} justifyContent={"center"}>
        <FcLink fontSize={"60px"} />
      </Box>
      <Stack direction={"row"} align={"center"}>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                variant={"ghost"}
                borderRadius={"full"}
                isActive={isOpen}
                as={Button}
              >
                <Avatar size={"sm"} src={user?.avatar} />
              </MenuButton>
              <MenuList>
                <MenuItem isDisabled fontWeight={"bold"}>
                  {user?.name}
                </MenuItem>
                <MenuItem
                  display={"flex"}
                  gap={2}
                  onClick={() => singOutGoogle()}
                >
                  <FiLogOut /> Sair
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Stack>
    </Stack>
  );
}
