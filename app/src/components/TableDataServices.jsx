const TableDataServices = (index, name, description, price) => {

    return (
      <tbody
        className="table-group-divider"
        style={{ fontSize: "13px" }}
      >
        <tr>
          <td scope="row" className="td p-2">
            #{index}
          </td>
          <td className="td p-2">{name}</td>
          <td className="td  p-2">{description}</td>
          <td className="td p-2">{price}</td>
          <td className="td p-2">Juan Bodoque</td>
          <td className="td p-2">Disponibilidad</td>
          <td className="td p-2">
            <div className="botones">
              <input
                className="form-check-input "
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel1"
                value=""
                aria-label="..."
              ></input>
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel1"
                value=""
                aria-label="..."
              ></input>
            </div>
          </td>
        </tr>
      </tbody>
    );
  };
  
  export default TableDataServices;