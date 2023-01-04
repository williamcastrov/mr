import React, { useEffect, useState } from "react";
import { toggleDrawer } from "~/store/app/action";
import { useDispatch, connect, useSelector } from "react-redux";
import Link from "next/link";
import { Modal, Button, Row, Col, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";

//Firebase
import firebase from "../../../../utilities/firebase";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

import {
    caculateArrayQuantity,
    calculateCartQuantity,
} from "~/utilities/ecomerce-helpers";

const ModuleHeaderActions = ({ ecomerce, search = false }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [cartTotal, setCartTotal] = useState(0);
    const [wishlistTotal, setWishlistTotal] = useState(0);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    //console.log("DATOS USUARIO STATE : ", datosusuarios);

    function handleOpenDrawer(e) {
        e.preventDefault();
        dispatch(toggleDrawer(true));
    }

    const Salir = () => {
        //localStorage.clear();
        localStorage.removeItem('datoscarroceriasvehiculos');
        localStorage.removeItem('datosannosvehiculos');
        localStorage.removeItem('datosmarcasvehiculos');
        localStorage.removeItem('subcategorias');
        localStorage.removeItem('categorias');
        localStorage.removeItem('datostiposvehiculos');
        
        const auth = getAuth(firebase);
        signOut(auth).then(() => {
            // Sign-out successful.
            router.push("/");
            console.log("Sesión Cerrada")
        }).catch((error) => {
            // An error happened.
            console.log("Error Cerrando Sesión")
        });
    }

    useEffect(() => {
        if (ecomerce.cartItems) {
            setCartTotal(calculateCartQuantity(ecomerce.cartItems));
        }
        if (ecomerce.wishlistItems) {
            setWishlistTotal(caculateArrayQuantity(ecomerce.wishlistItems));
        }
    }, [ecomerce]);

    // view
    let searchBtnView;
    if (search) {
        searchBtnView = (
            <li>
                <a className="header__action" href="#">
                    <i className="icon-magnifier"></i>
                </a>
            </li>
        );
    }

    return (
        <ul className="header__actions">
            {searchBtnView}
            {
                datosusuarios.logged ?
                    (
                        <Dropdown className="dropdown-user-data" >
                            <Dropdown.Toggle className="btn-lg p-2 " variant="secondary" id="dropdown-basic">
                                {
                                    datosusuarios.tipoidentificacion === 6 ?
                                        (
                                            <>
                                                <i className="icon-user"></i>{" "} {datosusuarios.razonsocial}
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <i className="icon-user"></i>{" "} {datosusuarios.name}
                                            </>
                                        )
                                }
                            </Dropdown.Toggle>
                            <Dropdown.Menu  >
                                <Dropdown.Item className="dropdown-user" href="/my-account">Mis Datos</Dropdown.Item>
                                <Dropdown.Item className="dropdown-user" href="#/action-2">Mis Anuncios</Dropdown.Item>
                                <Dropdown.Item className="dropdown-user" onClick={Salir} >Cerrar Sesión</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                    :
                    (
                        <div className="headercrearcuenta">
                            <Row className="ps-footer__fax">
                                <Col lg={6}>
                                    <div className="espaciotextocrearcuenta">
                                        <a className="textocrearcuenta" href="/my-account">
                                            Crea tu cuenta
                                        </a>
                                    </div>

                                </Col>
                                <Col lg={3}>
                                    <div className="espaciotextocrearcuenta">
                                        <a className="textocrearcuenta" href="/loginaccount">
                                            Ingresa
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )
            }

            <li>
                <Link href="/shop/wishlist">
                    <a className="header__action">
                        <i className="fa fa-heart-o"></i>
                        <span className="header__action-badge">
                            {wishlistTotal ? wishlistTotal : 0}
                        </span>
                    </a>
                </Link>
            </li>
            <li>
                <a
                    className="header__action"
                    href="#"
                    id="cart-mini"
                    onClick={(e) => handleOpenDrawer(e)}>
                    <i className="icon-cart-empty"></i>
                    <span className="header__action-badge">
                        {cartTotal ? cartTotal : 0}
                    </span>
                </a>
            </li>
        </ul>
    );
};

export default connect((state) => state)(ModuleHeaderActions);
