import { withApollo } from '../../libs/apollo';
import SubCategoryType from '../../components/SubCategoryType';

const Index = ({ slug }) => {
  return <SubCategoryType slug={slug} />;
};

Index.getInitialProps = async (context) => {
  return {
    slug: context.query.slug,
  };
};

export default withApollo({ ssr: true })(Index);
