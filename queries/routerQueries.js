// import gql from 'graphql';
import { gql } from '@apollo/client';

const Category_store = gql`
  fragment Category_store on Store {
    categoryfilter(
      year: $year
      make: $make
      model: $model
      submodel: $submodel
      engine: $engine
    ) {
      categorylist {
        category
        subcategoryList {
          key
          value
        }
      }
    }
  }
`;

export const CATEGORY_QUERY = gql`
  ${Category_store}
  query router_Category_Query(
    $year: String!
    $make: String!
    $model: String!
    $submodel: String!
    $engine: String!
  ) {
    store {
      ...Category_store
    }
  }
`;

const SkuNewListing_store = gql`
  fragment SkuNewListing_store on Store {
    fieldType(fieldTypeRequest: $fieldTypeRequest) {
      fieldTypeResponse
    }
    productTypeSkuList(
      year: $year
      make: $make
      model: $model
      submodel: $submodel
      engine: $engine
      category: $category
      brand: $brand
      partType: $partType
      price: $price
      productType: $productType
      position: $position
      brandFacet: $brandFacet
      pageNo: $pageNo
      subcategory: $subcategory
      rows: 12
    ) {
      count
      sku {
        edges {
          node {
            id
            skuid
            primary
            Title
            PartNumber
            brand
            Category
            Subcategory
            ImageURL
            price
            Availability
            Description
            core_deposit
            product_url
            part_type
            distributor_group
            isFreight
            shipping_method
            shippingCost
            map
            mapFlag
            mapPlusCore
            pricePlusCore
          }
        }
      }
    }
  }
`;

export const SKU_NEW_LISTING_QUERY = gql`
  ${SkuNewListing_store}
  query router_SkuNewListing_Query(
    $year: String!
    $make: String!
    $model: String!
    $submodel: String!
    $engine: String!
    $partType: String!
    $category: String!
    $brand: String!
    $price: String!
    $productType: String!
    $brandFacet: String!
    $position: String!
    $pageNo: Int!
    $subcategory: String!
    $fieldTypeRequest: String!
  ) {
    store {
      ...SkuNewListing_store
    }
  }
`;
