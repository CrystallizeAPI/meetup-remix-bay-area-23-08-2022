import { Product } from "@crystallize/js-api-client";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { fetchRandomProductsAtPath } from "~/models/products";
import { Image } from "@crystallize/reactjs-components";

export const loader = async () => {
    return json<{ products: Product[] }>({
        products: await fetchRandomProductsAtPath('/shop')
    });
};

export default function Product() {
    const { products } = useLoaderData() as { products: Product[] };
    return (
        <main className="lg:w-content w-full mx-auto flex flex-col mt-20 gap-5 items-center justify-center">
            <h1 className="font-extrabold text-5xl mb-3">Product List</h1>
            <ul>
                {products.map((product: Product) => (
                    <li key={product.path} className="flex items-center">
                        <Image {...product.variants![0].firstImage} sizes="100px" className="w-24 p-2 rounded" />
                        <Link
                            to={product.path!}
                            className="text-blue-600 underline"
                        >
                            {product.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
