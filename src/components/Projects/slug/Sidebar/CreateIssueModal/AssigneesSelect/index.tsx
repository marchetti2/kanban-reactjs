import CreatableSelect from "react-select/creatable";
import {
  components,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueGenericProps,
  OnChangeValue,
  OptionProps,
} from "react-select";
import { SetStateAction, useState } from "react";
import { Tooltip, Tag, TagLabel, Avatar, Box, Flex, useColorMode } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useAuth } from "../../../../../../contexts/AuthContext";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Project {
  id: string;
  userId: string;
  title: string;
  type: string;
  description?: string;
  leader: UserData;
  assignees?: Array<UserData>;
  createdAt: string;
}

interface Option {
  value: string;
  label: string;
  color: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

interface AssigneesSelectProps {
  setAssignees: (value: SetStateAction<UserData[]>) => void;
  setProjectAssignees: (value: SetStateAction<UserData[]>) => void;
  project: Project;
  assignees?: Array<Option> | undefined;
}

function AssigneesSelect({
  setAssignees,
  project,
  setProjectAssignees,
  assignees,
}: AssigneesSelectProps) {
  const { colorMode } = useColorMode(); 
  const { users } = useAuth();

  const [searchListData, setSearchListData] = useState<UserData[]>([]);

  const options = searchListData.map((user) => ({
    value: user.email,
    label: user.name,
  })) as (Option | GroupBase<Option>)[];

  function handleChange(newValue: OnChangeValue<Option, true>) {
    const assigneesFormated = newValue.map((option) => {
      return users.find((user) => user.email === option.value);
    }) as UserData[];

    setAssignees(assigneesFormated);

    const concatWithCurrentAssignees =
      project?.assignees?.concat(assigneesFormated)!;

    const AssigneesWithoutDuplication = concatWithCurrentAssignees.filter(
      (assignee, index, self) => {
        return (
          self.findIndex((assig) => assig.email === assignee.email) === index &&
          assignee.email !== project?.leader?.email
        );
      }
    );

    setProjectAssignees(AssigneesWithoutDuplication);
  }

  function handleInputChange(inputValue: string) {
    if (inputValue !== "") {
      const filterByEmail = users.filter(
        (user) =>
          user.email.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );

      if (filterByEmail !== undefined) {
        setSearchListData(filterByEmail);
        return;
      }

      if (users.length === searchListData.length) {
        return;
      }
    }
    setSearchListData([]);
    return;
  }

  function handleCreate(inputValue: string) {
    alert(inputValue);
  }

  const MultiValueContainer = (props: MultiValueGenericProps<any>) => {
    const user = users.find((user) => user.email === props.data.value);
    return (
      <Tag
        size="lg"
        borderRadius="full"
        bgColor= {colorMode === "dark" ? "rgba(153, 153, 153,0.3)" : "gray.200"}
        borderColor={colorMode === "dark" ? "rgba(153, 153, 153,0.3)" : "gray.300"}
        borderWidth="1px"
        mr={1}
        my="2px"
      >
        <Avatar src={user?.avatar} size="xs" name={user?.name} ml={-1} mr={1} />
        <TagLabel>
          <components.MultiValueContainer {...props} />
        </TagLabel>
      </Tag>
    );
  };
  const Option = (props: OptionProps<any>) => {
    return (
      <Tooltip label={props.data.value} fontSize="13px" fontFamily="Inter">
        <Box >
          <components.Option {...props} />
        </Box>
      </Tooltip>
    );
  };

  const DropdownIndicator = (props: DropdownIndicatorProps<any, true>) => {
    return (
      <components.DropdownIndicator {...props}>
        <Flex alignItems="center" justifyContent="center">
          <ChevronDownIcon w={5} h={5} color={colorMode === "dark" ? "dark.600" : "gray.700"} />
        </Flex>
      </components.DropdownIndicator>
    );
  };

  return (
    <CreatableSelect
      isMulti
      defaultValue={assignees}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onCreateOption={handleCreate}
      formatCreateLabel={(inputValue: string) => (
        <div>convidar: {inputValue}</div>
      )}
      placeholder="Digite"
      options={options}
      styles={{
        multiValue: () => ({
          display: "flex",
          background:"none",
          
        }),
        valueContainer: (styles: any) => ({
          ...styles,
          backgroundColor: colorMode === "dark" ? "none" : "#F7FAFC",
          
        }),
       /*  placeholder: (styles: any) => ({
          ...styles,
          color: "red",
        }), */
        control: () => ({        
          display: "flex",
          background: colorMode === "dark" ? "none" : "none",
        }),
        menuList: (styles: any) => ({
          ...styles,
          background: colorMode === "dark" ? "#444449" : "none",
          borderRadius: "6px",
          color: colorMode === "dark" ? "#fff" : "#2D3748",
          
        }), 
        menu: (styles: any) => ({
          ...styles,
          borderRadius: "6px",
          background: colorMode === "dark" ? "#444449" : "none",
          
        }), 
        noOptionsMessage: (styles: any) => ({
          ...styles,
          background: colorMode === "dark" ? "#444449" : "none",
        }), 
        multiValueRemove: () => ({
          color: "#999",
          marginLeft: "5px",
          marginTop: "3px",
          transition: ".2s",
          ":hover": {
            color: colorMode === "dark" ? "white" : "#666",
          },
        }),
        dropdownIndicator: (styles: any) => ({
          ...styles,
          height: "40px",
        }),
        indicatorsContainer: (styles: any) => ({
          ...styles,
          backgroundColor: colorMode === "dark" ? "gray.200" : "#F7FAFC",
          borderRadius: "0 6px 6px 0",
        }),
        container: (styles: any) => ({
          ...styles, 
          height: "auto",
          backgroundColor: colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "#F7FAFC",
          borderRadius: "6px",
          border: colorMode === "dark" ? "1px solid #202024" : "1px solid #E2E8F0",
          color: colorMode === "dark" ? "#fff" : "#4A5568"
        }),
        input:(styles: any) => ({
          ...styles,
          color: colorMode === "dark" ? "#fff" : "#2D3748",
        }),
        option:(styles: any) => ({
          ...styles,
          "&:hover":{
            backgroundColor: "#999",
          }
        })
      }}
      components={{
        MultiValueContainer,
        Option,
        DropdownIndicator,
      }}
    />
  );
}

export { AssigneesSelect };
