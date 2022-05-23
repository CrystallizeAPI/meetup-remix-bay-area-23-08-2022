import { ProductVariant, ProductVariantAttribute } from "@crystallize/js-api-client";

function reduceAttributes(variants: ProductVariant[]) {
    return variants.reduce((acc, variant: ProductVariant) => {
        const attrs: {
            [key: string]: string[]
        } = acc;
        variant.attributes!.forEach((attribute: ProductVariantAttribute) => {
            const { attribute: key, value } = attribute;
            const currentAttribute = attrs[key];
            if (!currentAttribute) {
                attrs[key] = [value || ''];
                return;
            }

            const valueExists = currentAttribute.find((str) => str === value);
            if (!valueExists) {
                attrs[key].push(value || '');
            }
        });
        return attrs;
    }, {});
}


export const VariantSelector: React.FC<{ variants: ProductVariant[] }> = ({ variants }) => {
    const attributes = reduceAttributes(variants);
    return (
        <div>
            {Object.keys(attributes).map((key) => {
                const values: string[] = attributes[key as keyof typeof attributes];
                return (
                    <div key={key} className="w-40">
                        <p className="my-3 text-text font-semibold">{key}</p>
                        <div className="flex justify-between mb-5">
                            {values.map((value: string) => (
                                <button
                                    key={value}
                                    type="button"
                                    className="bg-white drop-shadow-sm w-30 px-3 py-2 rounded-sm text-text font-semibold"
                                    style={{ border: "3px solid transparent", }}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
