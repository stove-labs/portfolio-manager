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
  value: string;
  label: string;
}
export interface AutoCompleteProps {
  options: Option[];
  label: string;
  name: string;
  transformValueOut?: (value: string) => string;
  transformValueIn?: (value?: string) => string | undefined;
}

export const stopEvent = (e: any): void => {
  e.preventDefault();
  e.stopPropagation();
};

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  label,
  name,
  transformValueOut,
  transformValueIn,
}) => {
  const form = useFormContext();
  const input = form.register(name);

  const handleOnChange = useCallback(
    (value: string) => {
      value = transformValueOut ? transformValueOut(value) : value;
      form.setValue(name, value);
    },
    [input, form, name]
  );
  return (
    <Flex flex={'1'} flexDirection={'column'}>
      <FormLabel fontSize={'12'} mb={1}>
        {label}
      </FormLabel>
      <ChocUIAutoComplete
        // ref={input.ref as any}
        listAllValuesOnFocus
        openOnFocus
        closeOnBlur={false}
        defaultValue={
          transformValueIn
            ? transformValueIn(form.getValues(name))
            : form.getValues(name)
        }
        onBlur={stopEvent}
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
          onBlur={stopEvent}
        >
          {options.map((option) => (
            <AutoCompleteItem
              key={option.label}
              borderRadius={'none'}
              fontSize={'12px'}
              ml={'0'}
              mr={'0'}
              value={option.label}
              onBlur={stopEvent}
            >
              {option.label}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </ChocUIAutoComplete>
    </Flex>
  );
};
