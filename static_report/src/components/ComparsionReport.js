import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { useEffect, useRef } from 'react';

import { Main } from './Main';
import { drawComparsionChart } from '../utils';

export function ComparisonReport() {
  const data = window.PIPERIDER_REPORT_DATA;

  if (data === '') {
    return (
      <Main>
        <Flex justifyContent="center" alignItems="center" minHeight={'100vh'}>
          No profile data found.
        </Flex>
      </Main>
    );
  }

  return (
    <Main>
      <Flex direction={'column'} minH={'100vh'} width={'100%'}>
        <Flex
          border={'1px solid'}
          borderColor={'gray.300'}
          bg={'white'}
          borderRadius={'md'}
          p={6}
          my={10}
          mx={'10%'}
          direction={'column'}
          gap={8}
        >
          <Heading>Comparison Summary</Heading>

          {data && (
            <>
              <TableContainer>
                <Table variant={'simple'}>
                  <Tbody>
                    <Tr>
                      <Td>Base</Td>
                      <Td>
                        {data.table.base.name} at{' '}
                        {format(
                          new Date(data.table.base.created_at),
                          'yyyy/MM/dd HH:mm:ss',
                        )}
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>Input</Td>
                      <Td>
                        {data.table.input.name} at{' '}
                        {format(
                          new Date(data.table.input.created_at),
                          'yyyy/MM/dd HH:mm:ss',
                        )}
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>Distribution</Td>
                      <Td>
                        <List display={'flex'} gap={3}>
                          <ListItem>
                            Changed:{' '}
                            <Text as={'span'} fontWeight={700}>
                              {data.summary.distribution.changed}
                            </Text>
                          </ListItem>
                        </List>
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>Missing Values</Td>
                      <Td>
                        <List display={'flex'} gap={3}>
                          <ListItem>
                            Changed:{' '}
                            <Text as={'span'} fontWeight={700}>
                              {data.summary.missing_values.changed}
                            </Text>
                          </ListItem>
                        </List>
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>Range</Td>
                      <Td>
                        <List display={'flex'} gap={3}>
                          <ListItem>
                            Changed:{' '}
                            <Text as={'span'} fontWeight={700}>
                              {data.summary.range.changed}
                            </Text>
                          </ListItem>
                          {data.summary.range.first_index && (
                            <ListItem>
                              First Index:{' '}
                              <Text as={'span'} fontWeight={700}>
                                {data.summary.range.first_index}
                              </Text>
                            </ListItem>
                          )}
                        </List>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>

              <Flex gap={4} width={'100%'} justifyContent={'center'}>
                <Text as={'span'}>🔶</Text>
                <Text as={'span'}>🔶</Text>
                <Text as={'span'}>🔶</Text>
              </Flex>

              <TableContainer>
                <Table variant={'simple'}>
                  <Thead>
                    <Tr>
                      <Th width={'10%'} />
                      <Th width={'45%'}>Base</Th>
                      <Th width={'45%'}>Input</Th>
                    </Tr>
                  </Thead>

                  <Tr>
                    <Td position={'relative'}>
                      <Box position={'absolute'} top={6}>
                        Schema
                      </Box>
                    </Td>
                    <Td colSpan={2} whiteSpace={'normal'}>
                      <Accordion allowToggle>
                        <AccordionItem borderColor={'transparent'}>
                          <AccordionButton
                            px={0}
                            _focus={{ boxShadow: 'transparent' }}
                          >
                            Added:
                            <Text as={'span'} fontWeight={700} ml={1}>
                              {data.summary.schema.added}
                            </Text>
                            , Deleted:
                            <Text as={'span'} fontWeight={700} ml={1}>
                              {data.summary.schema.deleted}
                            </Text>
                            , Changed:{' '}
                            <Text as={'span'} fontWeight={700} ml={1}>
                              {data.summary.schema.type_changed}
                            </Text>
                            <Box flex="1" textAlign="left" />
                            <AccordionIcon />
                          </AccordionButton>

                          <AccordionPanel px={0}>
                            <Flex
                              width={'100%'}
                              justifyContent={'space-evenly'}
                            >
                              <TableContainer>
                                <Table variant="simple" width={'350px'}>
                                  <Thead>
                                    <Tr>
                                      <Th>Column</Th>
                                      <Th>Value</Th>
                                    </Tr>
                                  </Thead>
                                  <Tbody>
                                    {data.detail.schema.base.map((column) => (
                                      <Tr
                                        key={nanoid(10)}
                                        color={
                                          column.changed ? 'red.500' : 'inherit'
                                        }
                                      >
                                        <Td>{column.key ?? '-'}</Td>
                                        <Td>{column.value ?? '-'}</Td>
                                      </Tr>
                                    ))}
                                  </Tbody>
                                </Table>
                              </TableContainer>

                              <Flex justifyContent={'center'}>
                                <Divider orientation={'vertical'} />
                              </Flex>

                              <TableContainer>
                                <Table variant="simple" width={'350px'}>
                                  <Thead>
                                    <Tr>
                                      <Th>Column</Th>
                                      <Th>Value</Th>
                                    </Tr>
                                  </Thead>
                                  <Tbody>
                                    {data.detail.schema.input.map((column) => (
                                      <Tr
                                        key={nanoid(10)}
                                        color={
                                          column.changed ? 'red.500' : 'inherit'
                                        }
                                      >
                                        <Td>{column.key ?? '-'}</Td>
                                        <Td>{column.value ?? '-'}</Td>
                                      </Tr>
                                    ))}
                                  </Tbody>
                                </Table>
                              </TableContainer>
                            </Flex>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </Td>
                  </Tr>

                  <Tbody>
                    <Tr>
                      <Td>Rows</Td>
                      <Td>{data.detail.row_count.base}</Td>
                      <Td>{data.detail.row_count.input}</Td>
                    </Tr>

                    <Tr>
                      <Td position={'relative'}>
                        <Box position={'absolute'} top={4}>
                          Distribution
                        </Box>
                      </Td>
                      <Td colSpan={2}>
                        {data.detail.distribution.map((distribution) => {
                          if (distribution['combined']) {
                            return (
                              <Flex key={nanoid(10)} direction={'column'}>
                                <Text fontWeight={700}>
                                  {distribution.column}
                                </Text>
                                <ComparisonBarChart
                                  data={distribution['combined']}
                                />
                              </Flex>
                            );
                          } else if (
                            distribution['base'] &&
                            distribution['input']
                          ) {
                            return (
                              <Flex
                                key={nanoid(10)}
                                gap={2}
                                direction={'column'}
                              >
                                <Text fontWeight={700}>
                                  {distribution.column}
                                </Text>
                                <Flex>
                                  <ComparisonBarChart
                                    hideXAxis
                                    data={distribution['base']}
                                  />
                                  <ComparisonBarChart
                                    hideXAxis
                                    data={distribution['input']}
                                  />
                                </Flex>
                              </Flex>
                            );
                          }
                          return null;
                        })}
                      </Td>
                    </Tr>

                    <Tr>
                      <Td position={'relative'}>
                        <Box position={'absolute'} top={6}>
                          Missing Value
                        </Box>
                      </Td>
                      <Td colSpan={2} whiteSpace={'normal'}>
                        <Accordion allowToggle>
                          <AccordionItem borderColor={'transparent'}>
                            <AccordionButton
                              px={0}
                              _focus={{ boxShadow: 'transparent' }}
                            >
                              <Box flex="1" textAlign="left" />
                              <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel px={0}>
                              <Flex
                                width={'100%'}
                                justifyContent={'space-evenly'}
                              >
                                <TableContainer>
                                  <Table variant="simple" width={'350px'}>
                                    <Thead>
                                      <Tr>
                                        <Th>Column</Th>
                                        <Th>Value</Th>
                                      </Tr>
                                    </Thead>
                                    <Tbody>
                                      {data.detail.missing_values.base.map(
                                        (column) => (
                                          <Tr
                                            key={nanoid(10)}
                                            color={
                                              column.changed
                                                ? 'red.500'
                                                : 'inherit'
                                            }
                                          >
                                            <Td>{column.key ?? '-'}</Td>
                                            <Td>
                                              {Number(column.value).toFixed(
                                                5,
                                              ) ?? '-'}
                                            </Td>
                                          </Tr>
                                        ),
                                      )}
                                    </Tbody>
                                  </Table>
                                </TableContainer>

                                <Flex justifyContent={'center'}>
                                  <Divider orientation={'vertical'} />
                                </Flex>

                                <TableContainer>
                                  <Table variant="simple" width={'350px'}>
                                    <Thead>
                                      <Tr>
                                        <Th>Column</Th>
                                        <Th>Value</Th>
                                      </Tr>
                                    </Thead>
                                    <Tbody>
                                      {data.detail.missing_values.input.map(
                                        (column) => (
                                          <Tr
                                            key={nanoid(10)}
                                            color={
                                              column.changed
                                                ? 'red.500'
                                                : 'inherit'
                                            }
                                          >
                                            <Td>{column.key ?? '-'}</Td>
                                            <Td>
                                              {Number(column.value).toFixed(
                                                5,
                                              ) ?? '-'}
                                            </Td>
                                          </Tr>
                                        ),
                                      )}
                                    </Tbody>
                                  </Table>
                                </TableContainer>
                              </Flex>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </Td>
                    </Tr>

                    <Tr>
                      <Td position={'relative'}>
                        <Box position={'absolute'} top={6}>
                          Range
                        </Box>
                      </Td>
                      <Td colSpan={2} whiteSpace={'normal'}>
                        <Accordion allowToggle>
                          <AccordionItem borderColor={'transparent'}>
                            <AccordionButton
                              px={0}
                              _focus={{ boxShadow: 'transparent' }}
                            >
                              <Box flex="1" textAlign="left" />
                              <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel px={0}>
                              <Flex
                                width={'100%'}
                                justifyContent={'space-evenly'}
                              >
                                <TableContainer>
                                  <Table variant="simple" width={'350px'}>
                                    <Thead>
                                      <Tr>
                                        <Th>Column</Th>
                                        <Th>Range</Th>
                                      </Tr>
                                    </Thead>
                                    <Tbody>
                                      {data.detail.range.base.map((column) => (
                                        <Tr
                                          key={nanoid(10)}
                                          color={
                                            column.changed
                                              ? 'red.500'
                                              : 'inherit'
                                          }
                                        >
                                          <Td>{column.key ?? '-'}</Td>
                                          <Td>
                                            {JSON.stringify(column.value) ??
                                              '-'}
                                          </Td>
                                        </Tr>
                                      ))}
                                    </Tbody>
                                  </Table>
                                </TableContainer>

                                <Flex justifyContent={'center'}>
                                  <Divider orientation={'vertical'} />
                                </Flex>

                                <TableContainer>
                                  <Table variant="simple" width={'350px'}>
                                    <Thead>
                                      <Tr>
                                        <Th>Column</Th>
                                        <Th>Range</Th>
                                      </Tr>
                                    </Thead>
                                    <Tbody>
                                      {data.detail.range.input.map((column) => (
                                        <Tr
                                          key={nanoid(10)}
                                          color={
                                            column.changed
                                              ? 'red.500'
                                              : 'inherit'
                                          }
                                        >
                                          <Td>{column.key ?? '-'}</Td>
                                          <Td>
                                            {JSON.stringify(column.value) ??
                                              '-'}
                                          </Td>
                                        </Tr>
                                      ))}
                                    </Tbody>
                                  </Table>
                                </TableContainer>
                              </Flex>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </>
          )}
        </Flex>
      </Flex>
    </Main>
  );
}

function ComparisonBarChart({ data, hideXAxis = false}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      drawComparsionChart({
        containerWidth: containerRef.current.getBoundingClientRect().width,
        svgTarget: svgRef.current,
        tooltipTarget: '.chart',
        hideXAxis,
        data,
      });
    }
  }, [data, hideXAxis]);

  return (
    <Flex className={'chart'} ref={containerRef}>
      <svg ref={svgRef} />
    </Flex>
  );
}
