import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { withApollo } from '../../libs/apollo';
import { SKU_NEW_LISTING_QUERY } from '../../queries/routerQueries';

import SubCategoryItem from './SubCategoryItem';

import styles from '../../styles/SubCategoryType.module.css';

const SubCategoryType = ({ slug }) => {
  const router = useRouter();
  const category = router.pathname.split('/')[1];
  const fieldTypeRequest = router.query.slug[0];
  const subcategory = router.query.slug[0];
  const vehicle = router.query.slug[1].split('-');
  const year = vehicle[2];
  const make = vehicle[0];
  const model = vehicle[1];
  const submodel = router.query.slug[2];
  const engine = router.query.slug[3].split('-').join(' ');
  const { data, loading } = useQuery(SKU_NEW_LISTING_QUERY, {
    variables: {
      category,
      fieldTypeRequest,
      subcategory,
      year,
      make,
      model,
      submodel,
      engine,
      brand: '',
      brandFacet: '',
      pageNo: 1,
      partType: '',
      position: '',
      price: '',
      productType: '',
    },
  });

  const renderSubCategoryItem = () => {
    if (loading) return <h1>Loading...</h1>;
    return data.store.productTypeSkuList.sku.edges.map((item) => (
      <SubCategoryItem key={item.node.id} product={item.node} />
    ));
  };
  return (
    <div>
      <h1>Category Type</h1>
      <div className={styles.subCategoryDirectory}>
        {renderSubCategoryItem()}
      </div>
    </div>
  );
};

export const getServerSideProps = (context) => {
  console.log(context);
}

export default SubCategoryType;
