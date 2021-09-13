import Link from 'next/link';
import { useRouter } from 'next/router';
import { CATEGORY_QUERY } from '../../../queries/routerQueries';
import { withApollo } from '../../../libs/apollo';

import styles from '../../../styles/ShopByCategory.module.css';

const SubModel = ({ categoryFields }) => {
  const router = useRouter();

  const renderRoute = (item, subItem) => {
    const vehicle = router.query.vehicle;
    const submodel = router.query.submodel;
    const engine = router.query.engine;

    return `/${item}/${subItem}/${vehicle}/${submodel}/${engine}`;
  };

  const renderCategoryItem = () => {
    if (categoryFields && categoryFields.length) {
      return categoryFields.map((item, i) => (
        <div key={i} className={styles.categoryItem}>
          <div className={styles.categoryItemImage}>
            <img alt="category" />
            <button disabled={item.subcategoryList.length < 5}>View All</button>
          </div>
          <div className={styles.subCategoryList}>
            <h2 className={styles.categoryHeading}>
              {item.category.split('-').join(' ')}
            </h2>
            {item && item.subcategoryList && item.subcategoryList.length ? (
              <ul>
                {item.subcategoryList.slice(0, 5).map((subCategoryItem) => (
                  <Link
                    href={renderRoute(item.category, subCategoryItem.value)}
                    as={renderRoute(item.category, subCategoryItem.value)}
                    key={subCategoryItem.key}
                  >
                    <li className={styles.subCategoryItem}>
                      {subCategoryItem.value.split('-').join(' ')}
                    </li>
                  </Link>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ));
    }
  };
  return (
    <div>
      <div className={styles.title}>
        <p>Shop By Category</p>
      </div>
      <div className={styles.categoryDirectory}>{renderCategoryItem()}</div>
    </div>
  );
};

SubModel.getInitialProps = async (context) => {
  const vehicle = context.query.vehicle.split('-');
  const year = vehicle[2];
  const make = vehicle[0];
  const model = vehicle[1];
  const submodel = context.query.submodel;
  const engine = context.query.engine.split('-').join(' ');

  const data = await context.apolloClient.query({
    query: CATEGORY_QUERY,
    variables: { year, make, model, submodel, engine },
  });
  return {
    categoryFields: data.data.store.categoryfilter.categorylist,
  };
};

export default withApollo({ ssr: true })(SubModel);
