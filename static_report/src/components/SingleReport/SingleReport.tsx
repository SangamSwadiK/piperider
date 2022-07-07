import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { Link } from 'wouter';

import { Main } from '../shared/Main';
import { getReportAsserationStatusCounts } from '../../utils';

import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { SingleReportSchema } from '../../sdlc/single-report-schema';
import { SRTabProfilingDetails } from './SRTabProfilingDetails';
import { SRTabTestDetails } from './SRTabTestDetails';
import { SRTableOverview } from './SRTableOverview';
import { tableSchemaSchema } from '../../sdlc/zod-types';

interface Props {
  data: SingleReportSchema;
  name: string;
}
export default function SingleReport({ data, name }: Props) {
  const { datasource: source, tables } = data;
  const table = tables[name];
  // tableSchemaSchema.parse(table);

  useDocumentTitle(name);

  if (!data) {
    return (
      <Main>
        <Flex justifyContent="center" alignItems="center" minHeight="100vh">
          No profile data found.
        </Flex>
      </Main>
    );
  }

  const overview = getReportAsserationStatusCounts(
    table.piperider_assertion_result,
  );

  return (
    <Main>
      <Flex direction="column" minH="calc(100vh + 1px)" width="100%">
        <Flex mx="10%" mt={4}>
          <Breadcrumb fontSize="lg">
            <BreadcrumbItem>
              <Link href="/">
                <BreadcrumbLink href="/">{source.name}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{table.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Flex
          border="1px solid"
          borderColor="gray.300"
          bg="white"
          borderRadius="md"
          p={6}
          mt={3}
          mx="10%"
          direction="column"
        >
          <SRTableOverview table={table} overview={overview} />

          <Tabs isLazy>
            <TabList>
              <Tab>Profiling</Tab>
              <Tab>Tests</Tab>
              {/* If have `dbt_test_result` it will render this tab */}
              {table.dbt_assertion_result && <Tab>dbt Tests</Tab>}
            </TabList>

            <TabPanels>
              <TabPanel>
                <SRTabProfilingDetails data={table.columns} />
              </TabPanel>

              <TabPanel>
                <SRTabTestDetails
                  assertionData={table.piperider_assertion_result}
                />
              </TabPanel>

              {table.piperider_assertion_result && (
                <TabPanel>
                  <SRTabTestDetails
                    type="dbt"
                    assertionData={table.dbt_assertion_result}
                  />
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Main>
  );
}
