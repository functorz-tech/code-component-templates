import { Bar3DChartPropData } from './index';

type SalesHistory = {
  id: number;
  year: number;
  city: string;
  amount: number;
};

const GQL_SALES_HISTORY = `
  query sales_history($where: sales_history_bool_exp) {
    sales_history(
      where: $where
    ) {
      id
      city
      year
      amount
    }
  }
`;

export async function fetchAndProcessData(
  query: (gql: string, variables: Record<string, any>) => Promise<any>,
  propData: Bar3DChartPropData
) {
  const conditions = [];
  if (propData.cityName) {
    conditions.push({ city: { _eq: propData.cityName } });
  }
  if (propData.year) {
    conditions.push({ year: { _eq: propData.year } });
  }

  const variables = {
    where: conditions.length ? { _and: conditions } : {},
    orderBy: [{ id: 'desc' }],
    distinct_on: [],
  };
  const fetched = await query(GQL_SALES_HISTORY, variables);
  const salesData = fetched.data.sales_history as SalesHistory[];

  const cities = Array.from(new Set(salesData.map((data) => data.city)));
  const years = Array.from(new Set(salesData.map((data) => data.year)));

  const salesAmount = salesData.map((item) => [
    years.indexOf(item.year),
    cities.indexOf(item.city),
    item.amount,
  ]);

  return {
    cities,
    years,
    data: salesAmount,
  };
}
