import { HeadersFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const headers: HeadersFunction = ({ parentHeaders }) => {
    return {
        "Cache-Control": "public, max-age=60, s-maxage=3604, stale-while-revalidate=60",
        "Surrogate-Key": "homepage",
        "Link": parentHeaders.get("Link") as string,
    }
};

export default function Index() {
    return (
        <div className="mx-auto mt-16 max-w-7xl text-center">
            <Link
                to="/shop"
                className="text-xl text-blue-600 underline"
            >
                <button className="bg-background2 px-4 rounded-xl"
                >
                    GO TO SHOP
                </button>
            </Link>
        </div>
    );
}
