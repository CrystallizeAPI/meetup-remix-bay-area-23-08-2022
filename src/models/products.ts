import { catalogueFetcherGraphqlBuilder, createCatalogueFetcher, createClient } from '@crystallize/js-api-client';

export async function fetchRandomProductsAtPath(path: string) {
    const apiClient = createClient({ tenantIdentifier: 'dounot' });

    const fetcher = createCatalogueFetcher(apiClient);
    try {
        const builder = catalogueFetcherGraphqlBuilder;
        const products = await fetcher<{ catalogue: any }>({
            catalogue: {
                __args: {
                    path,
                    language: 'en',
                },
                children: {
                    name: true,
                    path: true,
                    __on: [
                        builder.onProduct(
                            {
                                id: true,
                            },
                            {
                                onVariant: {
                                    id: true,
                                    firstImage: {
                                        url: true,
                                        variants: {
                                            url: true,
                                            width: true,
                                        },
                                    },
                                },
                            },
                        ),
                    ],
                },
            },
        });

        return products.catalogue.children;
    } catch (e) {
        console.log(e);
    }
}


export async function fetchProduct(path: string) {
    const apiClient = createClient({ tenantIdentifier: 'dounot' });
    const fetcher = createCatalogueFetcher(apiClient);
    try {
        const builder = catalogueFetcherGraphqlBuilder;
        const products = await fetcher<{ catalogue: any }>({
            catalogue: {
                __args: {
                    path,
                    language: 'en',
                },
                name: true,
                __on: [
                    builder.onItem(),
                    builder.onProduct({
                        id: true,
                    },
                        {
                            onVariant: {
                                id: true,
                                attributes: {
                                    attribute: true,
                                    value: true
                                },
                                firstImage: {
                                    url: true,
                                    variants: {
                                        url: true,
                                        width: true,
                                    }
                                }
                            }
                        }
                    ),
                ],
            },
        });
        return products.catalogue;
    } catch (e) {
        console.log(e);
    }
}
