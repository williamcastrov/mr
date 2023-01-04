import React, { useState, useEffect, useRef } from "react";
import swal from "sweetalert";
import {
    Button,
    Row,
    Col,
    Modal,
    ButtonGroup,
    Card,
    Form,
    Tooltip,
    Overlay,
} from "react-bootstrap";
import Loading from "~/components/elements/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import shortid from "shortid";

function DatosVehiculos(props) {
    const {
        vehiculoUnoCrear,
        setVehiculoUnoCrear,
        vehiculoUnoEditar,
        setVehiculoUnoEditar,
        vehiculoUnoDuplicar,
        setVehiculoUnoDuplicar,
        vehiculoUnoSelecc,
        setVehiculoUnoSelecc,
    } = props;

    // Asignar nombre de las opciones seleccionadas en lo vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    const [annos, setAnnos] = useState([]);
    const [listMarcas, setListMarcas] = useState([]);
    const [listCarrocerias, setListCarrocerias] = useState([]);
    const [listModelos, setListModelos] = useState([]);
    const [listCilindrajes, setListCilindrajes] = useState([]);

    // Caracteristicas seleccionadas por vehiculo
    const [tipoVeh, setTipoVeh] = useState([]);
    const [marcaVeh, setMarcaVeh] = useState([]);
    const [annoVeh, setAnnoVeh] = useState([]);
    const [modeloVeh, setModeloVeh] = useState([]);
    const [cilindrajesVeh, setCilindrajesVeh] = useState([]);
    const [carroceriaVeh, setCarroceriaVeh] = useState([]);
    const [transmisionVeh, setTransmisionVeh] = useState([]);
    const [combustibleVeh, setCombustibleVeh] = useState([]);
    const [traccionVeh, setTraccionVeh] = useState([]);

    // Caracteristicas seleccionadas por vehiculo
    const [editarTipoVeh, setEditarTipoVeh] = useState([]);
    const [editarMarcaVeh, setEditarMarcaVeh] = useState([]);
    const [editarAnnoVeh, setEditarAnnoVeh] = useState([]);
    const [editarModeloVeh, setEditarModeloVeh] = useState([]);
    const [editarCilindrajesVeh, setEditarCilindrajesVeh] = useState([]);
    const [editarCarroceriaVeh, setEditarCarroceriaVeh] = useState([]);
    const [editarTransmisionVeh, setEditarTransmisionVeh] = useState([]);
    const [editarCombustibleVeh, setEditarCombustibleVeh] = useState([]);
    const [editarTraccionVeh, setEditarTraccionVeh] = useState([]);

    // Caracteristicas seleccionadas por vehiculo
    const [nombreTipoVeh, setNombreTipoVeh] = useState("");
    const [nombreMarcaVeh, setNombreMarcaVeh] = useState("");
    const [nombreAnnoVeh, setNombreAnnoVeh] = useState("");
    const [nombreModeloVeh, setNombreModeloVeh] = useState("");
    const [nombreCilindrajesVeh, setNombreCilindrajesVeh] = useState("");
    const [nombreCarroceriaVeh, setNombreCarroceriaVeh] = useState("");
    const [nombreTransmisionVeh, setNombreTransmisionVeh] = useState("");
    const [nombreCombustibleVeh, setNombreCombustibleVeh] = useState("");
    const [nombreTraccionVeh, setNombreTraccionVeh] = useState("");

    // Inicializamos el arrego de Tipos de Vehiculos
    const [marcas, setMarcas] = useState([]);
    const [carrocerias, setCarrocerias] = useState([]);
    const [cilindrajes, setCilindrajes] = useState([]);
    const [modelos, setModels] = useState([]);
    const [nombreMarca, setNombreMarca] = useState("");

    const [showEdit, setShowEdit] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const targetedit = useRef(null);
    const targetcopy = useRef(null);
    const [cambia, setCambia] = useState(false);

    // Lee modelos de los Vehiculos del state
    const datoscrearproductosmodelos = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );

    //console.log("MODELOS CREAR PRODUCTOS : ", datoscrearproductosmodelos);

    // Lee modelos de los Vehiculos del state
    const datoscrearproductoscilindrajes = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales.vgl_cilindrajesvehiculos
    );

    useEffect(() => {
        setVehiculos(JSON.parse(localStorage.getItem("datostiposvehiculos")));
        setListMarcas(JSON.parse(localStorage.getItem("datosmarcasvehiculos")));
        setListCarrocerias(
            JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
        );
        setListModelos(datoscrearproductosmodelos);
        setListCilindrajes(datoscrearproductoscilindrajes);
        setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
        //setLoading(true);
        //setCambia(true);
    }, []);

    const transmision = [
        { label: "Automática", value: 1 },
        { label: "Manual", value: 2 },
    ];

    const combustible = [
        { label: "Gasolina", value: 1 },
        { label: "Diesel", value: 2 },
        { label: "Gasolina – Gas", value: 3 },
        { label: "Gasolina – Eléctrico", value: 4 },
    ];

    const tipotraccion = [
        { label: "Tracción Delantera", value: 1 },
        { label: "Tracción Trasera", value: 2 },
        { label: "Tracción 4x4", value: 3 },
        { label: "No Aplica", value: 4 },
    ];

    const turbocompresor = [
        { label: "Turbo Sencillo", value: 1 },
        { label: "Turbo Doble", value: 2 },
        { label: "Turbo de Doble Entrada", value: 3 },
        { label: "Turbo de Geometría Variable", value: 4 },
        { label: "Turbo Variable de Doble Entrada", value: 5 },
        { label: "Turbo Eléctrico", value: 6 },
        { label: "No Aplica", value: 7 },
    ];

    const handleChange = (selectedOptions) => {
        //console.log("SELECTED OPTION : ",selectedOptions)
        const newTipo = [];
        newTipo.push(selectedOptions);
        //console.log("NEW TIPO : ",newTipo);
        setTipoVeh(newTipo);

        const newDet = [];
        listCarrocerias.forEach((row) => {
            if (
                Number.parseInt(row.tipovehiculo) ===
                Number.parseInt(selectedOptions)
            ) {
                //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
                let item = {
                    id: row.id,
                    carroceria: row.carroceria,
                    tipoVeh: row.tipovehiculo,
                    estado: row.estado,
                    value: row.id,
                    label: row.carroceria,
                };
                newDet.push(item);
            }
        });
        setCarrocerias(newDet);
    };

    const handleChangeCarroceria = (selectedOptions) => {
        //console.log("SELECTED CARROCERIA : ",selectedOptions)

        setCarroceriaVeh(selectedOptions);

        listCarrocerias.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreCarroceriaVeh(row.carroceria);
                //console.log("NOMBRE CARROCERIA SELECCIONADA : ", row.carroceria);
            }
        });

        const newDet = [];
        listMarcas &&
            listMarcas.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(tipoVeh) &&
                    Number.parseInt(row.carroceria) ===
                        Number.parseInt(selectedOptions)
                ) {
                    //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        text: row.text,
                        tipoVeh: row.tipovehiculo,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        url: row.url,
                    };
                    newDet.push(item);
                }
            });
        setMarcas(newDet);
    };

    const handleChangeBrand = (selectedOptions) => {
        //console.log("SELECTED MARCA : ",selectedOptions)

        //console.log("NEW MARCA : ",newMarca);
        setMarcaVeh(selectedOptions);

        listMarcas.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreMarcaVeh(row.text);
                //console.log("NOMBRE CARROCERIA SELECCIONADA : ", row.carroceria);
            }
        });

        const newDetMod = [];
        listModelos &&
            listModelos.forEach((row) => {
                if (
                    Number.parseInt(row.marca) ===
                        Number.parseInt(selectedOptions) &&
                    Number.parseInt(row.carroceria) ===
                        Number.parseInt(carroceriaVeh)
                ) {
                    //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        modelo: row.modelo,
                        tipoVeh: row.tipovehiculo,
                        marca: row.marca,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        value: row.id,
                        label: row.modelo,
                    };
                    newDetMod.push(item);
                }
            });
        setModels(newDetMod);
        /*
        localStorage.setItem(
            "datosmodelosvehiculos",
            JSON.stringify(newDetMod)
        );
        */
    };

    const handleChangeAnno = (selectedOptions) => {
        //console.log("AÑO VEHICULO : ", selectedOptions);
        setAnnoVeh(selectedOptions);

        annos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreAnnoVeh(row.anovehiculo);
                //console.log("NOMBRE CARROCERIA SELECCIONADA : ", row.carroceria);
            }
        });
    };

    const handleChangeModels = (selectedOptions) => {
        //console.log("MODELO SELECCIONADO : ", selectedOptions);
        const newModelo = [];
        newModelo.push(selectedOptions);
        //console.log("NEW MODELO : ", newModelo);
        setModeloVeh(newModelo);

        listModelos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreModeloVeh(row.modelo);
                //console.log("NOMBRE CARROCERIA SELECCIONADA : ", row.carroceria);
            }
        });
        /*
        if (
            !localStorage.getItem("datosmodelosvehiculosdos") ||
            localStorage.getItem("datosmodelosvehiculosdos") === undefined
        ) {
            if (modelos.length > 0) {
                localStorage.setItem(
                    "datosmodelosvehiculosdos",
                    JSON.stringify(modelos)
                );
            }
        }
*/
        if (selectedOptions > 0) {
            //console.log("VALOR SelecDO : ", selectedOptions)
            let modelo = selectedOptions;

            const newDet = [];
            listCilindrajes &&
                listCilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) === Number.parseInt(modelo)
                    ) {
                        //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipoVeh: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                            marca: row.marca,
                            modelo: row.modelo,
                        };
                        newDet.push(item);
                    }
                });

            //console.log("CILINDRAJE : ", newDet);
            setCilindrajes(newDet);
        }
    };

    const handleChangeVersionMotor = (selectedOptions) => {
        //console.log("VERSION MOTOR SelecDO : ", selectedOptions);
        setCilindrajesVeh(selectedOptions);

        listCilindrajes.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreCilindrajesVeh(row.cilindraje);
                //console.log("NOMBRE CARROCERIA SELECCIONADA : ", row.carroceria);
            }
        });
    };

    const handleChangeTransmision = (selectedOptions) => {
        setTransmisionVeh(selectedOptions);

        if (selectedOptions == 1) {
            setNombreTransmisionVeh("Automática");
        } else if (selectedOptions == 2) {
            setNombreTransmisionVeh("Manual");
        } else {
            setNombreTransmisionVeh("NA");
        }
    };

    const handleChangeCombustible = (selectedOptions) => {
        setCombustibleVeh(selectedOptions);

        if (selectedOptions == 1) {
            setNombreCombustibleVeh("Gasolina");
        } else if (selectedOptions == 2) {
            setNombreCombustibleVeh("Diesel");
        } else if (selectedOptions == 3) {
            setNombreCombustibleVeh("Gasolina - Gas");
        } else if (selectedOptions == 4) {
            setNombreCombustibleVeh("Gasolina – Eléctrico");
        } else {
            setNombreCombustibleVeh("NA");
        }
    };

    const handleChangeTraccion = (selectedOptions) => {
        setTraccionVeh(selectedOptions);

        if (selectedOptions == 1) {
            setNombreTraccionVeh("Tracción Delantera");
        } else if (selectedOptions == 2) {
            setNombreTraccionVeh("Tracción Trasera");
        } else if (selectedOptions == 3) {
            setNombreTraccionVeh("Tracción 4x4");
        } else if (selectedOptions == 4) {
            setNombreTraccionVeh("NA");
        }

        setVehiculoUnoCrear(false);
        setVehiculoUnoSelecc(true);
    };

    const editarDatosVehiculos = () => {
        setVehiculoUnoEditar(true);
        setVehiculoUnoSelecc(false);
        setEditarTipoVeh(tipoVeh);
        setEditarMarcaVeh(marcaVeh);
        setEditarAnnoVeh(annoVeh);
        setEditarModeloVeh(modeloVeh);
        setEditarCilindrajesVeh(cilindrajesVeh);
        setEditarCarroceriaVeh(carroceriaVeh);
        setEditarTransmisionVeh(transmisionVeh);
        setEditarCombustibleVeh(combustibleVeh);
        setEditarTraccionVeh(traccionVeh);
    };

    const duplicarDatosVehiculos = () => {
        //setDuplicarVehiculo(!duplicarVehiculo);
        //setLoading(true);
        //setNumeroVehiculo(numeroVehiculo);
        //setCambia(true);
        //console.log("NUMERO VEHICULO : ", numeroVehiculo);
    };

    return (
        <div className="mt-4">
            {vehiculoUnoCrear ? (
                <Row>
                    <div>
                        {" "}
                        <Col>
                            <div>
                                <div>
                                    <select
                                        //disabled="disabled"
                                        className="redonderbordescrearproducto custom-selecttipovehiculo"
                                        onChange={(e) =>
                                            handleChange(e.target.value)
                                        }>
                                        <option selected>
                                            Tipo de Vehículo
                                        </option>
                                        {vehiculos &&
                                            vehiculos.map((itemselecttipo) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselecttipo.id
                                                        }>
                                                        {itemselecttipo.icon +
                                                            " " +
                                                            itemselecttipo.text}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <Row>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeCarroceria(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Carroceria
                                                </option>
                                                {carrocerias &&
                                                    carrocerias.map(
                                                        (
                                                            itemselectcarroceria
                                                        ) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectcarroceria.value
                                                                    }>
                                                                    {
                                                                        itemselectcarroceria.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1 mlmenos17">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeBrand(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>Marca</option>
                                                {marcas &&
                                                    marcas.map(
                                                        (itemselectmarcas) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectmarcas.id
                                                                    }>
                                                                    {
                                                                        itemselectmarcas.text
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeAnno(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>Año</option>
                                                {annos &&
                                                    annos.map(
                                                        (itemselectanno) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectanno.value
                                                                    }>
                                                                    {
                                                                        itemselectanno.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1 mlmenos17">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeModels(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>Modelo</option>
                                                {modelos &&
                                                    modelos.map(
                                                        (itemselectmodelo) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectmodelo.value
                                                                    }>
                                                                    {
                                                                        itemselectmodelo.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeVersionMotor(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Cilindraje
                                                </option>
                                                {cilindrajes &&
                                                    cilindrajes.map(
                                                        (itemcilindraje) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemcilindraje.value
                                                                    }>
                                                                    {
                                                                        itemcilindraje.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1 mlmenos17">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeTransmision(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Transmisión
                                                </option>
                                                {transmision &&
                                                    transmision.map(
                                                        (itemselect) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselect.value
                                                                    }>
                                                                    {
                                                                        itemselect.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem  redonderborinferiorizquierdo"
                                                onChange={(e) =>
                                                    handleChangeCombustible(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Combustible
                                                </option>
                                                {combustible &&
                                                    combustible.map(
                                                        (itemselect) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselect.value
                                                                    }>
                                                                    {
                                                                        itemselect.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1  mlmenos17">
                                            <select
                                                className="custom-selectcreateproductoitem redonderborinferiorderecho"
                                                name="tipotraccion"
                                                onChange={(e) =>
                                                    handleChangeTraccion(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Tracción
                                                </option>
                                                {tipotraccion &&
                                                    tipotraccion.map(
                                                        (itemselect) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselect.value
                                                                    }>
                                                                    {
                                                                        itemselect.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </div>
                </Row>
            ) : vehiculoUnoSelecc ? (
                <div>
                    <Row>
                        <Col xl={10} lg={10} md={10} xs={10}>
                            <div className="ps-form__input mostrarvehiculoseleccionado ">
                                <div className="mtmenos10 textomodalinfoproductos">
                                    {nombreCarroceriaVeh}&nbsp;
                                    {nombreMarcaVeh} &nbsp;
                                    {nombreAnnoVeh} &nbsp;
                                    {nombreModeloVeh} &nbsp;
                                    {nombreCilindrajesVeh} &nbsp;
                                    {nombreTransmisionVeh} &nbsp;
                                    {nombreCombustibleVeh} &nbsp;
                                    {nombreTraccionVeh}
                                </div>
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input ml-70 tamañoiconoadvertencia">
                                <i
                                    onClick={() => editarDatosVehiculos()}
                                    class="ml-1 mt-1 fa fa-edit d-flex justify-content-center"
                                    aria-hidden="true"
                                    ref={targetedit}
                                    onMouseOver={() => setShowEdit(true)}
                                    onMouseOut={() => setShowEdit(false)}></i>
                            </div>

                            <Overlay
                                className=""
                                target={targetedit.current}
                                show={showEdit}
                                placement="top">
                                {(props) => (
                                    <Tooltip
                                        className="ubicartooltipproducto"
                                        id="overlay-example"
                                        {...props}>
                                        <h3 className="tamañotextotooltipproducto">
                                            {" "}
                                            Editar{" "}
                                        </h3>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input ml-70 tamañoiconoadvertencia">
                                <i
                                    onClick={() => duplicarDatosVehiculos()}
                                    class="mt-1 fa fa-copy d-flex justify-content-center"
                                    aria-hidden="true"
                                    ref={targetcopy}
                                    onMouseOver={() => setShowCopy(true)}
                                    onMouseOut={() => setShowCopy(false)}></i>
                            </div>
                            <Overlay
                                target={targetcopy.current}
                                show={showCopy}
                                placement="top">
                                {(props) => (
                                    <Tooltip
                                        className="ubicartooltipproducto"
                                        id="overlay-example"
                                        {...props}>
                                        <h3 className="tamañotextotooltipproducto">
                                            {" "}
                                            Duplicar{" "}
                                        </h3>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                    </Row>
                </div>
            ) : vehiculoUnoEditar ? (
                <Row>
                    <div>
                        {" "}
                        <Col>
                            <div>
                                <div>
                                    <select defaultValue={editarTipoVeh}
                                        //disabled="disabled"
                                        className="redonderbordescrearproducto custom-selectcreateproducto"
                                        onChange={(e) =>
                                            handleChange(e.target.value)
                                        }>
                                        <option selected>
                                            Tipo de Vehículo
                                        </option>
                                        {vehiculos &&
                                            vehiculos.map((itemselecttipo) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselecttipo.id
                                                        }>
                                                        {itemselecttipo.icon +
                                                            " " +
                                                            itemselecttipo.text}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <Row>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1">
                                            <select  defaultValue={editarCarroceriaVeh}
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeCarroceria(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Carroceria
                                                </option>
                                                {carrocerias &&
                                                    carrocerias.map(
                                                        (
                                                            itemselectcarroceria
                                                        ) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectcarroceria.value
                                                                    }>
                                                                    {
                                                                        itemselectcarroceria.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1 mlmenos17">
                                            <select defaultValue={editarMarcaVeh}
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeBrand(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>Marca</option>
                                                {marcas &&
                                                    marcas.map(
                                                        (itemselectmarcas) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectmarcas.id
                                                                    }>
                                                                    {
                                                                        itemselectmarcas.text
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1">
                                            <select defaultValue={editarAnnoVeh}
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeAnno(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>Año</option>
                                                {annos &&
                                                    annos.map(
                                                        (itemselectanno) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectanno.value
                                                                    }>
                                                                    {
                                                                        itemselectanno.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1 mlmenos17">
                                            <select defaultValue={editarModeloVeh}
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeModels(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>Modelo</option>
                                                {modelos &&
                                                    modelos.map(
                                                        (itemselectmodelo) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectmodelo.value
                                                                    }>
                                                                    {
                                                                        itemselectmodelo.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1">
                                            <select defaultValue={editarCilindrajesVeh}
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeVersionMotor(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Cilindraje
                                                </option>
                                                {cilindrajes &&
                                                    cilindrajes.map(
                                                        (itemcilindraje) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemcilindraje.value
                                                                    }>
                                                                    {
                                                                        itemcilindraje.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1 mlmenos17">
                                            <select defaultValue={editarTransmisionVeh}
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem"
                                                onChange={(e) =>
                                                    handleChangeTransmision(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Transmisión
                                                </option>
                                                {transmision &&
                                                    transmision.map(
                                                        (itemselect) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselect.value
                                                                    }>
                                                                    {
                                                                        itemselect.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1">
                                            <select  defaultValue={editarCombustibleVeh}
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem  redonderborinferiorizquierdo"
                                                onChange={(e) =>
                                                    handleChangeCombustible(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Combustible
                                                </option>
                                                {combustible &&
                                                    combustible.map(
                                                        (itemselect) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselect.value
                                                                    }>
                                                                    {
                                                                        itemselect.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1  mlmenos17">
                                            <select defaultValue={editarTraccionVeh}
                                                className="custom-selectcreateproductoitem redonderborinferiorderecho"
                                                name="tipotraccion"
                                                onChange={(e) =>
                                                    handleChangeTraccion(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Tracción
                                                </option>
                                                {tipotraccion &&
                                                    tipotraccion.map(
                                                        (itemselect) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselect.value
                                                                    }>
                                                                    {
                                                                        itemselect.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </div>
                </Row>
            ) : null}
        </div>
    );
}

export default DatosVehiculos;
