import React from "react";
import Slider from "react-slick";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";

const carouselSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    lazyload: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};
const HomeFiveTopBanners = () => {
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
                        style={{ background: "#f0f2f5" }}>
                        <div className="container container-initial">
                            <div className="ps-banner__block">
                                <div className="ps-banner__content">
                                    <h2 className="ps-banner__title">
                                        Fully equipped
                                        <br /> of ophthalmic <br />
                                        rooms
                                    </h2>
                                    <div className="ps-banner__desc">
                                        Only in this week. Don’t misss!
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
                                    <div className="ps-banner__persen bg-yellow ps-center">
                                        -30%
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
                                        src="/static/img/promotion/slide5.jpg"
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
                        style={{ background: "#FFCC00" }}>
                        <div className="container container-initial">
                            <div className="ps-banner__block">
                                <div className="ps-banner__content">
                                    <h2 className="ps-banner__title">
                                        Get rid of bacteria <br />
                                        in your home
                                    </h2>
                                    <div className="ps-banner__desc">
                                        Get rid of all bacteria!
                                    </div>
                                    <div className="ps-banner__btn-group">
                                        <div className="ps-banner__btn font-bold">
                                            <img
                                                src="/static/img/icon/bacterial.svg"
                                                alt="alt"
                                            />
                                            Anti-Bacterial
                                        </div>
                                        <div className="ps-banner__btn font-bold">
                                            <img
                                                src="/static/img/icon/virus.svg"
                                                alt="alt"
                                            />
                                            Anti-Virus
                                        </div>
                                    </div>
                                    <a
                                        className="bg-white ps-banner__shop"
                                        href="#">
                                        Shop now
                                    </a>
                                    <div className="ps-banner__persen bg-primary">
                                        -25%
                                    </div>
                                </div>
                                <div className="ps-banner__thumnail">
                                    <img
                                        className="ps-banner__round"
                                        src="/static/img/round2.png"
                                        alt="alt"
                                    />
                                    <img
                                        className="ps-banner__image"
                                        src="/static/img/promotion/slide4.png"
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
                        style={{ background: "#DAECFA" }}>
                        <div className="container container-initial">
                            <div className="ps-banner__block">
                                <div className="ps-banner__content">
                                    <h2 className="ps-banner__title">
                                        Candid <br /> Whitening Kit
                                    </h2>
                                    <div className="ps-banner__desc">
                                        Only in this week. Don’t misss!
                                    </div>
                                    <div className="ps-banner__price">
                                        <span>$15.99</span>
                                        <del>$29.99</del>
                                    </div>
                                    <a
                                        className="bg-warning ps-banner__shop"
                                        href="#">
                                        Shop now
                                    </a>
                                    <div className="ps-banner__persen bg-warning ps-center">
                                        -30%
                                    </div>
                                </div>
                                <div className="ps-banner__thumnail">
                                    <img
                                        className="ps-banner__round"
                                        src="/static/img/round2.png"
                                        alt="alt"
                                    />
                                    <img
                                        className="ps-banner__image"
                                        src="/static/img/promotion/slide1.png"
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

export default HomeFiveTopBanners;
