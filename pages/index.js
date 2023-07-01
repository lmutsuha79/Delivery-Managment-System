import Image from "next/image";
import { Inter } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faDashboard } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import SideBar from "@/components/side-bar";
import MainNav from "@/components/main-nav";

import OrderStatusTag from "@/components/orders/order-status-tag";
import {
  faCheck,
  faDollar,
  faMotorcycle,
  faPhone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "primereact/avatar";
import { OrderList } from "primereact/orderlist";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "./_app";
import { Calendar } from "primereact/calendar";
import ChartOverView from "@/components/chart-overview";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [dates, setDates] = useState();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let startDate = null;
        let endDate = null;

        if (dates) {
          startDate = dates[0];
          endDate = dates[1];
        }

        const response = await fetch("/api/get-overview", {
          method: "POST",
          body: JSON.stringify({
            startDate,
            endDate,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Error fetching data from the API");
        }

        const data = await response.json();
        setInfo(data);
        return data;
      } catch (error) {
        console.error(error);
        // Handle error, display an error message, etc.
      }
    }

    fetchData();
  }, [dates]);

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-primary_color font-medium text-lg">
          Pick a date range:
        </span>
        <span className="p-float-label">
          <Calendar
            value={dates}
            onChange={(e) => setDates(e.value)}
            selectionMode="range"
            readOnlyInput
          />
          <label
            htmlFor="birth_date"
            className="text-primary_color font-medium"
          >
            date range
          </label>
        </span>
      </div>
      <div className="grid">
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Total revenue
                </span>
                <div className="text-900 font-medium text-xl">
                  {info?.totalEarnings + " " + "DA"}
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <FontAwesomeIcon icon={faDollar} className="text-red-300" />
              </div>
            </div>
            {/* <span className="text-green-500 font-medium">%52+ </span>
        <span className="text-500">since last week</span> */}
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Orders Numer
                </span>
                <div className="text-900 font-medium text-xl">
                  {info?.orderCount} Orders
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-cart text-blue-500 text-xl" />
              </div>
            </div>
            {/* <span className="text-green-500 font-medium">24 new </span>
        <span className="text-500">since last visit</span> */}
          </div>
        </div>

        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Delivered Orders
                </span>
                <div className="text-900 font-medium text-xl">
                  {info?.deliveredOrderCount} Orders
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <FontAwesomeIcon icon={faCheck} className="text-cyan-500" />
              </div>
            </div>
            {/* <span className="text-green-500 font-medium">520 Order</span> */}
            {/* <span className="text-500">Order</span> */}
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Canceled Orders
                </span>
                <div className="text-900 font-medium text-xl">
                  {info?.canceledOrderCount} Orders
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <FontAwesomeIcon icon={faXmark} className="text-purple-500" />
              </div>
            </div>
            {/* <span className="text-green-500 font-medium">85 </span> */}
          </div>
        </div>

        <div className="col-10">
          <div className="card ">
            <ChartOverView />
          </div>
        </div>
        {/* 
        <div className="col-12 xl:col-6">
          <div className="card ">
            <h5>Delivery Boys for This Session</h5>
            <ul>
              {earningsInfo_for_boys?.map((info) => (
                <li
                  key={info.deliveryBoy.id}
                  className="transform hover:scale-105 transition-transform flex items-center  justify-between px-2 py-3 rounded-md shadow-sm border card mb-3"
                >
                  <div className="flex items-center gap-2">
                    <Avatar
                      image={`/images/delivery-boys-avatars/${info.deliveryBoy.avatar}`}
                      size="large"
                      shape="circle"
                    />
                    <span className="font-medium ml-2">
                      {info.deliveryBoy.name}
                    </span>
                  </div>
                  <span className="text-primary_color">
                    {info.completedOrders} delivered Orders
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
    </>
  );
}
