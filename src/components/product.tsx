import { Product as ProductType } from "@crystallize/js-api-client";
import { Image } from "@crystallize/reactjs-components";
import { VariantSelector } from "./variant-selector";

export const Product: React.FC<{ product: ProductType }> = ({ product }) => {
    return (
        <>
            <div
                className="bg-background5 z-0 absolute left-0 right-0 rounded-full"
                style={{
                    bottom: "10%",
                    top: "20%",
                    zIndex: "-1",
                }}
            ></div>
            <div className="py-5">
                <div className="flex lg:flex-row flex-col items-center mt-10 mb-5">
                    <div className="flex flex-col text-text w-6/12">
                        <h1 className="font-extrabold text-5xl mb-3">{product.name}</h1>
                    </div>
                    <Image
                        {...product.variants![0].firstImage}
                        sizes="400px"
                        className="w-full rounded-sm"
                    />
                    <div className="flex flex-col">
                        <VariantSelector variants={product.variants!} />
                    </div>
                </div>
                <div className="flex z-10 justify-between lg:w-5/12 w-8/12 mx-auto bg-white p-5 text-text rounded-xl">
                    <div>
                        <p className="font-semibold text-sm">Total price</p>
                        <p className="font-bold text-lg">${product.variants![0].price}</p>
                    </div>
                    <button className="bg-background2 px-4 rounded-xl"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
};
