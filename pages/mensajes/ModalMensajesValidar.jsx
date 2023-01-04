import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalMensajesValidarjsx(props) {
    const {
        shown,
        setContinuarRegistro,
        setAbandonarRegistro,
        titulo,
        mensaje,
        tipo,
    } = props;

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close(false);
            }}>
            <div
                className="modal-mensajes-login redondearventamensajes "
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <div className="iconoventanamensajes mtmenos14">
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Col>
                        <Col xl={9} lg={9} md={9} sm={9}>
                            <div className="ml-40 titulodetaildescription">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-40 sinborder colorbase"
                                data-dismiss="modal"
                                //onClick={() => close(false)}
                            >
                                {" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="mt-50 textoventanamensajes">
                    <h2>{mensaje}</h2>
                </div>
                <div className="ml-200 mt-60">
                    <Row>
                        <Col xl={7} lg={7} md={7} xs={7}>
                            <Button
                                variant="outline-light"
                                className="ps-btn baseinput itemsdropdowncustom"
                                onClick={() => setContinuarRegistro(true)}>
                                {" "}
                                Seguir editando
                            </Button>
                        </Col>
                        <Col xl={2} lg={2} md={2} xs={2}>
                            <Button
                                variant="outline-light"
                                className="ps-btn"
                                onClick={() => setAbandonarRegistro(true)}>
                                {" "}
                                Cerrar
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesValidarjsx;
