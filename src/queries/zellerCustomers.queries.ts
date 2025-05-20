export const listZellerCustomers = `query ListZellerCustomers($filter: TableZellerCustomerFilterInput) {
  listZellerCustomers(filter: $filter) {
    items {
      id
      name
      email
      role
    }
  }
}`;