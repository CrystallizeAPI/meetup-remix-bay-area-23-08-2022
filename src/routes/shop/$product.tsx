import { Product as ProductType } from "@crystallize/js-api-client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Product } from "~/components/product";
import { fetchProduct } from "~/models/products";

export const loader: LoaderFunction = async ({ params }) => {
    return json({ product: await fetchProduct(`/shop/${params.product!}`) });
};

export default function Index() {
    const { product } = useLoaderData() as { product: ProductType };
    return (
        <div>
            <Product product={product} />
        </div>
    );
}
