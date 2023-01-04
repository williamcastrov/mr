import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import SelectedVehicle from "./selectedvehicle";

import { getTypesVehicles } from "../../../store/typesvehicles/action";
import TypesVehiclesRepository from "~/repositories/TypesVehiclesRepository";

import { getYearsVehicles } from "../../../store/yearsvehicles/action";
import YearsVehiclesRepository from "~/repositories/YearsVehiclesRepository";
import SearchInteractive from "../../search/searchinteractive.jsx";
import logo from "../../../public/imgcarrusel/sedan/nombrelogomr.png";

const SearchInteractiveSedan = (props) => {
    const router = useRouter();
    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();
    const [productoBuscar, setProductoBuscar] = useState("Chevrolet");

    // Definicion Latoneria
    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [
        ubicarProductoLatoneriaIzquierda,
        setUbicarProductoLatoneriaIzquierda,
    ] = useState(false);
    const [ubicarProductoLatoneriaCentro, setUbicarProductoLatoneriaCentro] =
        useState(false);
    const [ubicarProductoLatoneriaDerecha, setUbicarProductoLatoneriaDerecha] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    const [
        ubicarCategoriaSedanLatoneriaDerechaMetalica,
        setubicarCategoriaSedanLatoneriaDerechaMetalica,
    ] = useState(false);
    const [
        ubicarCategoriaSedanLatoneriaDerechaVidrio,
        setubicarCategoriaSedanLatoneriaDerechaVidrio,
    ] = useState(false);
    const [
        ubicarCategoriaSedanLatoneriaDerechaPlasticas,
        setubicarCategoriaSedanLatoneriaDerechaPlasticas,
    ] = useState(false);
    const [
        ubicarCategoriaSedanLatoneriaDerechaCaucho,
        setubicarCategoriaSedanLatoneriaDerechaCaucho,
    ] = useState(false);

    // Definicion Habitácuolo
    const [showModalHabitaculo, setShowModalhabitaculo] = useState(false);
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);

    // Definición Motor Eléctrico
    const [showModalMotorElectrico, setShowModalMotorElectrico] =
        useState(false);
    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    // Arreglo tipos de Marcas de Vehiculos
    const [annos, setAnnos] = useState([]);
    // Arreglo modelos de los Vehiculos segun Marca Seleccionda

    const mostrarComentariolatoneria = () => {
        setShowModalComentariosLatoneria(true);
    };

    const mostrarComentariohabitaculo = () => {
        setShowModalComentariosHabitaculo(true);
    };

    const mostrarComentariomotor = () => {
        setShowModalComentariosMotor(true);
    };

    const seleccionaUbicarProductoLatoneria = () => {
        //setUbicarProductoLatoneria(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoMotor(false);
        router.push("/searchinteractive/sedan/searchsedanlatoneria");
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        setShowModalhabitaculo(true);
        //setUbicarProductoHabitaculo(true);
        setUbicarProductoLatoneria(false);
        setUbicarProductoMotor(false);
        router.push("/searchinteractive/sedan/searchsedanhabitaculo");
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        setShowModalMotorElectrico(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoLatoneria(false);
        //setUbicarProductoMotor(true);
        router.push("/searchinteractive/sedan/searchsedanmotorelectrico");
    };

    // Lee de la base de datos los años de los Vehiculos
    useEffect(() => {
        async function yearsvehicles(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const YearsVehicles =
                await YearsVehiclesRepository.getYearsVehicles(0);
            //console.log("YEARS VEHICLES : ", YearsVehicles);
            setAnnos(YearsVehicles);

            // Coloca los datos en state arreglo de años de los vehiculos
            dispatch(getYearsVehicles(YearsVehicles));
            //location.reload();
        }
        yearsvehicles(0);
    }, [tipos]);

    // Lee de la base de datos los tipos de Vehiculos
    useEffect(() => {
        async function typesvehicles(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const TypesVehicles =
                await TypesVehiclesRepository.getTypesVehicles(0);
            //console.log("TYPES VEHICLES : ", TypesVehicles[0].header_supplies);
            setVehiculos(TypesVehicles[0].header_supplies);

            // Coloca los datos en state arreglo de categorias
            dispatch(getTypesVehicles(TypesVehicles));
        }
        typesvehicles(0);
    }, [tipos]);

    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner" id="searchmr">
                <Row>
                    <Col lg={6}>
                        <SelectedVehicle />
                       
                        <h3 className="mt-2 centrartextosedankatoneria">
                            Elige la ubicación de tu repuesto
                        </h3>
                        <Row>
                            <Col xs lg={11}>
                                <ButtonGroup>
                                    <div className="espaciosuperiorbordecarroceriasedan">
                                        <Row>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="botoncarroceriasedanlatoneriaeit"
                                                    onClick={
                                                        seleccionaUbicarProductoLatoneria
                                                    }>
                                                    Exterior
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedancdi"
                                                    onClick={
                                                        mostrarComentariolatoneria
                                                    }>
                                                    {!ubicarProductoLatoneria ? (
                                                        <i
                                                            class="fa fa-info d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    ) : (
                                                        <i
                                                            class="fa fa-check-square-o d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    )}
                                                </Button>
                                            </Col>

                                            <Col xs lg={2}>
                                                <Button
                                                    className="botoncarroceriasedanlatoneriaeit"
                                                    onClick={
                                                        seleccionaUbicarProductoHabitaculo
                                                    }>
                                                    Interior
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedancdi"
                                                    onClick={
                                                        mostrarComentariohabitaculo
                                                    }>
                                                    {!ubicarProductoHabitaculo ? (
                                                        <i
                                                            class="fa fa-info d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    ) : (
                                                        <i
                                                            class="fa fa-check-square-o d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    )}
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="botoncarroceriasedanlatoneriaeit"
                                                    onClick={
                                                        seleccionaUbicarProductoMotorElectrico
                                                    }>
                                                    Tren Motriz
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedancdi"
                                                    onClick={
                                                        mostrarComentariomotor
                                                    }>
                                                    {!ubicarProductoMotor ? (
                                                        <i
                                                            class="fa fa-info d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    ) : (
                                                        <i
                                                            class="fa fa-check-square-o d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    )}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        { // ESTABA En 40 Izquierda
                            <div className="mt-10 margenesvideo">
                                <div className="mlmenos60" > 
                                    <video
                                        autoPlay="false"
                                        width="780"
                                        height="430">
                                        <source
                                            src="/videos/videosedan2.mp4"
                                            type="video/mp4"></source>
                                    </video>
                                </div>
                                <div className="espaciologomr">
                                    <img src={logo.src} alt="First slide" />
                                </div>
                            </div>
                        }
                    </Col>
                    <Col lg={6}>
                        <div className="espacioiconosderechamotorelectrico">
                            <SearchInteractive
                                productoBuscar={productoBuscar}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

// controls CHABILITAR CONTROLES EN EL VIDEO
/*
 <div className="auth__box-logo">
                                <img src={sedangris.src}  />
                            </div>
                            */
export default SearchInteractiveSedan;
