import { NextPage } from 'next';
import queryString from 'query-string';
import ProductDetailsFood from 'components/product-details/product-details-three/product-details-three';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
  ProductSingleContainer,
} from 'assets/styles/product-single.style';
import { SEO } from 'components/seo';
import { getAllVendors, getVendorBySlug } from 'utils/api/vendor';
 

const ProductPage = ({ data, deviceType }) => {
  const router = {};

  if (router.isFallback) return <p>Loading...</p>;

  return (
    <>
      <SEO
        title={`${data?.name} - PickBazar`}
        description={`${data?.name} Details`}
      />
      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            <ProductDetailsFood product={data} deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};

export async function getStaticProps({ params }) {
  const data = await getVendorBySlug(params.slug);
  return {
    props: {
      data,
    },
  };
}
export async function getStaticPaths() {
  const vendors = await getAllVendors();
  return {
    paths: vendors.slice(0, 10).map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
export default ProductPage;
