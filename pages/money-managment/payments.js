import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FilterMatchMode } from "primereact/api";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function fetch_and_set_payments() {
      try {
        const response = await fetch("/api/money/get-payments");

        if (response.ok) {
          const data = await response.json();
          setPayments(data);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetch_and_set_payments();
  }, []);

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = (
    <div className="">
      <h4>Payments Bills</h4>
      <span className="text-primary_color">
        {/* here you will see each delivery boy associated with the unpaid amount */}
      </span>

      <div className="flex justify-end items-center">
        <span className="p-input-icon-left">
          <FontAwesomeIcon icon={faSearch} />
          <InputText
            className="border-main_dark ring-black focus:ring-black"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search any thing here ..."
          />
        </span>
      </div>
    </div>
  );
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  return (
    <>
      <DataTable
        value={payments}
        header={header}
        // footer={footer}
        tableStyle={{ minWidth: "60rem" }}
        stripedRows
        showGridlines
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["id", "createdAt", "amount", "deliveryBoy.name"]}
        emptyMessage="no results found"
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 25, 50, 100]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
      >
        <Column sortable field="id" header="Id"></Column>
        <Column
          sortable
          field="createdAt"
          body={(payment) => (
            <span>
              {new Date(payment?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          )}
          header="CreatedAt"
        ></Column>
        <Column
          sortable
          field="amount"
          body={(payment) => <span>{payment.amount + " " + "DA"}</span>}
          header="Money"
        ></Column>
        <Column
          sortable
          header="Name"
          field="deliveryBoy.name"
          body={(payment) => <span>{payment?.deliveryBoy?.name}</span>}
        ></Column>
        <Column
          header="Avatar"
          field="deliveryBoy.avatar"
          body={(payment) => (
            <Avatar
              size="large"
              image={`/images/delivery-boys-avatars/${payment?.deliveryBoy.avatar}`}
              shape="circle"
            />
          )}
        ></Column>
      </DataTable>
    </>
  );
};

export default Payments;
