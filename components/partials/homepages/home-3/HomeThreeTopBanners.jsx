import React from "react";
import Slider from "react-slick";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";

const carouselSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    dots: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};
const HomeThreeTopBanners = () => {
    return (
        <div className="ps-section--banner  ps-top-banners">
            <div className="ps-section__overlay">
                <div className="ps-section__loading"></div>
            </div>
            <Slider
                {...carouselSetting}
                className="ps-carousel ps-carousel--fullwidth">
                <div className="carousel-item">
                    <div
                        className="ps-banner"
                        style={{ background: "#F0F2F5" }}>
                        <div className="container container-initial">
                            <div className="ps-banner__block">
                                <div className="ps-banner__content">
                                    <h2 className="ps-banner__title">
                                        Antibacterial
                                        <br /> Medical Mask
                                    </h2>
                                    <div className="ps-banner__desc">
                                        Just a few seconds to measure your body
                                        temperature.
                                    </div>
                                    <div className="ps-banner__btn-group">
                                        <div className="ps-banner__btn">
                                            <img
                                                src="/static/img/icon/bacterial.svg"
                                                alt="alt"
                                            />
                                            Anti-Bacterial
                                        </div>
                                        <div className="ps-banner__btn">
                                            <img
                                                src="/static/img/icon/virus.svg"
                                                alt="alt"
                                            />
                                            Anti-Virus
                                        </div>
                                    </div>
                                    <a
                                        className="bg-warning ps-banner__shop"
                                        href="#">
                                        Shop now
                                    </a>
                                    <div className="ps-banner__persen bg-yellow ps-top">
                                        <small>only</small>$25
                                    </div>
                                </div>
                                <div className="ps-banner__thumnail">
                                    <img
                                        className="ps-banner__round"
                                        src="/static/img/round5.png"
                                        alt="alt"
                                    />
                                    <img
                                        className="ps-banner__image"
                                        src="/static/img/promotion/slide3.png"
                                        alt="alt"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div
                        className="ps-banner"
                        style={{ background: "#103178" }}>
                        <div className="container container-initial">
                            <div className="ps-banner__block">
                                <div className="ps-banner__content">
                                    <h2 className="ps-banner__title text-white">
                                        PowerSteel <br /> X-tra 200 Brush
                                    </h2>
                                    <div className="ps-banner__desc text-white">
                                        Only in this week. Don’t misss!
                                    </div>
                                    <div className="ps-banner__price">
                                        <span className="text-yellow">
                                            $29.99
                                        </span>
                                        <del>$15.99</del>
                                    </div>
                                    <a
                                        className="bg-yellow ps-banner__shop"
                                        href="#">
                                        Agregar al carrito
                                    </a>
                                    <div className="ps-banner__persen bg-yellow">
                                        -30%
                                    </div>
                                </div>
                                <div className="ps-banner__thumnail ps-banner__fluid">
                                    <img
                                        className="ps-banner__image"
                                        src="/static/img/promotion/bg-slide3-home3.jpg"
                                        alt="alt"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default HomeThreeTopBanners;
