import React, { useState } from "react";
import Product from "~/components/elements/products/Product";
import ProductInteractivo from "~/components/elements/products/ProductInteractivo";
import { generateTempArray } from "~/utilities/common-helpers";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import ProductGridWithDetail from "~/components/elements/products/ProductGridWithDetail";
import ProductList from "~/components/elements/products/ProductList";
import SkeletonProductHorizontal from "~/components/elements/skeletons/SkeletonProductHorizontal";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper/core";
import SwiperCarousel from "~/components/elements/carousel/SwiperCarousel";

// install Swiper modules
SwiperCore.use([Navigation]);

export default function useProductGroup() {
    const showInteractivo = useSelector(
        (state) => state.selectviewproduct.selectviewproduct.viewproductinteractive
    );

    //console.log("VALOR VIEW PRODUCTO : ", showInteractivo)

    return {
        withCarousel: (source, loading, setting) => {
            let carousel;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Product product={item} />
                        </SwiperSlide>
                    ));

                    carousel = (
                        <SwiperCarousel setting={setting ? setting : undefined}>
                            {items}
                        </SwiperCarousel>
                    );
                } else {
                    carousel = <p>No product(s) found.</p>;
                }
            } else {
                const skeletons = generateTempArray(2).map((item) => (
                    <div className=" col-6" key={item}></div>
                ));
                carousel = <div className="row">{skeletons}</div>;
            }
            return carousel;
        },
        withGrid: (source, loading, columns = 5) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="ps-layout__item" key={item.id}>
                            <Product product={item} />
                        </div>
                    ));
                    view = (
                        <div
                            className="ps-layout--grid ps-shop-items"
                            data-columns={columns}>
                            {items}
                        </div>
                    );
                } else {
                    view = <p>No product found.</p>;
                }
            } else {
                const items = generateTempArray(columns * 2).map((item) => (
                    <div key={item} className="ps-layout__item">
                        <SkeletonProduct />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--grid ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
        withGridDetail: (source, loading, columns = 5) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="ps-layout__item" key={item.id}>
                            <ProductGridWithDetail product={item} />
                        </div>
                    ));
                    view = (
                        <div
                            className="ps-layout--grid ps-shop-items with-skeleton"
                            data-columns={columns}>
                            {items}
                        </div>
                    );
                } else {
                    view = <p>No product found.</p>;
                }
            } else {
                const items = generateTempArray(columns * 2).map((item) => (
                    <div
                        key={item}
                        className="ps-layout__item"
                        data-columns={columns}>
                        <SkeletonProduct />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--grid ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
        withList: (source, loading, columns = 4) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="ps-layout__item" key={item.id}>
                            <ProductList product={item} />
                        </div>
                    ));
                    view = (
                        <div className="ps-layout--list ps-shop-items">
                            {items}
                        </div>
                    );
                } else {
                    view = <p>No product found.</p>;
                }
            } else {
                const items = generateTempArray(columns).map((item) => (
                    <div
                        key={item}
                        className="ps-layout__item"
                        data-columns={columns}>
                        <SkeletonProductHorizontal />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--list ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
    };
}
