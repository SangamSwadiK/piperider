import { Box, Code, Flex, Text } from '@chakra-ui/react';
import { MetricsInfo } from '../shared/MetrisInfo';
import { getSRCommonMetrics } from '../../utils';
import { ColumnSchema } from '../../sdlc/single-report-schema';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { NumericTableColumn } from '../shared/NumericTableColumn';
import { GeneralTableColumn } from '../shared/GeneralTableColumn';
import { SRTooltip } from './SRTooltip';

type SRTableColumnDetailsProps = {
  column: ColumnSchema;
};

export const SRTableColumnDetails = ({ column }: SRTableColumnDetailsProps) => {
  return (
    <Flex direction="column" gap={3}>
      <Box maxWidth="100%">
        <Flex>
          <Text
            as="span"
            fontWeight={700}
            color="gray.900"
            fontSize="lg"
            mr={1}
            title={column.name as string}
            noOfLines={1}
          >
            {column.name as string}
          </Text>
          <SRTooltip
            label={(column.description as string) || ''}
            prefix={' - via '}
            placement="right-end"
          >
            <InfoOutlineIcon m={'auto 0'} />
          </SRTooltip>
        </Flex>
        {''}(<Code>{column.schema_type as string}</Code>)
      </Box>

      <Flex direction="column" mt={3}>
        <GeneralTableColumn baseColumn={column} />
      </Flex>

      {column.type === 'string' && column.distribution && (
        <Flex direction="column">
          <MetricsInfo
            name="Most common"
            base={getSRCommonMetrics(column)}
            baseWidth={'200px'}
          />
        </Flex>
      )}

      {column.type === 'numeric' && <NumericTableColumn baseColumn={column} />}

      {column.type === 'datetime' && (
        <Flex direction="column">
          <MetricsInfo name="Min" base={column.min as number} />

          <MetricsInfo name="Max" base={column.max as number} />
        </Flex>
      )}
    </Flex>
  );
};
