import { FormLabel, FormLabelProps } from "@chakra-ui/react";

type LabelProps = FormLabelProps & {
  label: string;
};

export const Label = ({ label, ...props }: LabelProps) => {
  return (
    <FormLabel fontSize={"xs"} mb={0} {...props}>
      {label}
    </FormLabel>
  );
};
