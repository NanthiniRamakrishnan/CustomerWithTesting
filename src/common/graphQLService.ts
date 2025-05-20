import client from "./apolloClient";
import { DocumentNode, FetchPolicy, gql } from "@apollo/client";

export const executeQuery = async (query: string | DocumentNode, variables?: any, fetchPolicy?: FetchPolicy) => {
    try {
        const response = await client.query({
            query: gql`${query}`,
            variables,
            fetchPolicy: fetchPolicy || 'cache-first',
        });
        return response.data;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}