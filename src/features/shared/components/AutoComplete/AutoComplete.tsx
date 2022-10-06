import React from 'react';
import { Flex, FormLabel } from '@chakra-ui/react';
import {
  AutoCompleteList,
  AutoComplete as ChocUIAutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
} from '@choc-ui/chakra-autocomplete';

export interface Option {
  value: any;
  label: string;
}
export interface AutoCompleteProps {
  options: Option[];
  label: string;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  label,
}) => {
  return (
    <Flex flexDirection={'column'}>
      <FormLabel fontSize={'12'} mb={1}>
        {label}
      </FormLabel>
      <ChocUIAutoComplete listAllValuesOnFocus openOnFocus>
        <AutoCompleteInput fontSize={'12px'} size={'sm'} />
        <AutoCompleteList
          borderRadius={'xs'}
          mt={'2'}
          outline={'base'}
          pb={'1'}
          pt={'1'}
          shadow={'md'}
        >
          {options.map((option) => (
            <AutoCompleteItem
              key={'kusd'}
              borderRadius={'none'}
              fontSize={'12px'}
              ml={'0'}
              mr={'0'}
              value={option.value}
            >
              {option.value}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </ChocUIAutoComplete>
    </Flex>
  );
};
