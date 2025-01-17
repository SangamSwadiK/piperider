import { Flex, Grid, Divider, Text } from '@chakra-ui/react';
import { SRBarChart } from './SRBarChart';
import { SRTableColumnDetails } from './SRTableColumnDetails';
import type { TableSchema } from '../../sdlc/single-report-schema';

export function SRTabProfilingDetails({
  data,
}: {
  data: TableSchema['columns'];
}) {
  return (
    <Flex direction="column" gap={4}>
      {Object.keys(data).map((key) => {
        const column = data[key];
        const distribution = column.distribution;

        return (
          <Flex key={key} direction="column" px={4}>
            <Grid my={4} templateColumns="minmax(270px, 1fr) 1fr" gap={12}>
              <SRTableColumnDetails column={column} />
              <Flex mt={8} justifyContent="center" alignItems="center">
                {distribution ? (
                  <SRBarChart
                    data={distribution.labels.map((label, i) => ({
                      label,
                      value: distribution.counts[i],
                      total: column.total,
                    }))}
                  />
                ) : (
                  <Text>No data available</Text>
                )}
              </Flex>
            </Grid>

            <Divider my={4} />
          </Flex>
        );
      })}
    </Flex>
  );
}
