import { gql } from '@apollo/client';

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation RemoveFromCartMutation($input: CartOperationInput!) {
    cartOperation(input: $input) {
      cart {
        id
        cart_id
        cart_total
        core_deposit_total
        totalNumberOfItems
        cart_shipping_total
        cart_unitPrice_total
        cart_total_shipping_excluded
        cart_entry {
          price
          sku_id
          primary
          brand
          quantity
          title
          imageUrl
          core_deposit
          product_url
          distributor_group
          category
          partType
          part_number
          isFreight
          shippingMethod
          subTotalShippingExcluded
          subTotalUnitPrice
          subTotal
          shippingTotal
          map
          mapFlag
          mapTotalShippingExcluded
          estDelivery
          shippingPrice
          unitPriceCoreIncluded
          isAvailable
          errorCode
        }
        is_new
        status
        error
      }
    }
  }
`;
