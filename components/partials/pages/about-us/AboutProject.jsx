import React from "react";

const AboutProject = () => {
    return (
        <section className="ps-about__project">
            <div className="container">
                <h2 className="ps-about__title">
                    Your home medical provider now also online
                </h2>
                <section className="ps-section--block-grid">
                    <div className="ps-section__thumbnail">
                        <a className="ps-section__image" href="#">
                            <img
                                src="/static/img/about/about-us-1.jpg"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="ps-section__content">
                        <h3 className="ps-section__title">
                            Top quality products and proven suppliers with
                            quality certificates!
                        </h3>
                        <div className="ps-section__subtitle">
                            They have CEE 2020 certificate.
                        </div>
                        <div className="ps-section__desc">
                            Hundreds of thousands of products at bargain prices.
                            Completely the needs of home medicine chest and
                            professional offices. Effective and reliable
                            protection for your teeth. The brush handle fits
                            perfectly in the hand, is slim and beautifully made.
                        </div>
                        <ul className="ps-section__list">
                            <li>Study history up to 30 days</li>
                            <li>Up to 5 users simultaneously</li>
                            <li>Has HEALTH certificate</li>
                        </ul>
                    </div>
                </section>
                <section className="ps-section--block-grid row-reverse">
                    <div className="ps-section__thumbnail">
                        <a className="ps-section__image" href="#">
                            <img
                                src="/static/img/about/about-us-2.jpg"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="ps-section__content">
                        <h3 className="ps-section__title">
                            Many years of experience and a high level of
                            consumer confidence
                        </h3>
                        <div className="ps-section__subtitle">
                            Developed for over 30 years on the market
                        </div>
                        <div className="ps-section__desc">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered
                            altevration in some form, by injected humour, or
                            randomised words which don’t look even slightly
                            believable.
                        </div>
                        <ul className="ps-section__list">
                            <li>Proin nec lectus dolor.</li>
                            <li>
                                Curabitur egestas molestie lorem sed pharetra.
                            </li>
                            <li>
                                Integer volutpat efficitur tellus vel tempus.
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="ps-section--block-grid">
                    <div className="ps-section__thumbnail">
                        <a className="ps-section__image" href="#">
                            <img
                                src="/static/img/about/about-us-3.jpg"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="ps-section__content">
                        <h3 className="ps-section__title">
                            Just a few seconds to measure your body temperature.
                            Up to 5 users!
                        </h3>
                        <div className="ps-section__subtitle">
                            The battery lasts up to 2 years.
                        </div>
                        <div className="ps-section__desc">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered
                            altevration in some form, by injected humour, or
                            randomised words which don’t look even slightly
                            believable.
                        </div>
                        <ul className="ps-section__list">
                            <li>Study history up to 30 days</li>
                            <li>Up to 5 users simultaneously</li>
                            <li>Has HEALTH certificate</li>
                        </ul>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default AboutProject;
