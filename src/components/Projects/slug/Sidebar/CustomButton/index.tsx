import { HStack, Icon, Text, Button } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { MouseEventHandler } from "react";

interface ButtonProps {
  icon: IconType;
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

function CustomButton({ icon, name, onClick }: ButtonProps): JSX.Element {
  return (
    <Button
      _focus={{
        outline: "none",
        boxShadow: "none",
      }}
      variant="unstyled"
      onClick={onClick}
    >
      <HStack
        cursor="pointer"
        h="42px"
        borderRadius="3px"
        w="64px"
        pl="19px"
        //spacing="15px"
        transition=".2s"
        _hover={{
          bgColor: "rgba(235, 236, 240, 0.2)",
        }}
        sx={{
          ".sidebar:hover &": {
            width: "200px",
          },
        }}
      >
        <Icon as={icon} w={6} h={6} color="light.100" />
        <Text
          variant="sidebar-button-text"
          sx={{
            visibility: "hidden",
            opacity: 0,
            whiteSpace: "nowrap",
            ".sidebar:hover &": {
              transition: "visibility .4s, opacity .4s, transform .3s",
              visibility: "visible",
              opacity: 1,
              transform: "translateX(8px)",
            },
          }}
        >
          {name}
        </Text>
      </HStack>
    </Button>
  );
}

export { CustomButton };
