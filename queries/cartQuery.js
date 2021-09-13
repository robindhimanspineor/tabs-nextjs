import { gql } from '@apollo/client';

export const CART_QUERY = gql`
  query CartQuery(
    $cart_id: String!
    $user_id: String!
    $operation: String!
    $zip_code: String!
  ) {
    store {
      outerCart(
        cart_id: $cart_id
        user_id: $user_id
        operation: $operation
        zip_code: $zip_code
      ) {
        id
        cart {
          id
          user_id
          cart_id
          cart_total
          core_deposit_total
          cart_unitPrice_total
          cart_shipping_total
          totalNumberOfItems
          cart_total_shipping_excluded
          cart_entry {
            title
            imageUrl
            price
            subTotal
            mapTotal
            quantity
            sku_id
            primary
            core_deposit
            product_url
            distributor_group
            brand
            category
            partType
            isFreight
            shippingMethod
            part_number
            map
            mapFlag
            subTotalShippingExcluded
            subTotalUnitPrice
            mapTotalShippingExcluded
            estDelivery
            shippingPrice
            shippingTotal
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
  }
`;
