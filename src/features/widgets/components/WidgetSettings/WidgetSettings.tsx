import React, { PropsWithChildren, useCallback } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useForm, FormProvider } from 'react-hook-form';

export interface WidgetSettingsProps<T> {
  onSettingsChange: (settings: T) => void;
  onWidgetRemove: () => void;
  settings: T;
}

export const WidgetSettings: React.FC<
  PropsWithChildren<WidgetSettingsProps<any>>
> = ({ children, onSettingsChange, settings, onWidgetRemove }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<any>({
    defaultValues: settings,
  });

  const handleSaveOnClick = useCallback(
    (settings: any) => {
      onSettingsChange(settings);
      onClose();
    },
    [onClose]
  );

  const handleRemoveWidgetClick = useCallback(() => {
    onWidgetRemove();
  }, [onWidgetRemove]);

  // TODO: continue here

  return (
    <Flex onMouseDown={(e) => e.stopPropagation()}>
      <Popover
        closeOnBlur={false}
        closeOnEsc={true}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      >
        <PopoverTrigger>
          <Flex
            color={useColorModeValue('gray.400', 'gray.400')}
            sx={{
              '.settings-icon': {
                opacity: '0',
              },
              '.open, .settings-icon:hover': {
                // TODO: fix selector priority conflict with WidgetWrapper :hover
                opacity: '1 !important',
              },
            }}
          >
            <FontAwesomeIcon
              className={classNames('settings-icon', {
                open: isOpen,
              })}
              icon={faGear}
              size={'xs'}
            />
          </Flex>
        </PopoverTrigger>
        <Box zIndex={'9999'}>
          <PopoverContent
            color={useColorModeValue('gray.400', 'gray.400')}
            minWidth={'180px'}
            shadow={'sm'}
            width={'auto'}
          >
            <PopoverHeader
              alignItems={'center'}
              display={'flex'}
              justifyContent={'space-between'}
              pb={'1'}
              pl={'2'}
              pr={'2'}
              pt={'1'}
            >
              <Heading
                fontSize={'0.65rem'}
                letterSpacing={'tight'}
                pr={'10'}
                size={'xs'}
                textTransform={'uppercase'}
              >
                Settings
              </Heading>
              <PopoverCloseButton
                position={'relative'}
                right={'-1'}
                size={'sm'}
                top={'0'}
              />
            </PopoverHeader>
            <FormControl>
              <FormProvider {...form}>
                <form
                  // TODO: fix eslint error
                  onSubmit={(e) => {
                    const handleSubmit = form.handleSubmit(handleSaveOnClick);
                    handleSubmit(e).catch(console.error);
                  }}
                >
                  <PopoverBody pl={'2'} pr={'2'}>
                    {/* TODO: wrap children into a form, in order to propagate the changed form values to onSettingsChange */}
                    {children}
                  </PopoverBody>
                  <PopoverFooter mt={2} pl={'2'} pr={'2'}>
                    <Flex flex={'1'}>
                      <Button
                        borderRadius={'3'}
                        colorScheme={'green'}
                        flex={'1'}
                        size={'sm'}
                        // onClick={handleSaveOnClick}
                        type="submit"
                      >
                        Save
                      </Button>
                    </Flex>
                    <Flex flex={'1'} gap={'3'} justifyContent={'end'} mt={'2'}>
                      <Button
                        borderRadius={'3'}
                        flex={'1'}
                        size={'sm'}
                        onClick={onClose}
                      >
                        Close
                      </Button>
                      {/* TODO: add confirmation alert https://chakra-ui.com/docs/components/alert-dialog */}
                      <Button
                        borderRadius={'3'}
                        colorScheme={'red'}
                        flex={'1'}
                        size={'sm'}
                        onClick={handleRemoveWidgetClick}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </PopoverFooter>
                </form>
              </FormProvider>
            </FormControl>
          </PopoverContent>
        </Box>
      </Popover>
    </Flex>
  );
};
