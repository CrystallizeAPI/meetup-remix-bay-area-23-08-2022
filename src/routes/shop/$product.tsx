import { Product as ProductType } from "@crystallize/js-api-client";
import { HeadersFunction, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Product } from "~/components/product";
import { fetchProduct } from "~/models/products";

export const loader: LoaderFunction = async ({ params }) => {
    const product = await fetchProduct(`/shop/${params.product!}`);
    return json({ product },
        {
            headers: {
                "Cache-Control": "public, max-age=60, s-maxage=3022, stale-while-revalidate=60",
                "Surrogate-Key": `product, product-${product.id}`,
            }
        });
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
    return {
        "Cache-Control": loaderHeaders.get("Cache-Control") || "public, max-age=60, s-maxage=3633, stale-while-revalidate=60",
    }
};

export default function Index() {
    const { product } = useLoaderData<{ product: ProductType }>();
    return (
        <div>
            <Product product={product} />
        </div>
    );
}
