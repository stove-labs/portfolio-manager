import React, { useCallback } from 'react';
import { Flex, FormLabel } from '@chakra-ui/react';
import {
  AutoCompleteList,
  AutoComplete as ChocUIAutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
} from '@choc-ui/chakra-autocomplete';
import { useFormContext } from 'react-hook-form';

export interface Option {
  value: any;
  label: string;
}
export interface AutoCompleteProps {
  options: Option[];
  label: string;
  name: string;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  label,
  name,
}) => {
  const form = useFormContext();
  const input = form.register(name);

  const handleOnChange = useCallback(
    (value: any) => {
      form.setValue(name, value);
    },
    [input, form, name]
  );
  console.log('form', name, form.getValues());
  return (
    <Flex flex={'1'} flexDirection={'column'}>
      <FormLabel fontSize={'12'} mb={1}>
        {label}
      </FormLabel>
      <ChocUIAutoComplete
        ref={input.ref as any}
        listAllValuesOnFocus
        openOnFocus
        defaultValue={form.getValues(name)}
        onChange={handleOnChange}
      >
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
              key={option.value}
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
