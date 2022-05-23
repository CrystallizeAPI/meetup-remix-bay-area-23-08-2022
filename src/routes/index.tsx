import { Link } from "@remix-run/react";

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
