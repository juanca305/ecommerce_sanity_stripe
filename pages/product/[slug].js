import React from 'react';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';

const ProductDetails = ({ product, products }) => {
  console.log(product);

    // useEffect(() => {
    //     // This logs the value of `slug` as it changes
    //     console.log('value of slug:', slug);
    //   }, [slug]);
    
    //   // This means that nothing is rendered if `slug` is undefined
    //   if (!slug) return null;


    const { image, name, details, price } = product;
  return (
    <div>
        <div className='product-details-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[0])}/>
                    {/* <img src={urlFor(image && image[index])} className="product-detail-image"/> */}
                </div>
            </div>
        </div>
    </div>
  )
}



export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
          current
      }
  }`;

  const products = await client.fetch(query);
  console.log(products);
  const paths = products.map((product) => ({
      params: {
          slug: product.slug.current
      }
  }));
  return {
      paths,
      fallback: 'blocking'
  }
}

export const getStaticProps = async ({params: {slug}}) => {

  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  // const bannerQuery = '*[_type == "banner"]';
  // const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, product }
  }
}

export default ProductDetails