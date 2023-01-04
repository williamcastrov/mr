import React, { useEffect } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";
import CountDown from "~/components/elements/CountDown";
import ProductWithAvailable from "~/components/elements/products/ProductWithAvaiable";

const HomeThreeWeekDeal = () => {
    const { loading, productItems, getProducts } = useGetProducts();
    const { withGrid } = useProductGroup();

    useEffect(() => {
        getProducts({ _limit: 8 });
    }, []);
    const products = withGrid(productItems, loading, 4);
    return (
        <>
            <section className="ps-home-week-deal">
                <div className="container">
                    <div className="ps-section__left">
                        <h3 className="ps-section__heading">This week deal</h3>
                        <div className="ps-section__content">
                            <CountDown
                                time="12 31 2021, 6:00 am"
                                format="MM DD YYYY, h:mm a"
                            />
                            {productItems && productItems.length > 0 ? (
                                <ProductWithAvailable
                                    product={productItems[0]}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="ps-section__right">
                        <h3 className="ps-section__heading">Latest products</h3>
                        <div className="ps-section__content">{products}</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeThreeWeekDeal;
