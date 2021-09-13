import { useMutation, useLazyQuery } from '@apollo/client';
import { withApollo } from '../../libs/apollo';
import { REMOVE_FROM_CART_MUTATION } from '../../mutation/mutation';
import { CART_QUERY } from '../../queries/cartQuery';

import styles from '../../styles/SubCategoryType.module.css';

const SubCategoryItem = ({ product }) => {
  const addItemQuery = useMutation(REMOVE_FROM_CART_MUTATION);
  const cartQuery = useLazyQuery(CART_QUERY);

  // console.log(addItemQuery,"addItemQuery")

  const handleAddToCartClick = async (partNumber) => {
    console.log(partNumber);
    let input = {
      cart_id: 'ac39846d-858b-4d78-bf37-437034dcd4d9',
      operation: 'add_item',
      quantity: 1,
      sku_id: partNumber,
      user_id: 'e4759092-c69e-44a9-90c2-e74b1cc5d1e7',
      zip_code: '12345',
    };
    await addItemQuery[0]({
      variables: {
        input,
      },
    });
    cartQuery[0]({
      variables: {
        cart_id: '3cb00735-b4fd-4b08-9602-072e49211abe',
        operation: 'view_cart',
        user_id: '69adee74-7ada-4022-a3ca-784d85ad04bf',
        zip_code: '90001',
      },
    });

    console.log(cartQuery[1].data, 'cartQuery[1].data');
  };
  return (
    <div className={styles.productBox}>
      <div className={styles.productImage}>
        <div className={styles.imageItem}>
          <img
            src={product.ImageURL}
            alt={product.Title}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.productContent}>
        <h2 className={styles.productTitle}>{product.Title}</h2>
        <p className={styles.brandPart}>
          <span>
            by <strong>{product.brand}</strong>
          </span>
          <span>
            Part Number <strong>{product.PartNumber}</strong>
          </span>
        </p>
      </div>
      <div className={styles.productControl}>
        <div className={styles.priceGrid}>
          ${product.price}
          <span
            className={`${styles.avail} ${
              product.Availability === 'Y' ? styles.inStock : styles.outOfStock
            }`}
          >
            {product.Availability === 'Y' ? 'In stock' : 'Out Of Stock'}
          </span>
        </div>
        <div
          className={
            product.Availability === 'Y' ? styles.enable : styles.disable
          }
        >
          <button
            className={`${styles.buttonRedSolid} ${product.Availability === 'Y' ? styles.enable : styles.disable}`}
            disabled={product.Availability === 'Y' ? false : true}
            onClick={() => handleAddToCartClick(product.PartNumber)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(SubCategoryItem);

SubCategoryItem.getInitialProps = (context) => {
  console.log(context);

  return {};
};
