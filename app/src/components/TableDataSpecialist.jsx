const TableDataSpecialist = ({
  index,
  name,
  lastname,
  email,
  experience,
  education,
  specialization1,
  specialization2,
  phone,
  image,
}) => {
  return (
    <tbody className="table-group-divider" style={{ fontSize: "13px" }}>
      <tr>
        <td scope="row" className="td p-2">
          #{index}
        </td>
        <td className="td p-2">
          {name} {""}
          {lastname}
        </td>
        <td className="td p-2">{email}</td>
        <td className="td p-2">{education}</td>
        <td className="td p-2">{experience}</td>
        <td className="td p-2">
          {specialization1}
          {", "}
          {specialization2}
        </td>
        <td className="td p-2">
          <div>
            <input
              className="form-check-input"
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

export default TableDataSpecialist;