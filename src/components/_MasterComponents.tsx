import { Text, Wrap, WrapItem } from "@chakra-ui/react";

export const LabelFeatured1 = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Wrap spacing={2}>
      <WrapItem>
        <Text as={"b"} fontSize={"sm"} color={"gray.500"}>
          {label}
        </Text>
      </WrapItem>
      <WrapItem>
        <Text
          fontWeight="bold"
          fontStyle="italic"
          fontSize={"sm"}
          color={"gray.600"}
        >
          {value}
        </Text>
      </WrapItem>
    </Wrap>
  );
};

export const LabelFeatured1sm = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Wrap spacing={2}>
      <WrapItem>
        <Text fontSize={"xs"} color={"gray.500"}>
          {label}
        </Text>
      </WrapItem>
      <WrapItem>
        <Text
          fontWeight="bold"
          fontStyle="italic"
          fontSize={"xs"}
          color={"gray.600"}
        >
          {value}
        </Text>
      </WrapItem>
    </Wrap>
  );
};


export const LabelFeaturedCart = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Wrap spacing={2}>
      <WrapItem>
        <Text fontSize={"xs"} color={"gray.500"}>
          {label}
        </Text>
      </WrapItem>
      <WrapItem>
        <Text
          fontWeight="bold"
          fontStyle="italic"
          fontSize={"xs"}
          color={"gray.600"}
        >
          {value}
        </Text>
      </WrapItem>
    </Wrap>
  );
};
