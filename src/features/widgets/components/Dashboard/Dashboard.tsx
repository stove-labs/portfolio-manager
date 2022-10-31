import {
  faUpload,
  faDownload,
  faPlus,
  faGear,
  faCircle,
  faCode,
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
  Select,
  Tag,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import {
  Currency,
  CurrencyTicker,
  getAllCurrencies,
} from '../../../../config/config/currencies';
import { Block } from '../../../chain/blocks/lib/blocks';
import { emDash } from '../TokenBalanceWidget/TokenBalanceWidget';

export interface Trigger {
  // miliseconds
  countdown: number;
}

export interface DashboardProps {
  onSettingsExport: () => void;
  onSettingsImport: () => void;
  onCurrencyChange: (currency: CurrencyTicker) => void;
  addWidgetAs: (disclosure: UseDisclosureReturn) => ReactNode;
  activeAccountAs: () => ReactNode;
  disableSettings: boolean;
  currency: Currency;
  block?: Block;
  trigger: Trigger;
}

export const Dashboard: React.FC<PropsWithChildren<DashboardProps>> = ({
  children,
  onSettingsExport,
  onSettingsImport,
  onCurrencyChange,
  disableSettings,
  currency,
  block,
  trigger: { countdown },
  addWidgetAs,
  activeAccountAs,
}) => {
  const currencies: Currency[] = getAllCurrencies();
  const disclosure = useDisclosure();
  // how old the block is in seconds
  const blockOldness = useMemo<number | undefined>(() => {
    if (!block) return;
    const now = Date.now();
    const timestamp = Number(block.timestamp);
    return (now - timestamp) / 1000;
  }, [block?.timestamp, Date.now()]);

  const blockLivelinessColor = useMemo<string | undefined>(() => {
    if (!blockOldness) return '#A0AEC0';
    // TODO adjust based on API having older blocks due to finalisation
    // green -> yellow -> red (400)
    // younger than 60 seconds
    // older than 120 seconds
    if (blockOldness > 120) return '#F56565';
    // older than 60 seconds
    if (blockOldness > 60) return '#ECC94B';
    // younger than 60 seconds
    if (blockOldness < 60) return '#48BB78';
  }, [blockOldness]);

  const countdownSeconds = useMemo(() => {
    return countdown / 1000;
  }, [countdown]);

  const handleAddWidget = useCallback(() => {
    disclosure.onOpen();
  }, [disclosure]);

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
        zIndex={'100'}
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
                <Tooltip
                  size={'md'}
                  // TODO: format the block age in a way that handles edge cases
                  label={
                    blockOldness
                      ? `Current block is ${blockOldness.toFixed(0)}s old`
                      : ''
                  }
                >
                  <Flex flexDirection={'column'} justifyContent={'left'}>
                    <Flex alignItems={'center'} gap={'1.5'}>
                      <FontAwesomeIcon
                        // green.400
                        color={blockLivelinessColor}
                        icon={faCircle}
                        size={'xs'}
                      />
                      <Text
                        fontSize={'xs'}
                        fontWeight={'normal'}
                        letterSpacing={'tight'}
                      >
                        {/* TODO: loading status for block */}#
                        {block?.level ?? emDash}
                      </Text>
                    </Flex>
                    <Flex
                      alignItems={'center'}
                      color={'gray.700'}
                      flex={'1'}
                      justifyContent={'start'}
                    >
                      <Text fontSize={'x-small'}>
                        Refreshing in {countdownSeconds}s
                      </Text>
                    </Flex>
                  </Flex>
                </Tooltip>
              </Flex>
            </Flex>
            <Flex alignItems={'center'} gap={'3'}>
              <Select
                // width={'80px'}
                disabled={disableSettings}
                size={'sm'}
                variant={'outline'}
                width={'fit-content'}
                onChange={(e) =>
                  onCurrencyChange(e.target.value as CurrencyTicker)
                }
              >
                {currencies.map((currencyOption: Currency) => {
                  return (
                    <option
                      key={currencyOption.ticker}
                      selected={currency === currencyOption}
                      value={currencyOption.ticker}
                    >
                      {currencyOption.ticker}
                    </option>
                  );
                })}
              </Select>
              <Flex color={useColorModeValue('gray.700', 'gray.400')} gap={'0'}>
                <Button
                  borderBottomRightRadius={'0'}
                  borderRight={'none'}
                  borderTopRightRadius={'0'}
                  colorScheme={'gray'}
                  disabled={disableSettings}
                  leftIcon={<FontAwesomeIcon icon={faPlus} />}
                  size={'sm'}
                  variant={'outline'}
                  onClick={handleAddWidget}
                >
                  Add widget
                </Button>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    borderBottomLeftRadius={'0'}
                    borderLeft={'none'}
                    borderTopLeftRadius={'0'}
                    disabled={disableSettings}
                    icon={<FontAwesomeIcon icon={faGear} />}
                    size={'sm'}
                    variant={'outline'}
                  ></MenuButton>
                  <MenuList>
                    <MenuItem
                      icon={<FontAwesomeIcon icon={faDownload} />}
                      onClick={onSettingsExport}
                    >
                      Export settings
                    </MenuItem>
                    <MenuItem
                      icon={<FontAwesomeIcon icon={faUpload} />}
                      onClick={onSettingsImport}
                    >
                      Import settings
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              {activeAccountAs()}
            </Flex>
          </Flex>
        </Container>
      </Flex>
      {addWidgetAs(disclosure)}
      <Flex
        background={'gray.50'}
        height={'100%'}
        justifyContent={'center'}
        pt={'20'}
      >
        <Flex flex={'1'} pt={'8'}>
          <Container maxW={'6xl'}>
            <Flex alignItems={'baseline'} gap={'4'}>
              <Heading color={'gray.700'} pb={7} size={'lg'}>
                My dashboard
              </Heading>
            </Flex>

            {children ?? (
              <Flex
                alignItems={'center'}
                flex={'1'}
                flexDirection={'column'}
                justifyContent={'center'}
                pt={'20'}
              >
                <Heading size={'md'}>
                  Welcome to the Stove Labs Portfolio Manager
                </Heading>
                <Text mt={'1'}>Please connect your wallet to get started.</Text>
                <Flex mt={'8'}>{activeAccountAs()}</Flex>
              </Flex>
            )}

            <Divider borderColor={'gray.400'} pt={children ? '12' : '24'} />

            <Flex
              color={'gray.400'}
              justifyContent={'space-between'}
              margin={'0 auto'}
              pt={'6'}
            >
              <Flex flexDirection={'column'} maxWidth={'400px'}>
                <Text pb={'2'}>
                  <b>
                    Built by <a href="https://stove-labs.com/">Stove Labs</a>
                  </b>
                </Text>
                <Text>
                  Made possible thanks to the Tezos Foundation, TzKt.io APIs and
                  Font Awesome
                </Text>
              </Flex>
              <Flex maxWidth={'400px'} pt={'2'}>
                <Text>
                  If you are experiencing any issues, or you would like to see
                  additional features, please{' '}
                  <b>
                    <a href="https://github.com/stove-labs/portfolio-manager">
                      open an issue in our github repository
                    </a>
                  </b>
                  .
                </Text>
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </>
  );
};
