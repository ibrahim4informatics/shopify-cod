import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, Layout, Text, Page, Image } from "@shopify/polaris";
import { authenticate } from "app/shopify.server";
import type { FC } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(`
        #graphql
        query getProducts{
            products(first:10){
                edges{
                    node{
                        id
                        title
                        description
                        images(first:1){
                            edges{
                                node{
                                    originalSrc
                                }
                            }
                        }
                    }
                }
            }
        }
        `);
  const data = await response.json();
  return data.data?.products?.edges;
};

const Products: FC = () => {
  const products: any = useLoaderData();

  return (
    <Page>
      <Layout>
        <Layout.Section>
          {products &&
            products.map((product: any) => (
              <Card key={product.node.id}>
                <Text as="h1" tone="base" fontWeight="bold">
                  {product.node.title}
                </Text>
                <Text as="p" fontWeight="regular">
                  {product.node.description}
                </Text>
                {product.node.images.edges.map((image: any) => {
                  return (
                    <Image
                      key={image.node.originalSrc}
                      source={image.node.originalSrc}
                      width={100}
                      alt="maac m1"
                    />
                  );
                })}
              </Card>
            ))}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Products;
