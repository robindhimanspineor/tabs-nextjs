import { gql } from '@apollo/client';
// import gql from 'graphql';

export const MAKE_QUERY = gql`
  query MakeQuery($year: String!) {
    store {
      makes(year: $year) {
        key
        value
      }
    }
  }
`;

export const MODEL_QUERY = gql`
  query ModelQuery($year: String!, $make: String!) {
    store {
      model(year: $year, make: $make) {
        key
        value
      }
    }
  }
`;

export const SUB_MODEL_QUERY = gql`
  query SubModelQuery($year: String!, $make: String!, $model: String!) {
    store {
      submodel(year: $year, make: $make, model: $model) {
        key
        value
      }
    }
  }
`;

export const ENGINE_QUERY = gql`
  query EngineQuery(
    $year: String!
    $make: String!
    $model: String!
    $submodel: String!
  ) {
    store {
      engine(year: $year, make: $make, model: $model, submodel: $submodel) {
        key
        value
      }
    }
  }
`;
