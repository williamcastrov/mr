import React, { useEffect, useState } from "react";
import ModuleHeaderPromotions from "~/components/shared/headers/modules/ModuleHeaderPromotions";
//import Menu from "~/components/elements/menu/Menu";
import header_supplies from "~/public/static/data/header_supplies.json";
import CountDown from "~/components/elements/CountDown";
import useGetProducts from "~/hooks/useGetProducts";
import ProductWithAvaiable from "~/components/elements/products/ProductWithAvaiable";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Modal, Button, ButtonGroup, Table } from "react-bootstrap";
import Link from "next/link";
import MenuDropdown from "~/components/elements/menu/MenuDropdown";
import MegaMenu from "~/components/elements/menu/MegaMenu";
import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";
import ModuleMenuHomepages from "~/components/elements/menu/modules/ModuleMenuHomepages";
import img1 from "../../../../public/imagescategorias/categorias1.jpg";
import img2 from "../../../../public/imagescategorias/categorias2.jpg";
import img3 from "../../../../public/imagescategorias/categorias3.jpg";
import img4 from "../../../../public/imagescategorias/categorias3.png";
import img5 from "../../../../public/imagescategorias/categorias5.jpg";
import img6 from "../../../../public/imagescategorias/categorias6.jpg";

const ModuleHeaderSupplies = (props) => {
    const router = useRouter();
    const [classCategorias, setClassCategorias] = useState(
        "header__categories-toggle sinborder"
    );
    const { product, getProductById } = useGetProducts();
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [classContent, setClassContent] = useState("ps-dropdown--content");
    const [itemCategoria, setItemCategoria] = useState("");

    const { setShowModal, showModal } = props;
    const [showModalSubCategorias, setShowModalSubCategorias] = useState(false);
    const [showModalEjemplos, setShowModalEjemplos] = useState(false);
    const [itemSubCategoria, setItemSubCategoria] = useState("");
    const [subcategoriasSeleccionada, setSubcategoriasSeleccionada] = useState(
        []
    );
    const [ejemplos, setEjemplos] = useState(false);
    const [textoEjemplos, setTextoEjemplos] = useState("");
    const [classUbicaEjemplos, setClassUbicaEjemplos] = useState(
        "divubicaejemplosuno"
    );

    useEffect(() => {
        getProductById(2);
    }, []);

    useEffect(() => {
        let categorias = JSON.parse(localStorage.getItem("categorias"));
        let subcategorias = JSON.parse(localStorage.getItem("subcategorias"));
        //console.log("CATEGORIAS : ", categorias);
        //console.log("SUB CATEGORIAS : ", subcategorias);

        if (categorias) {
            setCategorias(categorias);
            setSubcategorias(subcategorias);
        }
    }, []);

    //console.log("DATOS : ", header_supplies.header_supplies);

    const activar = (categoria) => {
        //console.log("CATEGORIA SELECCIONADA : ", categoria);
        setNombreCategoria(categoria.nombre);
        setItemCategoria(categoria.id);
        setTextoEjemplos(categoria.descripcion);

        let ordenar = subcategorias.sort();

        console.log("ARREGLO ORDENADO : ", ordenar)

        const newDet = [];
        const newDetImp = [];
        subcategorias &&
            subcategorias.forEach((row) => {
                if (
                    Number.parseInt(row.id_categorias) ===
                    Number.parseInt(categoria.id)
                ) {
                    //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        id_categorias: row.id_categorias,
                        nombre: row.nombre,
                        descripcion: row.descripcion,
                        url: row.url,
                        estado: row.estado,
                        palabraclave: row.palabrasclaves,
                    };
                    newDet.push(item);
                }
            });

        let longitud = newDet.length;
        for (var i = 0; i < longitud; i = i + 2) {
            let siguiente = i + 1;
            if (newDet[i].id_categorias > 2) {
                if (newDet[i].id != 34) {
                    let item = {
                        id1: newDet[i].id,
                        id2: newDet[siguiente].id,
                        nombre1: newDet[i].nombre,
                        nombre2: newDet[siguiente].nombre,
                        palabraclaveuna: newDet[i].palabraclave,
                        palabraclavedos: newDet[siguiente].palabraclave,
                    };
                    newDetImp.push(item);
                }
            } else {
                if (newDet[i].id != 34) {
                    let itemuno = {
                        id1: newDet[i].id,
                        nombre1: newDet[i].nombre,
                        palabraclaveuna: newDet[i].palabraclave,
                    };
                    newDetImp.push(itemuno);
                    let itemdos = {
                        id1: newDet[siguiente].id,
                        nombre1: newDet[siguiente].nombre,
                        palabraclaveuna: newDet[siguiente].palabraclave,
                    };
                    newDetImp.push(itemdos);
                }
            }
        }
        setSubcategoriasSeleccionada(newDetImp);
        //console.log("IMPRIMIR SUB CATEGORIAS : ", newDetImp)
        setShowModalSubCategorias(true);
    };

    const activarsubcategoria = (id) => {
        //console.log("ID SUBCATEGORIAS : ", id)
        setItemSubCategoria(id);
    };

    const abrirCerrarCategorias = () => {
        if (classContent == "ps-dropdown--content") {
            setClassContent("ps-dropdown__content"); // opacidadcategorias
        } else {
            setClassContent("ps-dropdown--content");
        }
    };

    const buscarProductos = (clave) => {
        let buscar = "/search?keyword=" + clave;
        //console.log("CLAVE : ", buscar);
        router.push(buscar);
        setShowModal(false);
        setShowModalSubCategorias(false);
    };

    const mostrarEjemplos = () => {
        setEjemplos(true);

        if (itemCategoria < 3) {
            setClassUbicaEjemplos("divubicaejemplosuno");
        } else if (itemCategoria > 2) {
            setClassUbicaEjemplos("divubicaejemplosdos");
        } else setClassUbicaEjemplos("divubicaejemplosuno");
    };

    const cerrarEjemplos = () => {
        setEjemplos(false);
    };

    const activarEjemplos = () => {
        setShowModalEjemplos(true);
    };

    const desactivarEjemplos = () => {
        setShowModalEjemplos(false);
    };

    const close = () => {
        setShowModal(false);
        setShowModalSubCategorias(false);
    };

    const onSelecciono = () => {
        setClassCategorias("header__categories-toggle subrayartexto sinborder");
    };

    const outSelecciono = () => {
        setClassCategorias("header__categories-toggle sinborder");
    };

    return (
        <div className="header__supplies ps-dropdown__fullscreen">
            <button className={classCategorias}>
                <span
                    onClick={abrirCerrarCategorias}
                    onMouseOver={onSelecciono}
                    onMouseOut={outSelecciono}>
                    Categorías <IoIosArrowForward />{" "}
                </span>
            </button>
            <div className={classContent}>
                <div className="visualizacioncategorias">
                    <div className="mega-menu__row  mtmenos31">
                        <div className="mega-menu__column col-12 col-sm-3 mt-1">
                            {categorias &&
                                categorias.map((item, id) => (
                                    <Row>
                                        {item.id == itemCategoria ? (
                                            <Col
                                                xl={6}
                                                lg={6}
                                                md={6}
                                                sm={6}
                                                className="resaltaitemmodalcategoria mt-3"
                                                onMouseOver={(e) =>
                                                    activar(item)
                                                }>
                                                {item.nombre}
                                            </Col>
                                        ) : (
                                            <Col
                                                xl={6}
                                                lg={6}
                                                md={6}
                                                sm={6}
                                                className="itemscategorias mt-3"
                                                onMouseOver={(e) =>
                                                    activar(item)
                                                }>
                                                {item.nombre}
                                            </Col>
                                        )}
                                        <Col xl={2} lg={2} md={2} sm={2}>
                                            {item.id == itemCategoria ? (
                                                <IoIosArrowForward className="tamañoflechacategorias mt-3" />
                                            ) : null}
                                        </Col>
                                    </Row>
                                ))}
                        </div>

                        <div className="mega-menu__column col-sm-6 col-md-10 mlmenos50 mt-2">
                            <div className="textoadvertenciaproductos">
                                <Row>
                                    <Col xl={3} lg={3} md={3} sm={3}>
                                        {nombreCategoria}
                                    </Col>
                                    <Col
                                        xl={2}
                                        lg={2}
                                        md={2}
                                        sm={2}
                                        className="ml-38">
                                        <div className="fondodivseleccionticategoria  mt-10">
                                            <InfoIcon
                                                className="iconoinfomaterialcategoria"
                                                onMouseOver={(e) =>
                                                    activarEjemplos()
                                                }
                                                onMouseOut={(e) =>
                                                    desactivarEjemplos()
                                                }
                                                style={{
                                                    fontSize: 26,
                                                }}></InfoIcon>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="linea"></div>

                            {subcategoriasSeleccionada &&
                                subcategoriasSeleccionada.map((item) => (
                                    <Row>
                                        <Col
                                            xl={6}
                                            lg={6}
                                            md={6}
                                            sm={6}
                                            className="itemssubcategorias"
                                            onMouseOver={(e) =>
                                                activarsubcategoria(item.id1)
                                            }>
                                            <Row>
                                                <Col
                                                    xl={8}
                                                    lg={8}
                                                    md={8}
                                                    sm={8}
                                                    onClick={(e) =>
                                                        buscarProductos(
                                                            item.palabraclaveuna
                                                        )
                                                    }
                                                    className="mt-2">
                                                    {item.nombre1}
                                                </Col>
                                                <Col
                                                    xl={1}
                                                    lg={1}
                                                    md={1}
                                                    sm={1}
                                                    onMouseOver={(e) =>
                                                        mostrarEjemplos()
                                                    }
                                                    onMouseOut={cerrarEjemplos}>
                                                    {item.id1 ==
                                                    itemSubCategoria ? (
                                                        <InfoIcon
                                                            style={{
                                                                fontSize: 20,
                                                            }}></InfoIcon>
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col
                                            xl={6}
                                            lg={6}
                                            md={6}
                                            sm={6}
                                            className="itemssubcategorias"
                                            onMouseOver={(e) =>
                                                activarsubcategoria(item.id2)
                                            }>
                                            <Row>
                                                <Col
                                                    xl={8}
                                                    lg={8}
                                                    md={8}
                                                    sm={8}
                                                    onClick={(e) =>
                                                        buscarProductos(
                                                            item.palabraclavedos
                                                        )
                                                    }
                                                    className="mt-2">
                                                    {item.nombre2}
                                                </Col>
                                                <Col
                                                    xl={1}
                                                    lg={1}
                                                    md={1}
                                                    sm={1}
                                                    onMouseOver={(e) =>
                                                        mostrarEjemplos()
                                                    }
                                                    onMouseOut={cerrarEjemplos}>
                                                    {item.id2 ==
                                                    itemSubCategoria ? (
                                                        <InfoIcon
                                                            style={{
                                                                fontSize: 20,
                                                            }}></InfoIcon>
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                ))}
                        </div>
                        {/*
                        <div className="mega-menu__column col-12 col-sm-4 col-md-3">
                            <div className="mega-menu__product">
                                <CountDown
                                    time="12 31 2021, 6:00 am"
                                    format="MM DD YYYY, h:mm a"
                                />
                                {product && (
                                    <ProductWithAvaiable product={product} />
                                )}
                            </div>
                        </div>
                        */}
                    </div>
                    {ejemplos ? (
                        <div className="divubicaejemplosuno">
                            <Row>
                                <Col xl={2} lg={2} md={2} sm={2}></Col>
                                <Col xl={2} lg={2} md={2} sm={2}>
                                    <img
                                        src={img1.src}
                                        alt=""
                                        width="120px"
                                        height="120px"
                                    />
                                </Col>
                                <Col xl={2} lg={2} md={2} sm={2}>
                                    <img
                                        src={img2.src}
                                        alt=""
                                        width="120px"
                                        height="120px"
                                    />
                                </Col>
                                <Col xl={2} lg={2} md={2} sm={2}>
                                    <img
                                        src={img5.src}
                                        alt=""
                                        width="120px"
                                        height="120px"
                                    />
                                </Col>
                                <Col xl={2} lg={2} md={2} sm={2}>
                                    <img
                                        src={img4.src}
                                        alt=""
                                        width="120px"
                                        height="120px"
                                    />
                                </Col>
                            </Row>
                        </div>
                    ) : null}
                </div>
                {showModalEjemplos ? (
                    <h2 className="ml-170 textocategorias">{textoEjemplos}</h2>
                ) : null}
            </div>
        </div>
    );
};

function Menu(props) {
    const { source, className } = props;
    // Views
    let menuView;
    console.log("SOURCE : ", source);
    if (source) {
        menuView = source.map((item) => {
            if (item.subMenu) {
                return <MenuDropdown source={item} key={item.text} />;
            } else if (item.megaContent) {
                return <MegaMenu source={item} key={item.text} />;
            } else if (item.external) {
                if (item.module === "homepages") {
                    console.log("ITEM SELECCIONADO  : ", item);
                    return (
                        <li
                            className="menu-item-has-children has-mega-menu"
                            key={item.module}>
                            <Link href={item.url}>
                                <a>{item.text}</a>
                            </Link>
                            <div className="mega-menu">
                                <ModuleMenuHomepages />
                            </div>
                        </li>
                    );
                }
            } else {
                return (
                    <li key={item.text}>
                        <Link href={item.url}>
                            <a>
                                {item.icon && <i className={item.icon}></i>}
                                {item.text}
                            </a>
                        </Link>
                    </li>
                );
            }
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    No menu item.
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
}

export default ModuleHeaderSupplies;
