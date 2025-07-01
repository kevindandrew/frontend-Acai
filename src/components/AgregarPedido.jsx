import React, { useEffect, useRef, useState } from "react";
import {
  crearCliente,
  crearPedido,
  listaClientes,
  listaInventarioProductosEstablecidos,
  listaInventariosMateriasPrimas,
  listaPersonal,
} from "../axios/pedidos/pedidos";
import { useForm } from "react-hook-form";
import { useModalAlerta } from "../hooks/useModalAlerta";
import ModalAlerta from "./ModalAlerta";
import { useFieldArray } from "react-hook-form";
import DetallePedido from "./DetallePedido";

export default function AgregarPedido({
  setModalNuevoPedido,
  sucursales,
  sucursalSeleccionada,
  onPedidoCreado,
}) {
  const { register, handleSubmit, control, watch, setValue, getValues, reset } =
    useForm();
  const { alerta, mostrarAlerta } = useModalAlerta();
  const [dataPersonal, setDataPersonal] = useState([]);
  const [dataClientes, setDataClientes] = useState([]);
  const [dataProductosEstablecidos, setDataProductosEstablecidos] = useState(
    []
  );
  const [dataMateriasPrimas, setDataMateriasPrimas] = useState([]);
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [apellidoInput, setApellidoInput] = useState("");
  const sugerenciasRef = useRef(null);

  useEffect(() => {
    if (sucursalSeleccionada) {
      reset({
        id_sucursal: sucursalSeleccionada,
      });
    }
  }, [sucursalSeleccionada, reset]);

  useEffect(() => {
    if (sucursalSeleccionada) {
      reset({
        id_sucursal: sucursalSeleccionada,
      });

      listaInventarioProductosEstablecidos(sucursalSeleccionada)
        .then(setDataProductosEstablecidos)
        .catch(console.error);

      listaInventariosMateriasPrimas(sucursalSeleccionada)
        .then(setDataMateriasPrimas)
        .catch(console.error);
    }
  }, [sucursalSeleccionada, reset]);
  useEffect(() => {
    listaPersonal().then(setDataPersonal).catch(console.error);
    listaClientes().then(setDataClientes).catch(console.error);
  }, []);

  useEffect(() => {
    function manejarClickFuera(event) {
      if (
        sugerenciasRef.current &&
        !sugerenciasRef.current.contains(event.target)
      ) {
        setMostrarSugerencias(false);
      }
    }

    document.addEventListener("mousedown", manejarClickFuera);
    return () => {
      document.removeEventListener("mousedown", manejarClickFuera);
    };
  }, []);

  const clientesFiltrados = dataClientes.filter((cliente) =>
    cliente.ci_nit.toLowerCase().includes(busquedaCliente.toLowerCase())
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "detalles",
  });

  async function crearClienteNuevo(ci_nit, apellido) {
    try {
      const nuevoCliente = await crearCliente({
        ci_nit: String(ci_nit),
        apellido: String(apellido),
      });
      if (nuevoCliente?.id_cliente) {
        mostrarAlerta("exito", "Cliente Creado con Éxito");
        return nuevoCliente.id_cliente;
      } else {
        throw new Error("Respuesta inesperada al crear cliente");
      }
    } catch (error) {
      console.error("Error creando cliente:", error);
      mostrarAlerta("error", "Error creando cliente");
      return null;
    }
  }

  async function handleCrear(formData) {
    try {
      let idClienteFinal = clienteSeleccionado?.id_cliente || null;
      const ci_nit = busquedaCliente.trim();
      const apellido = apellidoInput.trim();

      if (!idClienteFinal && ci_nit && apellido) {
        idClienteFinal = await crearClienteNuevo(ci_nit, apellido);
        if (!idClienteFinal) return;
      }

      if (!idClienteFinal && !ci_nit && !apellido) {
        idClienteFinal = null;
      }

      if (!idClienteFinal && !!ci_nit !== !!apellido) {
        mostrarAlerta(
          "error",
          "Debe proporcionar CI/NIT y apellido para registrar un cliente."
        );
        return;
      }

      const requestData = {
        ...formData,
        id_cliente: idClienteFinal,
      };

      requestData.detalles = requestData.detalles.map((detalle) => {
        const limpio = { ...detalle };
        const tipo = limpio.tipo_producto;

        limpio.tipo_producto = tipo;
        limpio.cantidad = Number(limpio.cantidad);

        if (tipo === "Establecido") {
          limpio.id_producto_establecido = Number(
            limpio.id_producto_establecido
          );
          delete limpio.producto_personalizado;
        } else if (tipo === "Personalizado") {
          delete limpio.id_producto_establecido;
          limpio.producto_personalizado.margen = Number(
            limpio.producto_personalizado.margen
          );
          limpio.producto_personalizado.detalles =
            limpio.producto_personalizado.detalles.map((m) => ({
              ...m,
              id_materia_prima: Number(m.id_materia_prima),
              cantidad: Number(m.cantidad),
            }));
        }

        return limpio;
      });

      const status = await crearPedido(requestData);
      if (status === 201) {
        mostrarAlerta("exito", "Pedido Creado con Éxito");
        setTimeout(() => {
          setModalNuevoPedido(false);
          onPedidoCreado();
        }, 2200);
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 400) {
        mostrarAlerta("error", "Stock insuficiente para el producto");
      } else {
        console.error("Error al crear pedido:", error);
        mostrarAlerta("error", "Error al Crear Pedido");
      }
    }
  }
  return (
    <>
      <div className="w-100 md:w-170 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between bg-[#3bb48b] rounded-t-lg text-xl text-white font-bold p-2">
          <h2>Crear Pedido</h2>
          <button
            className="w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
            onClick={() => setModalNuevoPedido(false)}
          >
            X
          </button>
        </div>

        <form
          className="max-h-[70vh] overflow-y-auto p-4 space-y-4"
          onSubmit={handleSubmit(handleCrear)}
        >
          <label className="block text-sm font-medium mb-2">
            Nombre Sucursal:
          </label>
          <input
            type="text"
            value={
              sucursalSeleccionada
                ? sucursales.find((s) => s.id_sucursal === sucursalSeleccionada)
                    ?.nombre
                : "todas las sucursales"
            }
            disabled
            className="border border-gray-300 p-2 w-full rounded bg-gray-100 text-gray-600"
          />

          <input
            type="hidden"
            value={sucursalSeleccionada}
            {...register("id_sucursal")}
          />

          <label className="block text-sm font-medium mb-2">
            Nombre Personal:
          </label>
          <select
            {...register("id_personal", { valueAsNumber: true })}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
          >
            <option value="">Seleccione un personal</option>
            {dataPersonal.map((personal) => {
              return (
                <option key={personal.id_personal} value={personal.id_personal}>
                  {personal.nombre}
                </option>
              );
            })}
          </select>

          <label className="block text-sm font-medium mb-2">CI o NIT:</label>
          <div className="space-y-3 space-x-3 md:flex justify-between relative">
            <div className="w-full relative" ref={sugerenciasRef}>
              <input
                type="text"
                value={clienteSeleccionado?.ci_nit || busquedaCliente}
                onChange={(e) => {
                  setBusquedaCliente(e.target.value);
                  setClienteSeleccionado(null);
                  setMostrarSugerencias(true);
                }}
                className="h-10 border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
                placeholder="Escriba el CI o NIT del Cliente"
              />

              {busquedaCliente &&
                mostrarSugerencias &&
                clientesFiltrados.length > 0 && (
                  <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow-md max-h-40 overflow-auto">
                    {clientesFiltrados.map((cliente) => (
                      <li
                        key={cliente.id_cliente}
                        className="p-2 hover:bg-purple-100 cursor-pointer"
                        onClick={() => {
                          setClienteSeleccionado(cliente);
                          setBusquedaCliente(cliente.ci_nit);
                          setApellidoInput(cliente.apellido || "");
                          setMostrarSugerencias(false);
                        }}
                      >
                        {cliente.ci_nit}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            <input
              type="text"
              value={clienteSeleccionado?.apellido || apellidoInput}
              onChange={(e) => setApellidoInput(e.target.value)}
              disabled={!!clienteSeleccionado}
              className="h-10 border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
              placeholder="Nombre del Cliente"
            />

            <input
              type="hidden"
              value={clienteSeleccionado?.id_cliente || ""}
              {...register("id_cliente")}
            />
          </div>

          {!clienteSeleccionado &&
            busquedaCliente.trim() &&
            apellidoInput.trim() && (
              <button
                type="button"
                onClick={async () => {
                  const nuevoId = await crearClienteNuevo(
                    busquedaCliente,
                    apellidoInput
                  );
                  if (nuevoId) {
                    const clienteCreado = {
                      id_cliente: nuevoId,
                      ci_nit: busquedaCliente,
                      apellido: apellidoInput,
                    };
                    setClienteSeleccionado(clienteCreado);
                    setDataClientes([...dataClientes, clienteCreado]);
                    mostrarAlerta("exito", "Cliente creado y asignado");
                  }
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
              >
                Crear Cliente
              </button>
            )}

          <label className="block text-sm font-medium mb-2">
            Metodo de Pago:
          </label>
          <select
            {...register("metodo_pago")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta de crédito</option>
            <option value="Transferencia">Transferencia Bancaria:</option>
          </select>

          <label className="block text-sm font-medium mb-2"></label>
          {/* Sección de detalles del pedido */}
          <DetallePedido
            fields={fields}
            append={append}
            remove={remove}
            register={register}
            control={control}
            getValues={getValues}
            setValue={setValue}
            dataProductosEstablecidos={dataProductosEstablecidos}
            dataMateriasPrimas={dataMateriasPrimas}
          />

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
            >
              Crear Pedido
            </button>
          </div>
        </form>
      </div>

      <ModalAlerta
        show={alerta.show}
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
      />
    </>
  );
}
