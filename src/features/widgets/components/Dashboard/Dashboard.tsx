import {
  faUpload,
  faDownload,
  faPlus,
  faGear,
  faCircle,
  faCode,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { PropsWithChildren } from 'react';

export const Dashboard: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Flex
        background={'white'}
        flex={'1'}
        pb={4}
        position={'fixed'}
        pt={4}
        shadow={'sm'}
        width={'100%'}
      >
        <Container maxW={'6xl'}>
          <Flex
            alignItems={'center'}
            flexDirection={'row'}
            justifyContent={'space-between'}
          >
            <Flex alignItems={'center'}>
              <Flex
                alignItems={'start'}
                flexDirection={'column'}
                gap={'1.5'}
                justifyContent={'center'}
              >
                <Heading
                  size={'md'}
                  color={useColorModeValue('gray.700', 'gray.400')}
                  // fontSize={'0.65rem'}
                  letterSpacing={'tight'}
                >
                  Porfolio manager
                </Heading>
                <Tag
                  alignItems={'center'}
                  justifyContent={'center'}
                  size={'sm'}
                >
                  <Flex gap={'1.5'}>
                    <Box position={'relative'} top={'0px'}>
                      <FontAwesomeIcon icon={faCode} size={'sm'} />
                    </Box>
                    Developer preview
                  </Flex>
                </Tag>
              </Flex>
              <Divider
                height={'48px'}
                ml={'6'}
                mr={'6'}
                orientation={'vertical'}
              />
              <Flex>
                <Flex flexDirection={'column'} justifyContent={'left'}>
                  <Flex alignItems={'center'} gap={'1.5'}>
                    <FontAwesomeIcon
                      // green.400
                      color={'#48BB78'}
                      icon={faCircle}
                      size={'xs'}
                    />
                    <Text
                      fontSize={'xs'}
                      fontWeight={'normal'}
                      letterSpacing={'tight'}
                    >
                      #234567
                    </Text>
                  </Flex>
                  <Flex
                    alignItems={'center'}
                    color={'gray.700'}
                    flex={'1'}
                    justifyContent={'start'}
                  >
                    <Text fontSize={'x-small'}>Refreshing in 3s</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex alignItems={'center'} gap={'3'}>
              <Flex color={useColorModeValue('gray.700', 'gray.400')} gap={'0'}>
                <Button
                  borderBottomRightRadius={'0'}
                  borderRight={'none'}
                  borderTopRightRadius={'0'}
                  colorScheme={'gray'}
                  leftIcon={<FontAwesomeIcon icon={faPlus} />}
                  size={'sm'}
                  variant={'outline'}
                >
                  Add widget
                </Button>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    borderBottomLeftRadius={'0'}
                    borderLeft={'none'}
                    borderTopLeftRadius={'0'}
                    icon={<FontAwesomeIcon icon={faGear} />}
                    size={'sm'}
                    variant={'outline'}
                  ></MenuButton>
                  <MenuList>
                    <MenuItem icon={<FontAwesomeIcon icon={faDownload} />}>
                      Download settings
                    </MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faUpload} />}>
                      Upload settings
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              <Button colorScheme={'gray'}>Connect wallet</Button>
            </Flex>
          </Flex>
        </Container>
      </Flex>
      <Flex justifyContent={'center'} pt={'20'}>
        <Flex flex={'1'} pt={'8'}>
          <Container maxW={'6xl'}>
            <Flex alignItems={'baseline'} gap={'4'}>
              <Heading color={'gray.700'} pb={7} size={'lg'}>
                My dashboard
              </Heading>
              <Flex color={'blackAlpha.800'} position={'relative'} top={'-2px'}>
                <FontAwesomeIcon icon={faLock} size={'1x'} />
              </Flex>
            </Flex>

            {children}
          </Container>
        </Flex>
      </Flex>
    </>
  );
};
