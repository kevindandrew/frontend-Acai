import React from "react";
import { useWatch } from "react-hook-form";

export default function DetallePedido({
  fields,
  append,
  remove,
  register,
  control,
  getValues,
  setValue,
  dataProductosEstablecidos,
  dataMateriasPrimas,
}) {
  const tiposProductos = useWatch({ control, name: "detalles" }) || [];
  return (
    <>
      {fields.map((item, index) => {
        const tipo = tiposProductos[index]?.tipo_producto;

        return (
          <div
            key={item.id || index}
            className="border p-3 rounded mb-4 bg-fuchsia-50"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-purple-700">
                Producto: {index + 1}
              </h3>
              <button
                type="button"
                className="text-red-500 text-sm font-semibold cursor-pointer hover:scale-115"
                onClick={() => remove(index)}
              >
                Quitar
              </button>
            </div>

            <label className="block mt-2 text-sm font-medium">
              Tipo de Producto
            </label>
            <select
              {...register(`detalles.${index}.tipo_producto`)}
              className="border border-gray-500 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
              required
            >
              <option value="">Seleccione tipo</option>
              <option value="Establecido">Establecido</option>
              <option value="Personalizado">Personalizado</option>
            </select>

            {tipo === "Establecido" && (
              <>
                <label className="block mt-2 text-sm font-medium">
                  Producto Establecido
                </label>
                <select
                  {...register(`detalles.${index}.id_producto_establecido`, {
                    valueAsNumber: true,
                  })}
                  className="border border-gray-500 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
                  required
                >
                  <option value="">Seleccione un producto</option>
                  {dataProductosEstablecidos.map((producto) => (
                    <option
                      key={producto.id_producto_establecido}
                      value={producto.id_producto_establecido}
                      disabled={producto.cantidad_disponible <= 0}
                    >
                      {producto.nombre}
                      {producto.cantidad_disponible <= 0 ? " (Sin stock)" : ""}
                    </option>
                  ))}
                </select>
                <label className="block mt-2 text-sm font-medium">
                  Cantidad
                </label>
                <input
                  type="number"
                  {...register(`detalles.${index}.cantidad`)}
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
                />
              </>
            )}

            {tipo === "Personalizado" && (
              <div className="mt-2 p-2 bg-[#ffe7eebe] rounded">
                <label className="block text-sm font-medium">
                  Nombre del Producto Personalizado
                </label>
                <input
                  type="text"
                  {...register(
                    `detalles.${index}.producto_personalizado.nombre_personalizado`
                  )}
                  className="border border-gray-500 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
                  required
                />

                <label className="block mt-2 text-sm font-medium">
                  Margen de Ganancia (Ej: 0.3)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min={0.01}
                  {...register(
                    `detalles.${index}.producto_personalizado.margen`
                  )}
                  className="border border-gray-500 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
                  required
                />

                <label className="block mt-2 text-sm font-medium">
                  Materias Primas
                </label>
                <div className="space-y-2">
                  {dataMateriasPrimas.map((materia, mi) => (
                    <div
                      key={mi}
                      className="flex gap-2 items-center border-b border-gray-400 pb-2 mb-2"
                    >
                      <input
                        type="checkbox"
                        disabled={materia.cantidad_stock <= 0}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const path = `detalles.${index}.producto_personalizado.detalles`;
                          const current = getValues(path) || [];

                          if (checked) {
                            setValue(path, [
                              ...current,
                              {
                                id_materia_prima: materia.id_materia_prima,
                                cantidad: 0,
                              },
                            ]);
                          } else {
                            setValue(
                              path,
                              current.filter(
                                (m) =>
                                  m.id_materia_prima !==
                                  materia.id_materia_prima
                              )
                            );
                          }
                        }}
                      />
                      <span className="w-40 md:w-80">
                        {materia.nombre}{" "}
                        {materia.cantidad_stock <= 0 ? "(Sin stock)" : ""}
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Cantidad"
                        className="border border-gray-500 p-2 w-50 rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
                        onChange={(e) => {
                          const cantidad = parseFloat(e.target.value);
                          const path = `detalles.${index}.producto_personalizado.detalles`;
                          const current = getValues(path) || [];
                          const updated = current.map((m) =>
                            m.id_materia_prima === materia.id_materia_prima
                              ? { ...m, cantidad }
                              : m
                          );
                          setValue(path, updated);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          append({
            tipo_producto: "",
            id_producto_establecido: "",
            producto_personalizado: {
              nombre_personalizado: "",
              detalles: [],
              margen: 0,
            },
            cantidad: 1,
          })
        }
        className="bg-purple-500 text-white px-3 py-1 rounded mb-4 cursor-pointer hover:scale-105"
      >
        Agregar Producto
      </button>
    </>
  );
}
